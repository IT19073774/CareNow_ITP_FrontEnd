import { Component, OnInit } from '@angular/core';
import { TD } from './../../models/td';
import { CarenowService } from 'src/app/services/carenow.service';

@Component({
  selector: 'app-list-td',
  templateUrl: './list-td.component.html',
  styleUrls: ['./list-td.component.css']
})
export class ListTDComponent implements OnInit {

  tds :  TD[] = [];

  //save final drugs
  Pres_: any[] = [];

  constructor(private _tdService: CarenowService) { }

  ngOnInit(){

    this._tdService.refreshNeeded$.subscribe(() => {
      this.listTD();
    });
    
    this.listTD();

  }

listTD(){
  this._tdService.getTD().subscribe(
    data => this.tds = data);
}

getthis(){
  var array = [];
    var headers = [];
    $('#dataTable th').each(function(index, item) {
      headers[index] = $(item).html();
  });
    $('#dataTable tr').has('td').each(function() {
        var arrayItem = {};
        $('td', $(this)).each(function(index, item) {
            arrayItem[headers[index]] = $(item).html();
        });
        array.push(arrayItem);
    });
console.log(array);
var PresDrugs = JSON.stringify(array);
alert("DRUGS ADDED!");

this.Pres_.push(PresDrugs);


}


deleteTD(tpid:any){
  console.log(tpid)
  this._tdService.deleteTD(tpid).subscribe(
    data => {
      console.log('Deleted TD');
      this.ngOnInit();
    }
  )

}

}
