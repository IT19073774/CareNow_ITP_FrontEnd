import { Component, OnInit } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { Deliverer } from 'src/app/models/deliverer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliverer',
  templateUrl: './deliverer.component.html',
  styleUrls: ['./deliverer.component.css']
})
export class DelivererComponent implements OnInit {

  filterterm: string;

  openAdd = true;
  openEdit = true;

  
  deliverer : Deliverer[] = [];
  
  delivereradd: Deliverer = new Deliverer;

  constructor(private _delivererService: CarenowService) { }

  ngOnInit(): void {
    this.listDeliverer();
  }

  listDeliverer() {
    this._delivererService.getAllDeliverers().subscribe(
      data => this.deliverer = data
    )
  }

  edit(d:Deliverer) {
    this.openEdit = false;
    this.delivereradd = d;
  }

  add(){
    this.delivereradd = new Deliverer;
    this.openAdd = false;
  }

  closePopup(){
    this.openAdd = true;
    this.openEdit = true;
  }

  deleteDeliverer(id: number) {
    this._delivererService.deleteDeliverer(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listDeliverer();
      }
    )
  }
  saveDeliverer(){

    if(this.delivereradd.email.includes("@") && this.delivereradd.email.includes(".com")){
      console.log(JSON.stringify(this.delivereradd));
      this._delivererService.saveDeliverer(JSON.stringify(this.delivereradd)).subscribe(
        data => {
          console.log('response', data);
          this.closePopup();
          this.listDeliverer();
        }
      )
    }

    
  }
}


