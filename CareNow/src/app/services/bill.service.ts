
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { data } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class BillService {
 

  private baseUrl= "http://localhost:8080/";
  
  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic' + btoa('carenow:password')
    })
  };
  
  
  
   getBills():Observable<any>
  {
    return this.http.get<any>("http://localhost:8080/bill", this.httpOptions);
  }

   deletebill(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/deletebill/${id}`,this.httpOptions);  
  }

  searchdetails(date :string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${date}`,this.httpOptions);
  }

  getbilldetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}create/${id}`,this.httpOptions);
  }

  createNewBill(id : number):Observable<Object>{
    return this.http.post(`${this.baseUrl}create/${id}`,data,this.httpOptions );

  }

  updatepaymentStatus(id:number):Observable<Object>{
    return this.http.post(`${this.baseUrl}updatepay/${id}`,data,this.httpOptions);
  }

  updatePrintingStatus(id:number):Observable<Object>{
    return this.http.post(`${this.baseUrl}updateprint/${id}`,data,this.httpOptions)
  }

 

  
}
