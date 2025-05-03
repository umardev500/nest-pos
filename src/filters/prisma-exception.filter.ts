import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'P2003') {
      return response.status(400).json({
        statusCode: 400,
        message: 'Foreign key constraint failed: related record not found.',
        error: 'Bad Request',
      });
    }

    // fallback
    response.status(500).json({
      statusCode: 500,
      message: exception.message,
      error: 'Internal Server Error',
    });
  }
}
