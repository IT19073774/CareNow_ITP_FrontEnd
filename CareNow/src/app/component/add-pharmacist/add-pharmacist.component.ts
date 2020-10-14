import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pharmacist } from '../../models/pharmacist';
import { Employee } from '../../models/employee';
import { PharmacistService } from '../../services/pharmacist.service';

@Component({
  selector: 'app-add-pharmacist',
  templateUrl: './add-pharmacist.component.html',
  styleUrls: ['./add-pharmacist.component.css']
})
export class AddPharmacistComponent implements OnInit {

  pharmacist:Pharmacist=new Pharmacist;
  public password = "";
 // employee: Employee =new Employee();
  //pharmacist:any={};

  constructor(private _pharmacistServices: PharmacistService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  
  }

savePharmacist() {
  console.log("Entered Save ");
  if(this.pharmacist.email.includes("@") && this.pharmacist.email.includes(".com")){
    console.log(" Save ");
    console.log(this.password)
    this._pharmacistServices.savePharmacist(JSON.stringify(this.pharmacist), this.password).subscribe(
      data =>{
      console.log('response', data);
      this._router.navigate(["/listPharmacist"])
    }
  )
  console.log("Finished Save ");
  }
}


deletePharmacist(pid:number)
{
  this._pharmacistServices.deletePharmacist(pid).subscribe(
    data =>{
      console.log('deleted response',data);
      this._router.navigateByUrl("/listPharmacist");
    }
  )
}

}