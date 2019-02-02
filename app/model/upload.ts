import { Application } from 'egg';
import { Instance } from 'sequelize';

export interface UploadAttributes {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
}

export interface UploadInstance extends Instance<UploadAttributes>, UploadAttributes {
  id: number;
  name: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export default (app: Application) => {
  const {
    STRING,
    DECIMAL,
  } = app.Sequelize;
  const tablePrefix = app.config.tablePrefix;

  const upload = app.model.define<UploadInstance, UploadAttributes>( tablePrefix + 'upload_file', {
    name: {
      type: STRING(255),
      allowNull: true,
      comment: '文件名',
    },
    hash: {
      type: STRING(255),
      allowNull: true,
      comment: 'hash值',
    },
    ext: {
      type: STRING(255),
      allowNull: true,
      comment: '文件后缀名',
    },
    mime: {
      type: STRING(255),
      allowNull: true,
      comment: '文件类型',
    },
    size: {
      type: DECIMAL,
      allowNull: true,
      comment: '文件容量',
    },
    url: {
      type: STRING(255),
      allowNull: true,
      comment: '文件路径',
    },
    provider: {
      type: STRING(255),
      allowNull: true,
      comment: '提供者',
    },
  }, {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  return upload;
};
