import { Component, OnInit } from '@angular/core';
import { Supplier } from '../model/supplier';
import { SupplierService } from '../service/supplier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.css']
})
export class AddsupplierComponent implements OnInit {

  supplier: Supplier = new Supplier();
  SupplierDemo: Supplier = new Supplier();
  supplierForm: FormGroup;

 
  constructor(private _supplierService: SupplierService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._supplierService.getSupplier(id).subscribe(
        data => this.supplier = data 
      )
     // this.initForm();
  }
  }

  saveSupplier() {
    if(this.supplier.email.includes("@") && this.supplier.email.includes(".com")){
      console.log(" Save ");
      this._supplierService.saveSupplier(this.supplier).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl("/suppliers");
        }
      )
    }
  }

  deleteSupplier(id: number) {
    this._supplierService.deleteSupplier(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/suppliers');
      }
    )
  }

}
