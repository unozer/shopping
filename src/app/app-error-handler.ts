import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    let err = error.rejection || error;
    let message = '';

    if (err instanceof HttpResponse) {
      switch (err.status) {
        case 0:
          message = 'Client side error. Please check your network connection.';
          break;
        case HttpStatusCode.InternalServerError:
          message = 'Server error. Please try again later.';
          break;
        case HttpStatusCode.NotFound:
          message = 'Resource not found. Please check the URL.';
          break;
        case HttpStatusCode.BadRequest:
          message = 'Bad request. Please check your input.';
          break;
        case 525:
            message = 'SSL handshake failed. Please check your SSL configuration.';
            break;
        case 520:
            message = 'Unknown error occurred. Please try again later.';
            break;
        default:
          message = 'An unknown error occurred.';
      }
    } else {
        message = 'Application error. Please check your code.';
    }

    console.error(message, error);
  }
}
  
