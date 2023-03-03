import { ConsoleLogger } from '@nestjs/common';
import * as path from 'path';
import { readdir, mkdir, appendFile, stat } from 'fs/promises';
import { createWriteStream } from 'fs';
import 'dotenv/config';

export class LoggerService extends ConsoleLogger {
  private fileSize = parseInt(process.env.LOG_FILE_SIZE_KB) * 1024;
  private logLevel = parseInt(process.env.LOG_LEVEL);

  constructor() {
    super();
  }

  log = async (message: any, context?: string) => {
    super.log(message, context);
    const infoMessage = getLogMsg(message, context, 'LOG');
    await saveLog('LOG', infoMessage, this.fileSize);
  };

  error = async (error: any, context?: string) => {
    if (this.logLevel < 1) return;
    super.error(error, context);
    const infoMessage = getLogMsg(error, context, 'ERROR');
    await saveLog('ERROR', infoMessage, this.fileSize);
  };

  warn = async (message: any, context?: string) => {
    if (this.logLevel < 2) return;
    super.warn(message, context);
    const infoMessage = getLogMsg(message, context, 'WARN');
    await saveLog('WARN', infoMessage, this.fileSize);
  };

  debug(message: any, context?: string) {
    if (this.logLevel < 3) return;
    const infoMessage = getLogMsg(message, context, 'DEBUG');
    super.debug(infoMessage, context);
  }

  verbose(message: any, context?: string) {
    if (this.logLevel < 4) return;
    const infoMessage = getLogMsg(message, context, 'VERBOSE');
    super.verbose(infoMessage, context);
  }
}

const dateString = new Date().toJSON().slice(0, 10);

async function saveLog(name: string, message: string, fileSize: number) {
  await mkdir(path.join(process.cwd(), `logs/${name}s`), { recursive: true });
  const dirname = path.join(process.cwd(), `logs/${name}s`);

  const ls = await readdir(dirname);
  let order = ls.length === 0 ? 0 : ls.length - 1;
  let filename = ls[ls.length - 1] || generateFileName(name, order);
  if (ls.length === 0) {
    await createFile(dirname, filename);
  }

  const { size } = await stat(path.resolve(dirname, filename));
  const dateSize = Buffer.byteLength(new Date().toLocaleString(), 'utf-8');
  const messageSize = Buffer.byteLength(message, 'utf-8');

  if (size + messageSize + dateSize >= fileSize) {
    order += 1;
    filename = generateFileName(name, order);
    await createFile(dirname, filename);
  }

  await appendFile(path.resolve(dirname, filename), `${message}`);
}

function generateFileName(name: string, order: number) {
  return order === 0
    ? `${dateString}-${name}.log`
    : `${dateString}-${name}${order}.log`;
}

function createFile(dirname: string, filename: string) {
  return new Promise((resolve) => {
    const ws = createWriteStream(path.resolve(dirname, filename));
    ws.close();
    return resolve;
  });
}

function getLogMsg(message: string, optionalParams: string, level: string) {
  const currentDate = new Date();
  const dateTime =
    currentDate.getDate() +
    '/' +
    (currentDate.getMonth() + 1) +
    '/' +
    currentDate.getFullYear() +
    ' @ ' +
    currentDate.getHours() +
    ':' +
    currentDate.getMinutes() +
    ':' +
    currentDate.getSeconds();
  return `${dateTime} ${level} [${optionalParams}] :  ${message}\n`;
}
