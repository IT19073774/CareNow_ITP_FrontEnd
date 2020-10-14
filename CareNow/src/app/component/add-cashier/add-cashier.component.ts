import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cashier } from 'src/app/models/cashier';

import { CashierService } from 'src/app/services/cashier.service';



@Component({
  selector: 'app-add-cashier',
  templateUrl: './add-cashier.component.html',
  styleUrls: ['./add-cashier.component.css']
})
export class AddCashierComponent implements OnInit {
  onSubmit(data)
  {
    console.warn(data);
  }
  cashier: Cashier =new Cashier;
  public password = "";
  
  


  constructor(private _cashierService: CashierService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }
    

  ngOnInit(): void {


  }

saveCashier() {
  console.log("Entered Save ");
    console.log(" Save ");
    console.log(this.password)
    this._cashierService.saveCashier(JSON.stringify(this.cashier), this.password).subscribe(
      data =>{
      console.log('response', data);
      this._router.navigate(["/listCash"])
    }
  )
  console.log("Finished Save ");
  }
}
