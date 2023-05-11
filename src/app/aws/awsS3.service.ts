import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

import { UploadFileOptions, UploadImageOptions } from './awsS3.types';

interface UploadTask {
  file: any;
  name?: string;
  dir?: string;
  resolve: any;
  reject: any;
}

@Injectable()
export class AwsS3Service {
  private readonly logger: Logger = new Logger(AwsS3Service.name, {
    timestamp: true,
  });

  private readonly client: S3Client;
  private uploadQueue: UploadTask[] = [];
  private currentUploadSize = 0;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_KEY as string,
        secretAccessKey: process.env.AWS_S3_SECRET as string,
      },
    });
  }

  async getTempUrl(path: string) {
    const bucket = process.env.AWS_S3_BUCKET;
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: path,
      ResponseContentDisposition: 'inline',
    });
    const expiresIn = 3600;
    this.logger.debug({
      message: 'getting signed url',
      value: { bucket, path, expiresIn },
    });
    return await getSignedUrl(this.client, command, { expiresIn });
  }

  async getStaticUrl(path: string) {
    // TODO: CDN/cloudfront
    return this.getTempUrl(path);
  }

  async getFiles(dir?: string) {
    const Prefix = dir
      ? dir.replace(/\/\//g, '/').replace(/^\//, '').replace(/\/$/, '')
      : undefined;

    const command = new ListObjectsCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Prefix,
    });

    const response = await this.client.send(command);

    const files = response?.Contents?.map((object) => {
      return {
        path: object.Key,
        name: path.basename(object.Key as string),
        dir: path.dirname(object.Key as string),
      };
    });

    return files || [];
  }

  private async processUploadQueue() {
    //TODO: add process upload queue from nestjs
    if (this.uploadQueue.length === 0) {
      return;
    }

    if (this.currentUploadSize > 0) {
      this.logger.debug({
        message: 'waiting for current uploads to finish',
        value: { currentUploadSize: this.currentUploadSize },
      });
      return;
    }

    const task = this.uploadQueue.shift();

    if (!task) {
      return;
    }

    const { file, name, dir, resolve, reject } = task;

    const fileSize = file.size ?? file.byteLength ?? file.length ?? 0;

    // If file is still larger than 60MB, add it to the front of the upload queue again
    if (fileSize > 60 * 1024 * 1024) {
      this.logger.debug(
        `file is still larger than 60MB, adding to front of upload queue`,
      );

      this.uploadQueue.unshift(task);
      this.processUploadQueue().then(() => {
        this.logger.debug('upload queue processed');
      });
      return;
    }

    try {
      const result = await this.uploadFileTask(file, name, dir);
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.currentUploadSize = 0;
      this.processUploadQueue().then(() => {
        this.logger.debug('upload queue processed');
      });
    }
  }

  async uploadFileTask(file: any, name?: string, dir?: string) {
    const fileSize = file.size ?? file.byteLength ?? file.length ?? 0;

    // If file is larger than 5MB, add to the upload queue
    if (fileSize > 5 * 1024 * 1024) {
      this.logger.debug({
        message: 'file is larger than 5MB, adding to upload queue',
        value: { fileSize },
      });

      return new Promise((resolve, reject) => {
        this.uploadQueue.push({
          file,
          name,
          dir,
          resolve,
          reject,
        });

        this.processUploadQueue();
      });
    }
  }

  async uploadFile(file: any, options?: UploadFileOptions) {
    const { dir, overwrite, name = file?.name ?? file?.originalname } = options;

    const fileExt = path.extname(file?.originalname ?? file?.name ?? name);
    const fileName =
      path.basename(name, path.extname(name)) +
      (overwrite ? '' : `_${Date.now()}`) +
      fileExt;

    // Path to file
    if (typeof file === 'string') {
      file = fs.createReadStream(file);
    }

    // File from request
    const buffer = file.data ?? file?.buffer ?? file;

    const fullPath = [dir, fileName]
      .filter(Boolean)
      .join('/')
      .replace(/\/\//g, '/')
      .replace(/^\//, '')
      .replace(/\/$/, '');

    const data = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fullPath,
      Body: buffer,
    };

    this.logger.debug(
      `putting object [bucket=${data.Bucket}] [key=${data.Key}]`,
    );
    await this.client.send(new PutObjectCommand(data));

    return {
      path: fullPath,
      name: fileName,
      dir: path.dirname(fullPath),
    };
  }

  async uploadImage(file: any, options?: UploadImageOptions) {
    const {
      dir,
      overwrite,
      name = file?.name ?? file?.originalname,
    } = options;

    let fileExt = path.extname(file?.originalname ?? file?.name ?? name);
    let fileName = path.basename(name, path.extname(name));

    const image = sharp(file.data ?? file?.buffer ?? file);

    fileName = `${fileName}${fileExt}`;

    const buffer = await image.toBuffer();

    return this.uploadFile(buffer, {
      name: fileName,
      dir,
      overwrite,
    });
  }

  async deleteFile(path: string) {
    const data = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: path,
    };
    const command = new DeleteObjectCommand(data);
    this.logger.debug({
      message: 'deleting object',
      value: { bucket: data.Bucket, key: data.Key },
    });
    await this.client.send(command);

    return `Deleted ${path}`;
  }
}
