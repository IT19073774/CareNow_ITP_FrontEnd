import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reception } from '../models/reception';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  private getUrl: string = "http://localhost:8080/";
  
  
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };

  getReceptionist(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getReceptionist", this.httpOptions);
  }

  saveReception(reception, password): Observable<any> {
    return this.http.post<any>("http://localhost:8080/saveReceptionist/" + password, reception, this.httpOptions);
  }

  getReceptions(RecId: number): Observable<Reception> {
    return this.http.get<Reception>(`${this.getUrl}/${RecId}`).pipe(
      map(response => response)
    )
  }
  updateReception(reception):Observable<any> {
    return this.http.post<any>("http://localhost:8080/updateReceptionist",reception,this.httpOptions)
  }

  deleteReception(employeeid: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/deleteReceptionist/${employeeid}`, this.httpOptions);
  }

}
