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
  
  onSubmit(data)
  {
    console.warn(data);
  }
  
  doctor: Doctor =new Doctor;
  public password = "";
  public education = "";

  constructor(private _doctorServices: DoctorService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  saveDoctor() {
    console.log("Entered Save ");
    if(this.doctor.email.includes("@") && this.doctor.email.includes(".com")){
      console.log(" Save ");
      console.log(this.password)
      this._doctorServices.saveDoctor(JSON.stringify(this.doctor), this.password, this.education).subscribe(
        data =>{
          console.log('response', data);
          this._router.navigate(["/listDoc"])
        }
      )
      console.log("Finished Save ");
      }
}



deleteDoctor(cid:number)
{
  this._doctorServices.deleteDoctor(cid).subscribe(
    data =>{
      console.log('deleted response',data);
      this._router.navigateByUrl("/listDoc");
    }
  )
}

}