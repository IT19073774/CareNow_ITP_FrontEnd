import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { Prescription } from './../../models/Prescription';
import { Router} from '@angular/router';

@Component({
  selector: 'app-mp',
  templateUrl: './mp.component.html',
  styleUrls: ['./mp.component.css']
})
export class MPComponent implements OnInit {

  @Input() Pres: string[] = [];
 
  status_ = {
    keyword:'DONE'
  }
  doctorID_ = {
    keyword:'1'
  }

  pres_ : Prescription = new Prescription();
  
  
  __name : String;
  __age : number;
  __date : Date;
  
  constructor(private MP_service : CarenowService,
              private MP_router: Router,) { }

  ngOnInit(): void {
    
 
  }

  savePres(){
    console.log(this.Pres);
    this.pres_.drugs = this.Pres[0];
    this.pres_.status = String(this.status_);
    this.pres_.doctor_id = Number(this.doctorID_);

    this.MP_service.savePres(this.pres_).subscribe(
     
      data => {
        console.log('until THIS' ,data);

        this.__name = this.pres_.patient_name;
        this.__age = this.pres_.patient_age;
        this.__date = this.pres_.prescription_date;

        this.MP_router.navigate(['/PrintPres', this.__name, this.__age, this.__date]);
      }
    )
  }

}

