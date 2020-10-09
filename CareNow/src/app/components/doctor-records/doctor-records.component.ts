import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarenowService } from '../../services/carenow.service'

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-doctor-records',
  templateUrl: './doctor-records.component.html',
  styleUrls: ['./doctor-records.component.css']
})
export class DoctorRecordsComponent implements OnInit {

  public isDetVisible: boolean = false;
  public isaddVisible: boolean = false;
  obj: LooseObject = {};
  detail: LooseObject = {};
  public detailPatient = [];
  public detailShift = [];
  public detailAppointment = [];
  public doctors = [];
  public shift = [];
  dateHolder = "";
  public inputDay;
  public inputTimeSlot;
  public inputId;
  public searchTerm = "";
  public searchTermappo = "";
  ans:any;
  public slotLoop = [0,1,2,3,4,5,6,7,8,9,10,11]
  public dayLoop = [0,1,2,3,4,5,6]
  public refLoop = ["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00","24:00"]

  constructor(public service:CarenowService ) { }

  ngOnInit(): void {

    this.service.getAllEmployees()
        .subscribe(doctors => {
          
          for(let doc of doctors) {
            
            if (doc["type"] == "DOCTOR") {
              
              this.obj = {};
              this.obj.employeeId = doc["employeeId"]
              this.obj.address = doc["address"]
              this.obj.contactNo = doc["contactNo"]
              this.obj.dob = doc["dob"]
              this.obj.email = doc["email"]
              this.obj.firstName = doc["firstName"]
              this.obj.gender = doc["gender"]
              this.obj.hiredDate = doc["hiredDate"]
              this.obj.lastName = doc["lastName"]
              this.obj.nic = doc["nic"]

              this.pushObject(this.obj)
            }
          }
        })

        this.service.getShift()
            .subscribe(data => {
              for(let doc of data) {    
                  this.obj = {};
                  this.obj.shiftId = doc["shiftId"]
                  this.obj.doctorId = doc["doctorId"]
                  this.obj.shiftDay = doc["shiftDay"]
                  this.obj.shiftSlotStart = doc["shiftSlotStart"]
                  this.obj.shiftSlotEnd = doc["shiftSlotEnd"]
                  this.obj.boxColor = doc["boxColor"]
                  this.obj.boxId = doc["boxId"]

                  this.shift.push(this.obj)
              }
            })
        /*
            let count = 0;
            let loop = 0;
            for (let val = 11; val < 128; val++) {
                      this.refLoop[loop] = val;
                      count++;
                      loop++;
                if (count == 7) {
                  count = 0;
                  val = val + 3
                }
                
            }
            console.log(this.shift)*/
  }

  pushObject(objtest:LooseObject):void {
    this.service.getDoctor(objtest.employeeId)
              .subscribe(doc => {
                  objtest.doctorId = "DOC0" + doc["doctorId"]
                  objtest.education = doc["education"]
                  objtest.color = doc["color"]
              })
    this.doctors.push(objtest)
  }

  public shiftUpdate(val:any) {
  
    /*console.log(this.shift[val])
    this.shift[val].boxColor = "green"
    console.log(this.shift[val])
    this.service.updateShift(JSON.stringify(this.shift[val]))
        .subscribe(checker => console.log(checker))*/
        
    this.isaddVisible = true;
    this.inputDay = this.shift[val].shiftDay
    this.inputTimeSlot = this.convertDateFormatTime(new Date(this.shift[val].shiftSlotStart)) + " - " + 
    this.convertDateFormatTime(new Date(this.shift[val].shiftSlotEnd))
    this.inputId = val
  }

  public onSubmit(shiftForm: NgForm) {
    this.isaddVisible = false;
    if (shiftForm.value.doctor == "") {
      this.shift[this.inputId].boxColor = "white"
      this.shift[this.inputId].doctorId = "DOC0"
    } else {
      for ( let doc of this.doctors) {
        if (shiftForm.value.doctor == doc["employeeId"]){
          this.shift[this.inputId].boxColor = doc["color"]
          this.shift[this.inputId].doctorId = doc["doctorId"]
        }
      }
    }
    this.service.updateShift(JSON.stringify(this.shift[this.inputId]))
        .subscribe(checker => console.log(checker))
  }

