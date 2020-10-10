import { MP } from './../../models/mp';
import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { TD } from './../../models/td';
import { Router} from '@angular/router';

@Component({
  selector: 'app-mp',
  templateUrl: './mp.component.html',
  styleUrls: ['./mp.component.css']
})
export class MPComponent implements OnInit {

  @Input() Pres: string[] = [];


  pres_ : MP = new MP();
  
  
  __name : String;
  __age : number;
  __date : Date;
  
  constructor(private MP_service : CarenowService,
              private TD_service : CarenowService,
              private MP_router: Router,) { }

  ngOnInit(): void {
    
 
  }

  savePres(){
    console.log(this.Pres);
    this.pres_.presdrugs = this.Pres[0];
    this.MP_service.savePres(this.pres_).subscribe(
      data => {
        console.log('response' ,data);
        this.__name = this.pres_.prespatientName;
        this.__age = this.pres_.prespatientAge;
        this.__date = this.pres_.presdate;
        this.MP_router.navigate(['/PrintPres', this.__name, this.__age, this.__date]);
      }
    )
  }

}

