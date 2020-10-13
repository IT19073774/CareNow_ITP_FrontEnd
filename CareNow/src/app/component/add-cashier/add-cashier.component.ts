import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cashier } from '../../models/cashier';
import { CashierService } from '../../services/cashier.service';

@Component({
  selector: 'app-add-cashier',
  templateUrl: './add-cashier.component.html',
  styleUrls: ['./add-cashier.component.css']
})
export class AddCashierComponent implements OnInit {

  public password = "";
  cashier:any = {}
 


  constructor(private _cashierServices: CashierService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }
    

  ngOnInit(): void {
/*
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent)
    {
      const Id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._cashierServices.getCashier().subscribe(
        data =>this.cashier = data
      )
    }
   */
  
  }

saveCashier() {
  console.log("Entered Save ");
  if(this.cashier.email.includes("@") && this.cashier.email.includes(".com")){
    console.log(" Save ");
    console.log(this.password)
    this._cashierServices.saveCashier(JSON.stringify(this.cashier), this.password).subscribe(
      data =>{
      console.log('response', data);
      this._router.navigate(["/listCash"])
    }
  )
  console.log("Finished Save ");
  }
}




deleteCashier(cid:number)
{
  this._cashierServices.deleteCashier(cid).subscribe(
    data =>{
      console.log('deleted response',data);
     }
  )
}

}