import { Component, OnInit } from '@angular/core';
import { Stockmanager } from '../../models/stockmanager';
import { StockmanagerService } from '../../services/stockmanager.service';
import * as html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-stockmanager',
  templateUrl: './list-stockmanager.component.html',
  styleUrls: ['./list-stockmanager.component.css']
})
export class ListStockmanagerComponent implements OnInit {

  public isDetVisible = false
  stockmanager: Stockmanager[] = [];
  stockmanagerEdit:Stockmanager = new Stockmanager;

  public password="";
  filterterm: string;
  filters = {
    keyword: '',
    sortBy: ''
  }




  constructor(private _stockmanagerServices: StockmanagerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    
    this.listStockmanager();
  }

  closeDetail() {
    this.isDetVisible = false
  }

  
  downloadPDF() {
    var data = document.getElementById('contentToConvert');
    html2pdf(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Stock Manager List.pdf');
    });
  }
  

  deleteStockmanager(sid: number)
  {
  this._stockmanagerServices.deleteStockmanager(sid).subscribe(
    data =>{
      console.log('deleted response',data);
      this.listStockmanager();
    }
  )
  }
  

  listStockmanager()
  {
    this._stockmanagerServices.getStockmanager().subscribe(
      data => {
        console.log(data)
        this.stockmanager =data}
    )
  }
saveStockmanager() {
  console.log("Entered Save ");
    console.log(" Save ");
    console.log(this.password)
    this._stockmanagerServices.saveStockmanager(JSON.stringify(this.stockmanagerEdit), this.password).subscribe(
      data =>{
      console.log('response', data);
      this._router.navigate(["/listStockmanager"])
    }
  )
  console.log("Finished Save ");
  this.closeDetail();
}


edit(stock:Stockmanager) {
  this.isDetVisible = true;
  this.stockmanagerEdit=stock;


}
addStockManager(){
  this._router.navigate(["addStockmanager"]);
}
updateStockmanager()
   {
    console.log("Entered Save ");
    console.log(" Save ");
    console.log(this.password)
    this._stockmanagerServices.updateStockmanager(JSON.stringify(this.stockmanagerEdit)).subscribe(
      data =>{
      console.log('response', data);
      this._router.navigate(["/listStockmanager"])
    }
  )
  console.log("Finished Save ");
  this.closeDetail();
}

}
