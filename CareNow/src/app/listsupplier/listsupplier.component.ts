import { Component, OnInit } from '@angular/core';
import { Supplier } from '../model/supplier';
import { SupplierService } from '../service/supplier.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-listsupplier',
  templateUrl: './listsupplier.component.html',
  styleUrls: ['./listsupplier.component.css']
})
export class ListsupplierComponent implements OnInit {

  suppliers: Supplier[]=[];

  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  filtersAd = {
    keywordAd: ''
  }

  filtersDt = {
    keywordDt: ''
  }

  constructor(private _supplierService: SupplierService) { }

  ngOnInit(): void {
    this.listSupplier();
  }

  deleteSupplier(id: number) {
    this._supplierService.deleteSupplier(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listSupplier();
      }
    )
  }

  listSupplier(){
    this._supplierService.getSuppliers().subscribe(
      data => this.suppliers = this.filterSuppliers(data))
    
  }  
  filterSuppliers(suppliers: Supplier[]){
    return suppliers.filter((s) => {
      return s.name.toLowerCase().includes(this.filters.keyword.toLowerCase());
    }).sort((a, b) => {
      if (this.filters.sortBy === 'Name') {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1: 1;
      }else if(this.filters.sortBy === 'Amount') {
        return a.id > b.id ? -1: 1;
      }
    })
   }

   listSupplierAd(){
    this._supplierService.getSuppliers().subscribe(
      data => this.suppliers = this.filterSuppliersAd(data))
    
  }
     filterSuppliersAd(suppliers: Supplier[]){
    return suppliers.filter((s) => {
      return s.address.toLowerCase().includes(this.filtersAd.keywordAd.toLowerCase());
    })
   }

   listSupplierDt(){
    this._supplierService.getSuppliers().subscribe(
      data => this.suppliers = this.filterSuppliersDt(data))
    
  }
     filterSuppliersDt(suppliers: Supplier[]){
    return suppliers.filter((s) => {
      return s.drugtype.toLowerCase().includes(this.filtersDt.keywordDt.toLowerCase());
    })
   }

   
  download(){
    const options = {
      name: 'output.pdf',
      image: { type: 'jpeg'},
      html2pdf: {},
      jsPDF:{orientation:'landscape'}
    }

    const element: Element = document.getElementById('suppliers')

    html2pdf()
     .from(element)
     .set(options)
     .save()
     
  }
}
