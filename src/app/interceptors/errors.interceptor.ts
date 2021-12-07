import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private message: NzMessageService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        /* tap(data => {
          switch (request.method) {
            case 'POST':
              this.message.create('success', 'Creado con éxito.');
              break;

            case 'PUT':
              this.message.create('success', 'Cambio realizado.');
              break;
          
            default:
              break;
          }
        }), */
        catchError( (error: HttpErrorResponse) => {
          let mensaje:string;
          switch (error.status) {
            case 404:
              mensaje='No se encontro el elemento solicitado.';
              break;
            
              case 500:
                mensaje='Error del servidor consulte al area de informática.';
                break;
          
            default:
              mensaje='Ocurrio un error.';
              break;
          }


          this.message.create('error', mensaje);
          return  throwError('');
        })
      );
  }
}
