import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../model/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService{
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password'),
    
    })
  };
  
  private getUrl: string = "http://localhost:8080/api/v2/orders";


  constructor(private _httpClient: HttpClient) {}
 
  getOrders(): Observable<Order[]> {
    return this._httpClient.get<Order[]>(this.getUrl, this.httpOptions).pipe(
      map(response => response)
    )
  }
  
  saveOrder(order: Order): Observable<Order> {
    return this._httpClient.post<Order>(this.getUrl, order, this.httpOptions);
  }

  getOrder(id: number): Observable<Order> {
    return this._httpClient.get<Order>(`${this.getUrl}/${id}`, this.httpOptions).pipe(
      map(response => response)
    )
  }

  deleteOrder(id: number): Observable<any> {
    return this._httpClient.delete(`${this.getUrl}/${id}`,  this.httpOptions);
  }
 

}
