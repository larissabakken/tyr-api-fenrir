import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import axios from 'axios';

import { AwsS3Service } from '../aws/awsS3.service';
import { UploadDto } from './dto/upload.dto';
import { Public } from 'src/auth/public.decorator';

@Public()
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  @Get('teste')
  async teste() {
    return 'teste';
  }

  // Endpoint para obter um arquivo do S3 temporariamente
  @Get('/*')
  async getFile(@Res() res, @Param() params, @Query() query) {
    // Define se deve redirecionar para a URL do arquivo
    const { redirect = true } = query;

    // Obtém o caminho completo do arquivo a partir dos parâmetros da rota
    const path = `${Object.values(params).join('/')}`;

    // Obtém uma URL temporária para o arquivo no S3
    const url = await this.awsS3Service.getTempUrl(path);

    if (redirect) {
      // Se deve redirecionar, faz uma requisição para a URL do arquivo e redireciona a resposta para a resposta da rota
      const stream = await axios({
        url: url,
        responseType: 'stream',
      });

      return stream.data.pipe(res);
    }

    // Se não deve redirecionar, retorna um objeto com o caminho e a URL do arquivo
    return { path, url };
  }

  // Endpoint para fazer upload de arquivo para o S3
  @Post('/')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @Body() payload: UploadDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('bateu aqui', payload);
    const response = [];

    // Define os parâmetros de upload
    const { name, overwrite, dir = '/upload' } = payload;

    for (const file of files) {
      let upload;

      // Verifica se o arquivo é uma imagem e faz upload como imagem
      if (file.mimetype.startsWith('image/')) {
        upload = await this.awsS3Service.uploadImage(file, {
          dir,
          name,
          overwrite,
        });
      } else {
        // Faz upload como arquivo
        upload = await this.awsS3Service.uploadFile(file, {
          dir,
          name,
          overwrite,
        });
      }

      response.push(upload);
    }

    return response;
  }

  // Endpoint para fazer upload de arquivo para o S3 como tarefa assíncrona
  @Post('/TODO')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBearerAuth()
  async uploadFileTask(
    @Body() payload,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    //TODO - add task queue
    const response = [];

    for (const file of files) {
      // Faz upload do arquivo como tarefa assíncrona
      response.push(
        await this.awsS3Service.uploadFileTask(file, payload?.name, '/upload'),
      );
    }

    return response;
  }

  // Endpoint para deletar arquivo do S3
  @Delete('/delete/*')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(@Param() path) {
    return this.awsS3Service.deleteFile(path?.[0]);
  }
}
