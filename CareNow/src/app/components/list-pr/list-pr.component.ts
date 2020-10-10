import { PR } from './../../models/pr';
import { CarenowService } from 'src/app/services/carenow.service';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-list-pr',
  templateUrl: './list-pr.component.html',
  styleUrls: ['./list-pr.component.css']
})
export class ListPRComponent implements OnInit {

  prs : PR[] =[];
  
  filtersPR = {
    keyword:''


  }



  constructor(private _prService: CarenowService ) { }

  ngOnInit(): void {
  
  this.listPR();

  }

  deletePR(patientRecordID: number){
    this._prService.deletePR(patientRecordID).subscribe(
      data =>{
        console.log('Deleted response', data);
         this.listPR();
      
      }
    )
}

  listPR(){
    this._prService.getPR().subscribe(
      data => this.prs = this.filter_PR(data)
      )
  }


  filter_PR(PR_ : PR[]){
    return PR_.filter((pr) =>{
     return pr.patientID.toString().includes(this.filtersPR.keyword );
      
    })
  }

  



}