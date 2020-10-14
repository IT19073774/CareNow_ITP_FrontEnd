import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  
  public isDetVisible = false
  doctor: Doctor []= [];
  filterterm: string;

  filters = {
    keyword: '',
    sortBy: ''
  }
  constructor(private _doctorService: DoctorService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }
    

  ngOnInit(): void {
    
    this.listDoctor();
  }

 
  downloadPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }
  addDoctor()
  {
    this._router.navigate(["/addDoc"]);
  }

 
  deleteDoctor(id:number)
  {
  this._doctorService.deleteDoctor(id).subscribe(
    data =>{
      console.log('deleted response',data);
      this._doctorService.getDoctor().subscribe(data =>{
        this.listDoctor();
        },
        error => console.log(error)
        )
    },
    error => console.log(error));   
}

  listDoctor()
  {
    this._doctorService.getDoctor().subscribe(
      data => {
        console.log(data)
        this.doctor =data}
    )
  }
}
