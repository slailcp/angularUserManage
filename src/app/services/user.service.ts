import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LayerService } from './layer.service';
import { UserInfo } from '../interfacer/user';
interface loginUser {username:string,password:string}

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};
  const  _params:UserInfo = {
    "id": "",
    "AccountData": "",
    "username": "",
    "password": "888888",
    "MobilePhone": "",
    "age": 0,
    "self": false,
    "like":"",
    "sex":0,
    "identity":"",
    "codetype":"",
    "codenumber":""
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http:HttpClient,private layerService:LayerService){

    }
    login(): Observable<loginUser[]> {
        const url = 'http://localhost:3000/info';
        return this.http.get<loginUser[]>(url);
     } 
 
     getUsers(params?:any): Observable<UserInfo[]> {
         const loading = this.layerService.showLoading();
        const url = params&&params.username?`http://localhost:3000/info/?username=${params.username}`:'http://localhost:3000/info';
        return this.http.get<any[]>(url).pipe(
            finalize(() => {
                // console.log(opt.url);
                this.layerService.hideLoading(loading);
              })
        );
     } 
     getUser(id:any): Observable<UserInfo[]> {
        const loading = this.layerService.showLoading();
       const url = `http://localhost:3000/info/?id=${id}`;
       return this.http.get<any[]>(url).pipe(
           finalize(() => {
               // console.log(opt.url);
               this.layerService.hideLoading(loading);
             })
       );
    } 

    editUser(params:any): Observable<UserInfo[]> {
        const loading = this.layerService.showLoading();
        const url = `http://localhost:3000/info/${params.id}`;
        params = {..._params,...params};
        return this.http.put<any[]>(url,params,httpOptions).pipe(
            finalize(() => {
                this.layerService.hideLoading(loading);
              })
        );
     } 
 
     addUser(params): Observable<UserInfo[]> {
        const loading = this.layerService.showLoading();
        const url = `http://localhost:3000/info`;
        params = {..._params,...params};
        const id = `${parseInt(`${Math.random()*100000000000000000}`)}`;
        params.id = id
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        return this.http.post<any[]>(url,params,httpOptions).pipe(
            finalize(() => {
                this.layerService.hideLoading(loading);
              })
        );
     } 
     delUser(id): Observable<UserInfo[]> {
        const loading = this.layerService.showLoading();
        const url = `http://localhost:3000/info/${id}`;
        
        return this.http.delete<any[]>(url,httpOptions).pipe(
            finalize(() => {
                this.layerService.hideLoading(loading);
              })
        );
     } 
 

   
 }