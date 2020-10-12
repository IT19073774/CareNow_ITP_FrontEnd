import { Component, OnInit } from '@angular/core';
import { Reception } from 'src/app/models/reception';
import { ReceptionService } from 'src/app/services/reception.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.css']
})
export class RegisComponent implements OnInit {

  reception: Reception = new Reception();

  constructor(private _receptionService: ReceptionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent)
    {
      const Id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._receptionService.getReceptions(Id).subscribe(
        data =>this.reception = data
      )
    }
  }

saveReception() {
  this._receptionService.saveReception(this.reception).subscribe(
    data =>{
      console.log('response', data);
      this._router.navigateByUrl("/list");
    }
  )

}

deleteReception(RecId:number)
{
  this._receptionService.deleteReception(RecId).subscribe(
    data =>{
      console.log('deleted response',data);
      this._router.navigateByUrl("/list");
    }
  )
}

}
