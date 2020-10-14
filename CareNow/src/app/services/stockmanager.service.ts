import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stockmanager } from '../models/stockmanager';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class StockmanagerService {

  private baseUrl= "http://localhost:8080/";

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };
  
  getStockmanager(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getStockManager", this.httpOptions);
  }

  deleteStockmanager(employeeid:Number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/deleteStockManager/${employeeid}`, this.httpOptions)

  }

  saveStockmanager(stockmanager,password):Observable<any> {
    return this.http.post<any>("http://localhost:8080/saveStockManager/"+password,stockmanager,this.httpOptions);
  }



  updateStockmanager(stockmanager):Observable<any> {
    return this.http.post<any>("http://localhost:8080/updateStockManager",stockmanager,this.httpOptions);
  }

 
}
