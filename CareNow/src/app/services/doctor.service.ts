import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl= "http://localhost:8080/";

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };
  
  getDoctor(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getDoctor", this.httpOptions);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteDoctor/${id}`, this.httpOptions); 

  }

  saveDoctor(doctor,education, password):Observable<any> {
    return this.http.post<any>("http://localhost:8080/saveDoctor/"+ password + education, doctor, this.httpOptions )
  }

}
