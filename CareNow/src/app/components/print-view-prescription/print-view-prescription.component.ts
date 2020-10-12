import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { TD } from './../../models/td';
import { CarenowService } from 'src/app/services/carenow.service';
import { Prescription } from './../../models/Prescription';


@Component({
  selector: 'app-print-view-prescription',
  templateUrl: './print-view-prescription.component.html',
  styleUrls: ['./print-view-prescription.component.css'],
  

})
export class PrintViewPrescriptionComponent implements OnInit {
 
  private sub: any;
  presID: number;

  P_name : string;
  P_age : number;
  P_date : Date;

  Prescription : Prescription;
  tds :  TD[] = [];

  constructor(private _tdService: CarenowService,
              private route : ActivatedRoute,
              private router_: Router,
              ) { }

  

  imagePath : String = "assets/img/LOGOZ.png";

  ngOnInit(): void {
      this.sub = this.route.params.subscribe(params =>{
        this.P_name = params['name'];
        this.P_age = params['age'];
        this.P_date = params['date'];
        
      })
    this.listTD();
    
  }


  listTD(){
    this._tdService.getTD().subscribe(
      data => this.tds = data);
  }


  //download PDF
  pdfnow(){
    const options ={
      filename: 'CareNOW_Prescripition_.pdf',
      image: {type: 'jpeg' },
      html2canvas:{},
      jsPDF: {orientation: 'portrait'}
    };

    const content: Element = document.getElementById('elemet-to export')

    html2pdf()
    .from(content)
    .set(options)
    .save ();

    this.router_.navigate(['docHome']);



  }


  

}








