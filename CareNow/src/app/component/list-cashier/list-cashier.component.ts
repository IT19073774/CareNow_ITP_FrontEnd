import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { Cashier } from '../../models/cashier';
import { CashierService } from '../../services/cashier.service';

@Component({
  selector: 'app-list-cashier',
  templateUrl: './list-cashier.component.html',
  styleUrls: ['./list-cashier.component.css']
})
export class ListCashierComponent implements OnInit {

  public isDetVisible = false
  cashier: any = [];
  cashierEdit:any = {}

  filters = {
    keyword: '',
    sortBy: ''
  }

  constructor(private _cashierServices: CashierService) { }


  ngOnInit(): void {
    
    this.listCashier();
  }

  closeDetail() {
    this.isDetVisible = false
  }

  downloadPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }
  
  updateCashier(val:Number) {
    
    this.cashierEdit = {}
    for(let cash of this.cashier) {
      if (cash["cid"] == val ) {
        this.cashierEdit = cash
        break;
      }
    }
    console.log(this.cashierEdit)
    this.isDetVisible = true
  }
  deleteCashier(id: number)
  {
  this._cashierServices.deleteCashier(id).subscribe(
    data =>{
      console.log('deleted response',data);
      this.listCashier();
    },
    error => console.log(error));   
}
   


  listCashier()
  {
    this._cashierServices.getCashier().subscribe(
      data => {
        console.log(data)
        this.cashier =data}
    )
  }
/*
  filterCashier(cashier: Cashier[])
  {
    return cashier.filter((e) => {
      return e.cashfirstname.toLowerCase().includes(this.filters.keyword.toLowerCase());
     }).sort((a,b) => {
       if (this.filters.sortBy === 'FirstName')
       {
         return a.cashfirstname.toLowerCase() < b.cashfirstname.toLowerCase() ? -1: 1
       }
       else if (this.filters.sortBy === 'LastName')
       {
        return a.cashlastname.toLowerCase() < b.cashlastname.toLowerCase() ? -1: 1
       }
       else if (this.filters.sortBy === 'Email')
       {
        return a.cashemail.toLowerCase() < b.cashemail.toLowerCase() ? -1: 1
       }
       else if (this.filters.sortBy === 'DOB')
       {
        return a.cashdob > b.cashdob ? -1: 1;
       }
      
     } )
  }
*/
}


