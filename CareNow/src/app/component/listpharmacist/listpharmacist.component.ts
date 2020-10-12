import { Component, OnInit } from '@angular/core';
import { Pharmacist } from '../../models/pharmacist';
import { PharmacistService } from '../../services/pharmacist.service';

@Component({
  selector: 'app-listpharmacist',
  templateUrl: './listpharmacist.component.html',
  styleUrls: ['./listpharmacist.component.css']
})
export class ListPharmacistComponent implements OnInit {

  public isDetVisible = false
  pharmacist: any = [];
  pharmacistEdit:any = {}

  filters = {
    keyword: '',
    sortBy: ''
  }
  

  constructor(private _pharmacistServices: PharmacistService) { }


  ngOnInit(): void {
    
    this.listPharmacist();
  }

  closeDetail() {
    this.isDetVisible = false
  }


  updatePharmacist(val:Number) {
    
    this.pharmacistEdit = {}
    for(let pharma of this.pharmacist) {
      if (pharma["pid"] == val ) {
        this.pharmacistEdit = pharma
        break;
      }
    }
    console.log(this.pharmacistEdit)
    this.isDetVisible = true
  }
 
  deletePharmacist(pid: number)
  {
  this._pharmacistServices.deletePharmacist(pid).subscribe(
    data =>{
      console.log(data);
      this.listPharmacist();
    },
    error => console.log(error) 
  )
  }
  
 
  
  listPharmacist()
  {
    this._pharmacistServices.getPharmacist().subscribe(
      data => {
        console.log(data)
        this.pharmacist =data}
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


