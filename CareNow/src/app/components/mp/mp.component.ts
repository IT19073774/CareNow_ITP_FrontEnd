import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { Prescription } from './../../models/Prescription';
import { Router} from '@angular/router';
import { FormGroup,Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mp',
  templateUrl: './mp.component.html',
  styleUrls: ['./mp.component.css']
})
export class MPComponent implements OnInit {

  AddPresform = new FormGroup({
    patient_id : new FormControl('', Validators.required),
    prescription_date : new FormControl('', Validators.required),
    patient_name : new FormControl('', Validators.required),
    patient_age : new FormControl('', Validators.required),
    docFee : new FormControl('', Validators.required),

  })
  get patient_id(){
    return this.AddPresform.get('patient_id')
  }
  get prescription_date(){
    return this.AddPresform.get('prescription_date')
  }
  get patient_name(){
    return this.AddPresform.get('patient_name')
  }
  get patient_age(){
    return this.AddPresform.get('patient_age')
  }
  get docFee(){
    return this.AddPresform.get('docFee')
  }
  



  @Input() Pres: string[] = [];
 
  pres_ : Prescription = new Prescription();
  
  
  __name : String;
  __age : number;
  __date : Date;
  
  constructor(private MP_service : CarenowService,
              private MP_router: Router,) { }

  ngOnInit(): void {
    this.MP_service.sessionUser_ID;
    
 
  }

  savePres(){
    let status_: string = "REVIEWED";
    

    console.log(this.Pres);
    this.pres_.drugs = this.Pres[0];
    this.pres_.status = status_;
    this.pres_.doctor_id = Number(this.MP_service.sessionUser_ID);

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

