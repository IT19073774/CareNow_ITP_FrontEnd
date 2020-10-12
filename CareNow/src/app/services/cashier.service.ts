import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cashier } from '../models/cashier';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class CashierService {

  private baseUrl= "http://localhost:8080/";

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };
  
  getCashier(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getCashier", this.httpOptions);
  }

  deleteCashier(employeeid: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/deleteCashier/${employeeid}`, this.httpOptions); 

  }

  saveCashier(cashier, password):Observable<any> {
    return this.http.post("http://localhost:8080/saveCashier/" + password, cashier, this.httpOptions);
  }

  savePharmacist(pharmacist, password):Observable<any> {
    return this.http.post<any>("http://localhost:8080/savePharmacist/" + password, pharmacist, this.httpOptions);
  }

  updateCashier(val: number):Observable<any> {
    return this.http.put<any>("http://localhost:8080/updateCashier",this.httpOptions)
  }
}