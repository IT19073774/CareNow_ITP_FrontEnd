import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DS } from './../../models/ds';
import { CarenowService } from 'src/app/services/carenow.service';


@Component({
  selector: 'app-list-ds',
  templateUrl: './list-ds.component.html',
  styleUrls: ['./list-ds.component.css']
})
export class ListDsComponent implements OnInit {

 
  ds$ : Observable<DS[]>;
  ds_ : DS[] = [];

  //datatables
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  

  //presctiption drug
  P_Drugs: any[] = [];

  constructor(private DS_S : CarenowService) { }

 

  ngOnInit() {
    this.dtOptions ={
      pageLength: 6,
      stateSave: true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
 
    this.DS_S.getDS().subscribe(data =>{
      this.ds_ = data;
      this.dtTrigger.next();  
    
    })
  }

  AddDrug(Drug_Name: String){
    this.P_Drugs.push(Drug_Name)
  }

}