  public openAdd() {
    this.isaddVisible = true;
  }

  public closeDetail() {
    this.isDetVisible = false;
  }

  public openDetail(val: any) {  
    for (let doc of this.doctors) {
      if (doc["doctorId"] == val){
        this.detail = {}
        this.detail = doc
      }
    }
    this.service.getDocsPatient(val).subscribe(data => {
      this.detailPatient = data;
      this.isDetVisible = true;
    })

    this.service.getDocsShift(val).subscribe(data => {
      this.detailShift = [];
      for (let dat of data) {
        this.obj = {}
        this.obj.shiftId = dat["shiftId"]
        this.obj.shiftDay = dat["shiftDay"]
        switch (dat["shiftDay"]) {
          case "Monday":
            this.obj.color = "#48BEC9"
            break;
            case "Tuesday":
              this.obj.color = "#20CF38"
              break;
              case "Wednesday":
            this.obj.color = "#812EE4"
            break;
            case "Thursday":
            this.obj.color = "#D32EE4"
            break;
            case "Friday":
            this.obj.color = "#E42E55"
            break;
            case "Saturday":
            this.obj.color = "#E4472E"
            break;
            case "Sunday":
            this.obj.color = "#E4AA2E"
            break;
          default: this.obj.color = "white"
            break;
        }
        this.obj.shiftSlotStart = this.convertDateFormatTime(new Date(dat["shiftSlotStart"]))
        this.obj.shiftSlotEnd = this.convertDateFormatTime(new Date(dat["shiftSlotEnd"]))
        this.detailShift.push(this.obj)
      }
    })


    this.service.getDocsAppointments(val).subscribe(data => {
      this.detailAppointment=[]
      for (let dat of data) {
        this.obj = {}
        this.obj.appointmentId = dat["appointmentId"]
        this.obj.patientId = dat["patientId"]
        this.obj.description = dat["description"]
        this.obj.timeSlot = this.convertDateFormatTime(new Date(dat["startTime"])) + " - " +  this.convertDateFormatTime(new Date(dat["endTime"]))
        this.obj.date = this.convertDateFormatOnly(new Date(dat["endTime"]))
        switch(Number(dat["statusId"])){
          case 1: 
            this.obj.status = "PENDING";
            this.obj.color = "#A9A9A9";
            break;
          case 2:
            this.obj.status = "ARRIVED";
            this.obj.color = "#228B22";
            break;
          case 3: 
            this.obj.status = "ABSENT";
            this.obj.color = "#F22035"; 
            break;
        }
        this.detailAppointment.push(this.obj)
        
      }
    })
    
  }

  public closeAdd() {
    this.isaddVisible = false;
  }

  public openTab(evt, tabName) {
    this.searchTermappo = "";
    var i, tabcontent, tabcontentMain, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tabcontentMain = document.getElementsByClassName("tabcontentMain");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    for (i = 0; i < tabcontentMain.length; i++) {
      tabcontentMain[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  convertDateFormat(date:Date):any {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
    date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" +
    date.getSeconds()
  }

  convertDateFormatTime(date:Date):any {
    if (date.getHours() < 10) 
      this.ans  = "0" + date.getHours()
    else
      this.ans  = date.getHours()
    if (date.getMinutes() < 10) 
      this.ans  = this.ans + ":" + "0" + date.getMinutes()
    else
      this.ans  = this.ans + ":" + date.getMinutes()
    return this.ans
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  convertDateFormatOnly(date:Date):any {
    
    this.dateHolder = date.getFullYear() + "-";
    if ((date.getMonth() + 1) < 10 ) {
      this.dateHolder = this.dateHolder + "0" + (date.getMonth() + 1) + "-"
    } else {
      this.dateHolder = this.dateHolder + (date.getMonth() + 1) + "-"
    }
    this.dateHolder += date.getDate()

    return this.dateHolder
  }
}
