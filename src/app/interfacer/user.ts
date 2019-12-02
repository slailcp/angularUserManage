export interface User {
    username:string,
    password:string,
}

export interface UserInfo {
    "id": string,
    "AccountData": string,
    "username": string,
    "password": string,
    "MobilePhone": string,
    "age": number|string,
    "self": boolean,
    "like":string,
    "sex":number|string,
    "identity":string,
    "codetype":string,
    "codenumber":string
}

export interface CodeType {
    codeContent:string,
    codeKey:number|string
  }

