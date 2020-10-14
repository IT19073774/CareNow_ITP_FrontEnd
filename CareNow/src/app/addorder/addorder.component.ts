import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderService } from '../service/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {

  order: Order = new Order();
  //orderForm: FormGroup;

  drugname: String;
  /*drugtype: String;
  quantity: BigInteger;
  size: String;
  placedDate: Date;
  dueDate: Date;
  recievedDate: Date;*/


  constructor(private _orderService: OrderService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute){ }


  ngOnInit(): void {
    
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._orderService.getOrder(id).subscribe(
        data => this.order = data 
      )
    }
    
    //this.initForm();   
  }

  saveOrder() {
    console.log(this.order)
    this._orderService.saveOrder(this.order).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/orders");
      }
    )
  }

  deleteOrder(id: number) {
    this._orderService.deleteOrder(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/orders');
      }
    )
  }

}
