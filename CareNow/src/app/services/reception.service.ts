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

  

  saveReception(reception: Reception): Observable<Reception> {
    return this.http.post<Reception>(this.getUrl, reception);
  }

  getReceptions(RecId: number): Observable<Reception> {
    return this.http.get<Reception>(`${this.getUrl}/${RecId}`).pipe(
      map(response => response)
    )
  }

  deleteReception(RecId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/deleteReceptionist/${RecId}`, this.httpOptions);
  }

}
