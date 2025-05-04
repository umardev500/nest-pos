import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Log the error details (you can adjust the log level as necessary)
    this.logger.error(
      `Error Code: ${exception.code}, Message: ${exception.message}, Meta: ${JSON.stringify(exception.meta)}`,
    );

    // Handling P2003: Foreign key constraint failed
    if (exception.code === 'P2003') {
      return response.status(400).json({
        statusCode: 400,
        message: 'Foreign key constraint failed: related record not found.',
        error: 'Bad Request',
      });
    }

    // Handling P2002: Unique constraint failed (duplicate entry)
    if (exception.code === 'P2002') {
      const target = exception.meta?.target || 'unknown field';
      return response.status(409).json({
        statusCode: 409,
        message: `Unique constraint failed on the ${target as string}. Duplicate entry.`,
        error: 'Conflict',
      });
    }

    // fallback for other errors
    response.status(500).json({
      statusCode: 500,
      message: exception.message,
      error: 'Internal Server Error',
    });
  }
}
