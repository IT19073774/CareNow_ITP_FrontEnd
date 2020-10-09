import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import { CarenowService } from 'src/app/services/carenow.service';
import { Deliverer } from 'src/app/models/deliverer';
import { Drug } from 'src/app/models/drug';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private _reportService: CarenowService) { }

  myDate = new Date();

  deliverer : Deliverer[] = [];
  drug : Drug[] = [];

  ngOnInit(): void {
    this.listDeliverer();
    this.listDrug();
  }

  listDeliverer() {
    this._reportService.getAllDeliverers().subscribe(
      data => this.deliverer = data
    )
  }

  listDrug() {
    this._reportService.getAllDrugs().subscribe(
      data => this.drug = data
    )
  }

  generateDelivererReport(){
    var data = document.getElementById('delivererTable');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('ReportOnDeliverers.pdf');
    });
  }

  generateDrugReport(){
    var data = document.getElementById('drugTable');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('ReportOnDrugs.pdf');
    });
  }

}
