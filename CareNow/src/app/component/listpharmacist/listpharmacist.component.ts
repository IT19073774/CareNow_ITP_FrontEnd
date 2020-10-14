import { Component, OnInit } from '@angular/core';
import { Pharmacist } from '../../models/pharmacist';
import { PharmacistService } from '../../services/pharmacist.service';
import * as html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listpharmacist',
  templateUrl: './listpharmacist.component.html',
  styleUrls: ['./listpharmacist.component.css']
})
export class ListPharmacistComponent implements OnInit {

  public isDetVisible = false
  pharmacist: Pharmacist[] = [];
  pharmacistEdit:Pharmacist =new Pharmacist;
  
  public password="";
  filterterm: string;
  filters = {
    keyword: '',
    sortBy: ''
  }

  constructor(private _pharmacistServices: PharmacistService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    
    this.listPharmacist();
  }

  closeDetail() {
    this.isDetVisible = false
  }

  
  downloadPDF() {
    var data = document.getElementById('contentToConvert');
    html2pdf(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Stock Manager List.pdf');
    });
  }

 
  deletePharmacist(pid: number)
  {
  this._pharmacistServices.deletePharmacist(pid).subscribe(
    data =>{
      console.log(data);
      this.listPharmacist();
    },
    error => console.log(error) 
  )
  }
 

  
  listPharmacist()
  {
    this._pharmacistServices.getPharmacist().subscribe(
      data => {
        console.log(data)
        this.pharmacist =data}
    )
  }

  savePharmacist() {
    console.log("Entered Save ");
      console.log(" Save ");
      console.log(this.password)
      this._pharmacistServices.savePharmacist(JSON.stringify(this.pharmacistEdit), this.password).subscribe(
        data =>{
        console.log('response', data);
        this._router.navigate(["/listPharmacist"])
      }
    )
    console.log("Finished Save ");
    this.closeDetail();
  }
  
edit(pharma:Pharmacist) {
  this.isDetVisible = true;
  this.pharmacistEdit=pharma;

}


addPharmacist(){
  this._router.navigate(["addPharmacist"]);
}






updatePharmacist()
   {
    console.log("Entered Save ");
    console.log(" Save ");
    console.log(this.password)
    this._pharmacistServices.updatePharmacist(JSON.stringify(this.pharmacistEdit)).subscribe(
      data =>{
      console.log('response', data);
      this._router.navigate(["/listPharmacist"])
    }
  )
  console.log("Finished Save ");
  this.closeDetail();
} 
}















