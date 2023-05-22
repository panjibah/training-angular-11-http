import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, fwrd: HttpHandler){
    console.log("ssss");
    console.log(req.url);
    const clonedReq = req.clone({
      headers: req.headers.append('Basic', '309666666')
    });
    return fwrd.handle(clonedReq);

  }

  constructor() { }
}
