export type UploadFileOptions = {
  dir?: string;
  name?: string;
  overwrite?: boolean;
};

export type UploadImageOptions = {
  width?: number;
  height?: number;
  format?: 'png' | 'jpg';
} & UploadFileOptions;
