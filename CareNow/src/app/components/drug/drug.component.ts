import { Component, OnInit } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { Prescription } from 'src/app/models/prescription';
import { Router } from '@angular/router';
import { Drug } from 'src/app/models/drug';

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {

  openPresc =true ;
  openDrug = true;

  drugs:string[] = [];
  index: number;
  json:any;
  obj: LooseObject = {};
  public drugDetail = [];
  filterterm : String;
  drugName : String;

  prescription : Prescription[] = [];
  d:Drug;
  p:Prescription;

  constructor(private _prescriptionService: CarenowService, private router: Router) { }

  ngOnInit(): void {
    
    this.listPrescription();
    
    
  }

  listPrescription() {
    this._prescriptionService.getAllPrescriptions().subscribe(
      
      data => {
        
        this.closePopup();
        this.prescription = [];
        this.prescription = data
        console.log(this.prescription)
        this.closePopup();
      }
    )
  }

  viewPrescription(p:Prescription){
    this.drugDetail = []
    
    this.json = JSON.parse(p.drugs)
    for (let j of this.json) {
      this.obj = {}
      this.obj.name = j["Drug name"]
      this.obj.duration = j["Duration"]
      this.obj.frequency = j["Frequency"]
      this.drugDetail.push(this.obj)
    }
    console.log(this.drugDetail)
    this.p = p;
    this.openPresc = false;
    /*this.json = JSON.parse(p.drugs);

    for(let data of this.json){
      this.drugs[this.index] = data["Drugname"];
      this.index++;
    }*/
  }

  closePopup(){
    this.openPresc = true;
    this.openDrug = true;
    this.d = new Drug;
  }

  issue(val){
    this.closePopup();
   this.obj = {};
    this.obj = this.p;
    this.obj.status = "ISSUED"  
    this._prescriptionService.updatePrescription(JSON.stringify(this.obj)).subscribe(checker => console.log(checker));
    this.ngOnInit();
  }

  viewDrug(){
    this.openDrug = false;
    this._prescriptionService.getDrug(this.drugName).subscribe(
      data => this.d = data
    )
  }


}
