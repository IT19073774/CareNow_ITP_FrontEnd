import { Component, OnInit } from '@angular/core';
import { OnlineOrder } from 'src/app/models/online-order';
import { DeliveryRecord } from 'src/app/models/delivery-record';
import { CarenowService } from 'src/app/services/carenow.service';
import { Patient } from 'src/app/models/patient';

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  onlineOrder:OnlineOrder[] = [];
  deliveryRecord:DeliveryRecord[] = [];
  obj: LooseObject = {};
  delRecord:DeliveryRecord = new DeliveryRecord();
  patient:Patient =  new Patient();



  constructor(private _deliveryService: CarenowService) { }

  ngOnInit(): void {
    this.listOnlineOrder();
  }


  listOnlineOrder() {
    this._deliveryService.getAllOrder().subscribe(
      data => {
        console.log(data)
        this.onlineOrder = data
      }
    )
  }



  rejectOrder(id){
    for(let record of this.onlineOrder) {
      if (id == record["reOrderId"]) {
        this.obj = {}
        this.obj = record
        this.obj.status = "rejected"
        break;
      }
    }
    this._deliveryService.rejectOrderStatus(JSON.stringify(this.obj)).subscribe(checker => {
      console.log(checker)
      this.listOnlineOrder();
    })
    
  }
  acceptOrder(id:number){
    for(let record of this.onlineOrder) {
      if (id == record["reOrderId"]) {
        this.obj = {}
        this.obj = record
        this.obj.status = "accepted"
        break;
      }
    }
    this._deliveryService.acceptOrderStatus(JSON.stringify(this.obj)).subscribe(checker => {
      console.log(checker)
      this.listOnlineOrder();
    })
  }

    
}

