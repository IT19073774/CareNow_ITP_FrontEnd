import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stockmanager } from "../../models/stockmanager";
import { StockmanagerService } from "../../services/stockmanager.service";


@Component({
  selector: 'app-add-stockmanager',
  templateUrl: './add-stockmanager.component.html',
  styleUrls: ['./add-stockmanager.component.css']
})
export class AddStockmanagerComponent implements OnInit {

  stockmanager: Stockmanager=new Stockmanager;
  public password = "";


  constructor(private _stockManagerServices: StockmanagerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
) { }

  ngOnInit(): void {  

}
saveStockmanager() {
  console.log("Entered Save ");
  if(this.stockmanager.email.includes("@") && this.stockmanager.email.includes(".com")){
    console.log(" Save ");
    console.log(this.password)
    this._stockManagerServices.saveStockmanager(JSON.stringify(this.stockmanager), this.password).subscribe(
      data =>{
      console.log('response', data);
      this._router.navigate(["/listStockManager"])
    }
  )
  console.log("Finished Save ");
  }
}
}