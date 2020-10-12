import { prescription } from './../modles/Precription';
import { Bill } from './../modles/bill';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  
  
  
  public getBills():Observable<any>
  {
    return this.http.get<any>("http://localhost:8080/bill");
  }

   deletebill(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/deletebill/${id}`);  
  }

  searchdetails(date :string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${date}`);
  }

  getbilldetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}create/${id}`);
  }

  createNewBill(id : number):Observable<Object>{
    return this.http.post(`${this.baseUrl}create/${id}`,data );

  }

  updatepaymentStatus(id:number):Observable<Object>{
    return this.http.post(`${this.baseUrl}updatepay/${id}`,data);
  }

  updatePrintingStatus(id:number):Observable<Object>{
    return this.http.post(`${this.baseUrl}updateprint/${id}`,data)
  }

 

  
}
