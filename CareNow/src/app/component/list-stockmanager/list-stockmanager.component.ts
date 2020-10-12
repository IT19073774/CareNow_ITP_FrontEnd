import { Component, OnInit } from '@angular/core';
import { Stockmanager } from '../../models/stockmanager';
import { StockmanagerService } from '../../services/stockmanager.service';

@Component({
  selector: 'app-list-stockmanager',
  templateUrl: './list-stockmanager.component.html',
  styleUrls: ['./list-stockmanager.component.css']
})
export class ListStockmanagerComponent implements OnInit {

  public isDetVisible = false
  stockmanager: any = [];
  stockmanagerEdit:any = {}

  filters = {
    keyword: '',
    sortBy: ''
  }

  constructor(private _stockmanagerServices: StockmanagerService) { }


  ngOnInit(): void {
    
    this.listStockmanager();
  }

  closeDetail() {
    this.isDetVisible = false
  }

  updateStockmanager(val:Number) {
    
    this.stockmanagerEdit = {}
    for(let stock of this.stockmanager) {
      if (stock["sid"] == val ) {
        this.stockmanagerEdit = stock
        break;
      }
    }
    console.log(this.stockmanagerEdit)
    this.isDetVisible = true
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
  savePharmacist() {
    this._stockmanagerServices.saveStockmanager(this.stockmanager).subscribe(
      data =>{
        console.log('response', data);

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


