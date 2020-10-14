import { Component, OnInit } from '@angular/core';
import { ReceptionService } from 'src/app/services/reception.service';
import { Reception } from 'src/app/models/reception';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-reception',
  templateUrl: './list-reception.component.html',
  styleUrls: ['./list-reception.component.css']
})
export class ListReceptionComponent implements OnInit {
  onSubmit(data)
  {
    console.warn(data);
  }
  public isDetVisible = false
  reception: Reception [] = [];
  receptionEdit: Reception = new Reception;
  public password = "";

  filterterm: any;
  filters = {
    keyword: '',
    sortBy: ''
  }

  constructor(private _receptionService: ReceptionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    
    this.listReception();
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
      pdf.save('reception.pdf');
    });
  }
  
  deleteReception(id: number)
  {
  this._receptionService.deleteReception(id).subscribe(
    data =>{
      console.log('deleted response',data);
      this.listReception();
    },
    error => console.log(error)); 
  }
  
  addReception()
  {
    this._router.navigate(["/Regis"]);
  }
/*
  editReception(val:Number) {
    
    this.receptionEdit = {}
    for(let recep of this.reception) {
      if (recep["RecId"] == val ) {
        this.receptionEdit = recep
        break;
      }
    }
    console.log(this.receptionEdit)
    this.isDetVisible = true
  }

  */

  listReception()
  {
    this._receptionService.getReceptionist().subscribe(
      data => {
        console.log(data)
        this.reception =data}
    )
  }

  updateReception()
  {
   console.log("Entered Save ");
   console.log(" Save ");
   console.log(this.password)
   this._receptionService.updateReception(JSON.stringify(this.receptionEdit)).subscribe(
     data =>{
     console.log('response', data);
     this._router.navigate(["/listRecep"])
   }
 )
 console.log("Finished Save ");
 this.closeDetail();
}
  /*
  filterReception(reception: Reception[])
  {
    return reception.filter((e) => {
      return e.firstname.toLowerCase().includes(this.filters.keyword.toLowerCase());
     }).sort((a,b) => {
       if (this.filters.sortBy === 'FirstName')
       {
         return a.firstname.toLowerCase() < b.firstName.toLowerCase() ? -1: 1
       }
       else if (this.filters.sortBy === 'LastName')
       {
        return a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1: 1
       }
       else if (this.filters.sortBy === 'Email')
       {
        return a.email.toLowerCase() < b.email.toLowerCase() ? -1: 1
       }
       else if (this.filters.sortBy === 'DOB')
       {
        return a.dob > b.dob ? -1: 1;
       }
      
     } )

    }
     
*/

edit(r:Reception)
{
  this.isDetVisible = true;
  this.receptionEdit=r;
}
}
