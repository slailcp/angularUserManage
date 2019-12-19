import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LayerService} from './layer.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Organize {
  "id": string;
  "Name": string;
  "Level": number | string;
  "ChildNode": Organize[];
  "ParentGuid": string;
  "FullDepartName": string;
  "ManagerGuid": string;
  "ManagerName": string;
  "isChecked"?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class OrganizeService {
  constructor(private http: HttpClient, private layerService: LayerService) {

  }

  getOrganize(id?: string): Observable<Organize[]> {
    const loading = this.layerService.showLoading();
    const url = id ? `http://localhost:3000/department/?id=${id}` : `http://localhost:3000/department`;
    return this.http.get<Organize[]>(url).pipe(
      finalize(() => {
        this.layerService.hideLoading(loading);
      })
    );
  }


}
