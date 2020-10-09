import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'
import { CarenowService } from 'src/app/services/carenow.service';

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-generate-reports',
  templateUrl: './generate-reports.component.html',
  styleUrls: ['./generate-reports.component.css']
})
export class GenerateReportsComponent implements OnInit {

  public isStepTab: boolean[] = [false, false, false, false];
  public currentTab = 0;
  public appoAttendance = []
  dateHolder:any;
  ans:any;
  obj: LooseObject = {};
  reportTitle: any;
  docDiagnose = [];


  constructor(public service:CarenowService) { }

  public showTab(n) {
    var x = document.getElementsByClassName("tabAddPat");
    this.isStepTab[n] = true;
    if (n == 0) {
      document.getElementById("AddPatprevBtn").style.display = "none";
    } else {
      document.getElementById("AddPatprevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("AddPatnextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("AddPatnextBtn").innerHTML = "Next";
    }
    this.fixStepIndicator(n)
  }

  public fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("stepAddPat");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" activeAddPat", "");
    }
    x[n].className += " activeAddPat";
  }

  public nextPrev(n, addPatForm: NgForm) {

    var x = document.getElementsByClassName("tabAddPat");
    this.isStepTab[this.currentTab] = false;
    this.currentTab = this.currentTab + n;
    if (this.currentTab >= x.length) {
      this.onSubmit(addPatForm);
      return false;
    }
    this.showTab(this.currentTab);
  }

  onSubmit(addPatForm: NgForm) {
    this.reportTitle = addPatForm.value.name
      var start = this.convertDateFormat(new Date(addPatForm.value.start))
      var end = this.convertDateFormat(new Date(addPatForm.value.end))
      console.log(start)
      switch (Number(addPatForm.value.type)) {
        case 3:
          this.service.getAppointmentAttendance(start,end).subscribe(async data => {
            console.log(JSON.stringify(data))
            for (let dat of data){
              this.obj = {}
              this.obj.appointmentId = "APP0" + dat["appointmentId"]
              this.obj.subject = dat["subject"]
              this.obj.description = dat["description"]
              this.obj.date = this.convertDateFormatOnly(new Date(dat["startTime"]))
              this.obj.timeslot = this.convertDateFormatTime(new Date(dat["startTime"])) + " - " + this.convertDateFormatTime(new Date(dat["endTime"]))
              switch (Number(dat["statusId"])) {
                case 1:
                this.obj.statusId = "PENDING"
                this.obj.color = "grey"
                break;
                case 2:
                this.obj.statusId = "ARRIVED"
                this.obj.color = "green"
                break;
                case 3:
                this.obj.statusId = "ABSENT"
                this.obj.color = "red"
                break;
              }
              
              this.appoAttendance.push(this.obj)
              console.log(this.obj)
            }
            await this.delay(300)
            this.download(addPatForm.value.name)
            addPatForm.reset();
            this.appoAttendance = [];
            
          })
        break;
        case 1:
          this.service.getDocDiagnose(start,end).subscribe(async data => {
            console.log(JSON.stringify(data))
            for (let dat of data){
              this.obj = {}
              this.obj.doctor = dat["doctor"]
              this.obj.patient = dat["patient"]
              this.obj.description = dat["description"]
              this.obj.date = this.convertDateFormatOnly(new Date(dat["date"]))
              this.obj.duration = this.getMinutesValue(new Date(dat["duration"])) - this.getMinutesValue(new Date(dat["date"]))
              
              this.docDiagnose.push(this.obj)
              console.log(this.obj)
            }
            await this.delay(300)
            this.download2(addPatForm.value.name)
            addPatForm.reset();
            this.docDiagnose = [];
            
          })
        break;
      }
      this.currentTab = 0;
      this.showTab(this.currentTab);
    }

  ngOnInit(): void {
    this.currentTab = 0;
    this.showTab(this.currentTab);
    
  }

  download(fileName:String) {
    var element = document.getElementById("attendanceReport")
    html2canvas(element).then((canvas) => {
      console.log(canvas)

       let pagewidth = 210

      var imgData = canvas.toDataURL('image/png')
      var imgHeight = (canvas.height * pagewidth / canvas.width)
      var doc = new jspdf.jsPDF
      doc.addImage(imgData, 0, 0, pagewidth, imgHeight)
      
      doc.save(fileName+".pdf")
    })
  }

  download2(fileName:String) {
    var element = document.getElementById("attendanceReport2")
    html2canvas(element).then((canvas) => {
      console.log(canvas)

       let pagewidth = 210

      var imgData = canvas.toDataURL('image/png')
      var imgHeight = (canvas.height * pagewidth / canvas.width)
      var doc = new jspdf.jsPDF
      doc.addImage(imgData, 0, 0, pagewidth, imgHeight)
      
      doc.save(fileName+".pdf")
    })
  }

  convertDateFormat(date:Date):any {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
    date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" +
    date.getSeconds()
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

  getMinutesValue(date:Date): any {
     return date.getHours() * 60 + date.getMinutes()
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve,ms));
  }
}
