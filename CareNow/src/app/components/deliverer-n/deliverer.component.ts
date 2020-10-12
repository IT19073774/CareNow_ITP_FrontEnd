import { data } from 'jquery';
import { DeliveryservicesService } from './../../services/deliveryservices.service';
import { Component, AfterViewInit, ViewChild,Input } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { deliveryrecords } from 'src/app/modles/deliverrecords';

@Component({
  selector: 'app-deliverer',
  templateUrl: './deliverer.component.html',
  styleUrls: ['./deliverer.component.css']
})
export class DelivererNComponent {
  
  
  @Input() name: string;
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject(); 
  //public searchText: string;
 // displayedColumns: string[] = ['recordid', 'Patient_Name','Deliverer_name','delivery_address','status','Accept','Confirm','Error'];
  public records: Observable<deliveryrecords[]>;
  recordlist:any;   
  public record1 = new deliveryrecords();
  record: deliveryrecords[] =[];
  message = '';
  private isButtonVisible=false;
  public clicked = false;

  constructor(private _delservices:DeliveryservicesService) { }

 



 

  /*highlight(records: deliveryrecords) {
    records.highlighted = !records.highlighted;
  }*/



  
  
  actionMethod() {
    console.log("actionMethod was called!");
  }

  


  
  
  ngOnInit(): void {

    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };
   
     this._delservices.getdelivery_records().subscribe(
      data =>{

        this.record=data;
        this.dtTrigger.next();

      }
    );
    this.message='';
  } 


  
  updaterecordsconfirm(id: number){
    this._delservices.updaterecordsconfirm(id,data).subscribe(
     data =>{
        console.log(data);
        this.message='updated';
        
      },

              error => {
          console.log(error);
        });
    
  
      }


      updaterecordserror(id: number){
        this._delservices.updaterecordserror(id,data).subscribe(
         data =>{
            console.log(data);
            this.message='updated';
            
          },
    
                  error => {
              console.log(error);
            });
        
      
          }

       UpdaterecordsACCEPT(id :number,name:String){
            this._delservices.updaterecordsACCEPT(id,name,data).subscribe(
              data =>{
                console.log(data);
                this.message='updated';
              },

            error =>{
              console.log(error);
              
            }
              

            );
          }


      /*   afAuth.authState.subscribe(user => {
            if(user) userId = user.uid
            //you have to write the logic here.
      
          }) */


    }


  


