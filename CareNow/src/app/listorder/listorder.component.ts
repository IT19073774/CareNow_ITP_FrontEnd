import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderService } from '../service/order.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css']
})
export class ListorderComponent implements OnInit {

  orders: Order[]=[];

  filtersx = {
    keywordx: ''
  }

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this.listOrder();
  }

  deleteOrder(id: number) {
    this._orderService.deleteOrder(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listOrder();
      }
    )
  }

  listOrder(){
    this._orderService.getOrders().subscribe(

      data => {
        console.log(data)
        this.orders = data})
    
  }

  


  download(){
    const options = {
      name: 'output.pdf',
      image: { type: 'jpeg'},
      html2pdf: {},
      jsPDF:{orientation:'landscape'}
    }

    const element: Element = document.getElementById('orders')

    html2pdf()
     .from(element)
     .set(options)
     .save()
     
  }
}
