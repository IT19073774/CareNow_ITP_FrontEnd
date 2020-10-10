import { reorder } from './../../models/reorder';
import { CarenowService } from 'src/app/services/carenow.service';
import { Component, OnInit } from '@angular/core';
import { MP } from 'src/app/models/mp';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  pres : MP[] =[];
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

  Reorder(presidID:number,patientID:number){
    this.reorder_.patientID = patientID;
    this.reorder_.presidID = presidID;
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


  filter_PR(Pres_ : MP[]){
    return Pres_.filter((mp) =>{
     return mp.prespatientid.toString().includes(this.patientID.keyword);
      
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
