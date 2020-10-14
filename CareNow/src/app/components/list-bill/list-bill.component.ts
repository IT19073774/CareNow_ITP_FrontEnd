import { prescription } from './../../modles/Precription';
import { Bill } from './../../modles/bill';
import { BillService } from './../../services/bill.service';
import { OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import html2canvas from 'html2canvas';
import  jspdf from 'jspdf';
import { Component,Input, TemplateRef, Injectable, ViewChild } from '@angular/core';
import { drug } from 'src/app/modles/drug';
import { CarenowService } from 'src/app/services/carenow.service';

interface LooseObject{
  [key:string]:any
}
@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css'],
  
})
export class ListBillComponent implements OnInit {
 
  result:any;
 

  @Input() name: string;
  public isButtonVisible = true;
  bill: Bill[] =[];
  billr: Bill[] =[];
  public reportDate = ""
  public presID :number;
  public isVisible = false;
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
 
  public searchText: string;
  bills: Observable<Bill[]>;
  billlist:any;  
  object:LooseObject={};
 

  
 
  drugs :drug[] =[];
  public drugdetails:[];
  public isDisplay= false;
  public totalprice:number;
  message = '';
  prescription: prescription;

 
 
  constructor(private _billservices:BillService,public service: CarenowService) { }
 
  ngOnInit(): void {
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };
    
    console.log("START")

    this.service.getBills().subscribe(
      data => {
        console.log(data)
        this.bill = data
        this.dtTrigger.next();
      });

      
        console.log("END")  
        
        
    
        
  
  } 


 
  //generte bill
  getbildeatils()
  {
    this._billservices.getbilldetails(this.presID).subscribe(
      data=>{
        this.prescription = data;
            
        
      }
    )
  }

  
  /*viewprescription(prescription:prescription)
  {
    this.drugdetails=[];
    this.json=JSON.parse(prescription.drugs)

    for(let j of this.json){
      this.object={};
      this.object.name=j["Drug Name"];
      this.object.price=["price"];
      this.drugdetails.push(this.object);

    }
  }*/



   
  
//delete a bill by id
   deletebill(id: number) {
    this._billservices.deletebill(id)
      .subscribe(
        data => {
          console.log(data);
      
          this.isButtonVisible =true;
          this._billservices.getBills().subscribe(data =>{
            this.bills =data
            })
        },
        error => console.log(error));   
  }

 //report dialog open 
openDialog() {
  this.isVisible = true
  
}
//report dialog close
  closeDetail() {
    this.isVisible = false
  }


//retrive details about report
  public generateReport() {
    this.isVisible = false;
    console.log(this.reportDate)
  
    this._billservices.searchdetails(this.reportDate).subscribe(data => {
      console.log(data)
      this.billr = data;
    })
  }



//retrive billdetails for bill
  /*public generatebill(){
    this.isVisible= false;
    console.log(this.presID)
    this._billservices.getbilldetails(this.presID).subscribe( data =>{
  
      
      data;
      this.newbill = data;
      console.log(data)
    })
  }*/

 //create a bill
 public createbill(){

  this._billservices.createNewBill(this.presID).subscribe(
    data=>console.log(data), error => console.log(error)
  );
 } 
  



//genrate report and bill pdf
generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
}


billgeneratePDF() {
  var data = document.getElementById('content');
  html2canvas(data).then(canvas => {
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4');
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('billPDF.pdf');
  });
}
  
//update payment status
updatePayement(id:number)
{
 this._billservices.updatepaymentStatus(id).subscribe(
  data => {
    console.log(data);
    this.message='payment status updated';

  }
 )
}

//updatr printing status
updatePrintingstatus(id:number)
{
  this._billservices.updatePrintingStatus(id).subscribe(
    data =>{
      console.log(data);
      this.message ='printing status updated';
    }
  )
}




//bill dialog open
openDialogbill() {
  this.isDisplay = true
 
}

//bill dialog false
closebiidialog(){
  this.isDisplay = false
}



}





  
 


