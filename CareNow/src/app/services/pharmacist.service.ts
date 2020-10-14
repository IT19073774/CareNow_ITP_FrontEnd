import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pharmacist } from '../models/pharmacist';
import { Employee } from '../models/employee'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class PharmacistService {

  private baseUrl= "http://localhost:8080/";

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };
  getEmployee(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/getEmployee/${id}`);
  }
	
  
  getPharmacist(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getPharmacist", this.httpOptions);
  }

  deletePharmacist(employeeid: number ): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/deletePharmacist/${employeeid}`, this.httpOptions);

  }




  savePharmacist(pharmacist, password):Observable<any> {
    return this.http.post<any>("http://localhost:8080/savePharmacist/" + password, pharmacist, this.httpOptions);
  }



  updatePharmacist(pharmacist):Observable<any> {
    return this.http.post<any>("http://localhost:8080/updatePharmacist",pharmacist,this.httpOptions);
  }

 
}
