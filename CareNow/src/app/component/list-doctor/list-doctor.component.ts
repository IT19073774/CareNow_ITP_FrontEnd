import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  
  public isDetVisible = false
  doctor: any = [];
  doctorEdit:any = {}

  filters = {
    keyword: '',
    sortBy: ''
  }

  constructor(private _doctorServices: DoctorService) { }


  ngOnInit(): void {
    
    this.listDoctor();
  }

  closeDetail() {
    this.isDetVisible = false
  }

  updateCashier(val:Number) {
    
    this.doctorEdit = {}
    for(let doc of this.doctor) {
      if (doc["cid"] == val ) {
        this.doctorEdit = doc
        break;
      }
    }
    console.log(this.doctorEdit)
    this.isDetVisible = true
  }
  deleteDcotor(id:number)
  {
  this._doctorServices.deleteDoctor(id).subscribe(
    data =>{
      console.log('deleted response',data);
      this._doctorServices.getDoctor().subscribe(data =>{
        this.listDoctor();
        },
        error => console.log(error)
        )
    },
    error => console.log(error));   
}
   
  saveCashier() {
    this._doctorServices.saveDoctor(this.doctor).subscribe(
      data =>{
        console.log('response', data);

      }
    )
  
  }

  listDoctor()
  {
    this._doctorServices.getDoctor().subscribe(
      data => {
        console.log(data)
        this.doctor =data}
    )
  }
}