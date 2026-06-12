import pino from 'pino-http';

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      message: '{req.method} {req.url} {req.statusCode} - {responseTime}',
      hideObject: true,
    },
  },
});

export default logger;
