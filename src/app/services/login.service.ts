import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import {Observable,throwError} from 'rxjs'
import {retry,catchError,tap,map,switchMap} from 'rxjs/operators'

interface loginGoTo {
  "accountUser":string,//- （String） 用户账号
  "accountPwd":string ,  //（String） 用户密码
  "identityKey"?:string,  //（String） 密钥，暂时不用管
  "pwdType"?:string,  //（String） 密码类型 ，1 为未加密，2 为加密过的。暂时不用管
  "userClientInfo"?:string,  //（String） 用户登录的信息，比如ip之类的
  "rememberMe"?:boolean, //（Boolean） 是否记住用户标志
}

 // http://192.168.2.210:9679/fx/login


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
httpOptions:{} = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
proxyFxUrl:string = '/fxapi';
proxyOaUrl:string = '/oaapi';
mockUrl:string = 'http://localhost:3000/info'
constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
  
    return throwError('Something bad happened; please try again later.');
  };

  private requestSet(req){
    if(req.status){ // 请求成功，返回数据
      return req.data;
    }
    console.log(req.msg);
    return null // 否则返回错误信息
  }

  fxLoginGoTo(params:loginGoTo):Observable<any>{
    const url = `${this.proxyFxUrl}/fx/login`;
    return this.http.post<any>(url,params,this.httpOptions).pipe(
      retry(3), // 重新请求3次
      map(req => {
        return this.requestSet(req)
      }),
      catchError(this.handleError)
    );
  }


  fxLoginOut():Observable<any>{
    const url = `${this.proxyFxUrl}/fx/logout`;
    return this.http.get<any>(url).pipe(
      retry(3), // 重新请求3次
      map(req => {
        return this.requestSet(req)
      }),
      catchError(this.handleError)
    );
  }


  mockLoginGoTo(params:loginGoTo):Observable<any>{
    const url = `${this.mockUrl}/?username=${params.accountUser}&password=${params.accountPwd}`;
    return this.http.get<any>(url).pipe(
      retry(3), // 重新请求3次
      catchError(this.handleError)
    );
  }


  mockLoginOut():Observable<any>{
    const url = `${this.mockUrl}`;
    return this.http.get<any>(url).pipe(
      retry(3), // 重新请求3次
      catchError(this.handleError)
    );
  }


/*OA */

// currentPage: "1"
// emId: "352"
// noticeName: ""
// sendTarget: ""
// state: ""
// title: ""



}
