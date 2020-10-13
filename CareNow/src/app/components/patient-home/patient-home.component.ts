import { OnlineOrder } from './../../models/online-order';
import { CarenowService } from 'src/app/services/carenow.service';
import { Component, OnInit } from '@angular/core';
import { Prescription } from 'src/app/models/Prescription';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  pres : Prescription[] =[];
  // patientID = {
  //   keyword:'1'
  // }


  reorder_: OnlineOrder = new OnlineOrder();

  constructor(private _presService: CarenowService) { }

  ngOnInit(): void {
    this._presService.sessionUser_ID;
    this.listPres();

  }

  Reorder(prescription_id:number,patient_id:number){
    
    let Pres_status: string = "pending";
    
    this.reorder_.patientId = Number (this._presService.sessionUser_ID);
    this.reorder_.prescriptionId = prescription_id;
    this.reorder_.status = Pres_status;

    this._presService.addreorder(this.reorder_).subscribe(
      data =>{
        alert("Reorder Requested Successful | Prescription ID :" + prescription_id);
        console.log('response', this.reorder_);
      }
    )
  }
  

  listPres(){
    this._presService.getPres().subscribe(
      data => this.pres = this.filter_PR(data)
      )
  }


  filter_PR(Pres_ : Prescription[]){
    return Pres_.filter((mp) =>{
     return mp.patient_id.toString().includes(this._presService.sessionUser_ID);
      
    })
  }

  delete_This(presid: number){
    this._presService.deletethis(presid).subscribe(
      data =>{
        console.log('Deleted response', data);
         this.listPres();
      
      }
    )
}

}
