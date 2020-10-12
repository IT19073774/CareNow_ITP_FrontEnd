import { reorder } from './../../models/reorder';
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
  patientID = {
    keyword:'2'
  }

  filtersPres = {
    keyword:''
  }

  reorder_: reorder = new reorder();

  constructor(private _presService: CarenowService) { }

  ngOnInit(): void {
    this.listPres();

  }

  Reorder(prescription_id:number,patient_id:number){
    this.reorder_.patientID = patient_id;
    this.reorder_.presidID = prescription_id;
    this._presService.addreorder(this.reorder_).subscribe(
      data =>{
        console.log('response',data);
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
     return mp.patient_id.toString().includes(this.patientID.keyword);
      
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
