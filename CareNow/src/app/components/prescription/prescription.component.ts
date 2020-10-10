import { Component, OnInit,Input } from '@angular/core';
import { TD } from './../../models/td';
import { Router, ActivatedRoute } from '@angular/router';
import { CarenowService } from 'src/app/services/carenow.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  @Input() Drugs: string[] = [];
  //drugsString:string;
  
  //model calls temp drug
  TD_ : TD = new TD;
 

  constructor(private TD_service: CarenowService,
              private TD_router: Router,
              private TD_activated_Route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  saveTempDrug(){
    console.log(this.Drugs);
    this.TD_.tdrugname=this.Drugs[0];
    this.TD_service.saveTD(this.TD_).subscribe(
      data => {
        console.log('response' ,data);
        this.Drugs.splice(0, this.Drugs.length);
      }
    )

  }

}
