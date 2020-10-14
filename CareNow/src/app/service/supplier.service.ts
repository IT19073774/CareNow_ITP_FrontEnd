import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Supplier } from '../model/supplier';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
      //responseType: 'text'
    })
  };
  
  private getUrl: string = "http://localhost:8080/api/v2/suppliers";

  constructor(private _httpClient: HttpClient) {}
 
  getSuppliers(): Observable<Supplier[]> {
    return this._httpClient.get<Supplier[]>(this.getUrl, this.httpOptions).pipe(
      map(response => response)
    )
  }
  
  saveSupplier(supplier: Supplier): Observable<Supplier> {
    return this._httpClient.post<Supplier>(this.getUrl, supplier, this.httpOptions);
  }

  getSupplier(id: number): Observable<Supplier> {
    return this._httpClient.get<Supplier>(`${this.getUrl}/${id}`, this.httpOptions).pipe(
      map(response => response)
    )
  }

  deleteSupplier(id: number): Observable<any> {
    return this._httpClient.delete<any>(`${this.getUrl}/${id}`, this.httpOptions);
  }
}
