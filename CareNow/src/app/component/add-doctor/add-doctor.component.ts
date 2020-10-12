import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  
  doctor:any = {}

  constructor(private _doctorServices: DoctorService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent)
    {
      const Id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._doctorServices.getDoctor().subscribe(
        data =>this.doctor = data
      )
    }
   
  }

  saveDoctor() {
  this._doctorServices.saveDoctor(JSON.stringify(this.doctor)).subscribe(
    data =>{
      console.log('response', data);
      this._router.navigateByUrl("/listCash");
      
    }
  )
  
}


deleteDoctor(cid:number)
{
  this._doctorServices.deleteDoctor(cid).subscribe(
    data =>{
      console.log('deleted response',data);
      this._router.navigateByUrl("/listCash");
    }
  )
}

}