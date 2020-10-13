import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryservicesService {

  private baseUrl= "http://localhost:8080/";
  
  constructor(private http : HttpClient) { }
  
  getdelivery_records():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'records')
     
    
  }

  
updaterecordsconfirm(id: number,data): Observable<Object> {
  return this.http.post(`${this.baseUrl}/updaterecordSuccess/${id}`, data);
}

updaterecordserror(id: number,data): Observable<Object> {
  return this.http.post(`${this.baseUrl}/updaterecordERROR/${id}`, data);
}

updaterecordsACCEPT(id: number,name: String,data): Observable<Object> {
  return this.http.post(`${this.baseUrl}updaterecordAccept/${id}/${name}`, data);
}

}
