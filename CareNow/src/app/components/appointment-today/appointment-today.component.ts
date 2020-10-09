import { Component, OnInit } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { Router } from '@angular/router';

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-appointment-today',
  templateUrl: './appointment-today.component.html',
  styleUrls: ['./appointment-today.component.css']
})

export class AppointmentTodayComponent implements OnInit {
  

  ampm: String;
  hour: any;
  minute: String;
  second: String;
  date: Date;
  public isVisible: boolean = true;
  public isVisibleShift:boolean = true;
  public appointments = [];
  public doctors = [];
  public eventSubject: String;
  public eventDesc: String;
  public eventStart: String;
  public eventEnd:String;
  public appProgress:any = 0;
  public docProgress:any = 0;
  public previousDoc = "";
  public previousIndex = -1;
  obj: LooseObject = {};
  previous: LooseObject = {};
  id:Int16Array;
  dateHolder:any;
  json:any;
  public message:any;

  constructor(private service:CarenowService, private router: Router) { }

  public getAppointment() : void {
    let count = 0;
    this.service.getAppointmentToday(this.convertDateFormatOnly(new Date()))
        .subscribe(data => {
          for (let dat of data){
              if (new Date() <= new Date(dat["endTime"])){

                if (count == 0) {
                  if (new Date() < new Date(dat["startTime"])){
                    this.isVisible=true;
                    count++;
                  } else {
                    this.isVisible=false;
                    count++;
                  }
                }

                this.obj = {};
                this.obj.Id = dat["appointmentId"]
                this.obj.Subject = dat["subject"]
                this.obj.Description = dat["description"]
                this.obj.StartTime = new Date(dat["startTime"])

                this.date = new Date(dat["startTime"])
                var hoursnew:any = this.date.getHours();
                var ampmnew:any = hoursnew >= 12 ? "PM" : "AM";
                var hoursnew2: any = hoursnew % 12;
                hoursnew2 = hoursnew2 ? hoursnew2 : 12;
                hoursnew2 = hoursnew2 < 10 ?  '0' + hoursnew2 : hoursnew2;

                var minutesnew: any = this.date.getMinutes();
                minutesnew = minutesnew < 10 ? '0' + minutesnew : minutesnew.toString();

                this.obj.StartTimeOnly =  hoursnew2 + " :" + minutesnew + " " + ampmnew;


                this.obj.EndTime = new Date(dat["endTime"])

                this.date = new Date(dat["endTime"])
                var hoursnew:any = this.date.getHours();
                var ampmnew:any = hoursnew >= 12 ? "PM" : "AM";
                var hoursnew2: any = hoursnew % 12;
                hoursnew2 = hoursnew2 ? hoursnew2 : 12;
                hoursnew2 = hoursnew2 < 10 ?  '0' + hoursnew2 : hoursnew2;

                var minutesnew: any = this.date.getMinutes();
                minutesnew = minutesnew < 10 ? '0' + minutesnew : minutesnew.toString();

                this.obj.EndTimeOnly =  hoursnew2 + " :" + minutesnew + " " + ampmnew;
                this.obj.patientId = dat["patientId"]
                switch (Number(dat["statusId"])) {
                  case 1 :
                    this.obj.StatusId = "WAITING";
                    break;
                  case 2 :
                    this.obj.StatusId = "ARRIVED";
                    break;
                  case 3 :
                    this.obj.StatusId = "ABSENT";
                    break;
                }
                this.pushObject(this.obj)
              }
          }
        })
  }

  public getDoctorShift() : void {
    var day;
    var currentDate = new Date(/*"2020-09-15 05:00:00"*/);
    switch (currentDate.getDay()) {
      case 1:
        day = "Monday"
        break;
      case 2:
        day = "Tuesday"
        break;
      case 3:
        day = "Wednesday"
        break;
      case 4:
        day = "Thursday"
        break;
      case 5:
        day = "Friday"
        break;
      case 6:
        day = "Saturday"
        break;
      case 7:
        day = "Sunday"
        break;
        
    }
    let count = 0;
    this.service.getShiftToday(day)
        .subscribe(shift => {
          console.log(shift)
          for(let shif of shift) {
            let endHour = new Date(shif["shiftSlotEnd"]).getHours()
            
            if (new Date(shif["shiftSlotEnd"]).getDate() == 2) {
              endHour = 24
            }
            endHour = (endHour * 60*60) + (new Date(shif["shiftSlotEnd"]).getMinutes()*60) + (new Date(shif["shiftSlotEnd"]).getSeconds())
            let currentHour = ((currentDate.getHours()*60*60) +(currentDate.getMinutes()*60) + currentDate.getSeconds())
            if (currentHour <= endHour){

              if (count == 0) {
                if (currentHour < ((new Date(shif["shiftSlotStart"]).getHours()*60*60)+(new Date(shif["shiftSlotStart"]).getMinutes()*60)+(new Date(shif["shiftSlotStart"]).getSeconds()))){
                  this.isVisibleShift=true;
                  count++;
                } else {
                  this.isVisibleShift=false;
                  count++;
                }
              }
                        
                          this.obj = {}
                            this.obj = shif
                            this.date = new Date(shif["shiftSlotStart"])
                            var hoursnew:any = this.date.getHours();
                            var ampmnew:any = hoursnew >= 12 ? "PM" : "AM";
                            var hoursnew2: any = hoursnew % 12;
                            hoursnew2 = hoursnew2 ? hoursnew2 : 12;
                            hoursnew2 = hoursnew2 < 10 ?  '0' + hoursnew2 : hoursnew2;

                            var minutesnew: any = this.date.getMinutes();
                            minutesnew = minutesnew < 10 ? '0' + minutesnew : minutesnew.toString();

                            this.obj.startOnly =  hoursnew2 + " :" + minutesnew + " " + ampmnew;

                            this.date = new Date(shif["shiftSlotEnd"])
                            var hoursnew:any = this.date.getHours();
                            var ampmnew:any = hoursnew >= 12 ? "PM" : "AM";
                            var hoursnew2: any = hoursnew % 12;
                            hoursnew2 = hoursnew2 ? hoursnew2 : 12;
                            hoursnew2 = hoursnew2 < 10 ?  '0' + hoursnew2 : hoursnew2;

                            var minutesnew: any = this.date.getMinutes();
                            minutesnew = minutesnew < 10 ? '0' + minutesnew : minutesnew.toString();

                            this.obj.endOnly =  hoursnew2 + " :" + minutesnew + " " + ampmnew;

                            this.doctors.push(this.obj)
            }        
          }
        })

        console.log(this.doctors)
    
  }

  ngOnInit(): void {
    this.appProgress = 0;
    this.docProgress = 0;
    this.doctors = [];
    this.getDoctorShift();
    this.getAppointment(); 
    
    if (this.appointments.length == 0) {
      this.message = "NO MORE APPOINMENTS FOR TODAY!"
    } else {
      this.message = "NO APPOINTMENT AT THIS TIME!"
    }

    setInterval(() => {
      const clock = new Date();
      this.updateClock(clock)
      this.appointmentProgress();
      this.doctorProgress();
    }, 1000)

    
  }



  pushObject(objtest:Object):void {
    this.appointments.push(objtest)
    if (this.appointments.length == 0) {
      this.message = "NO MORE APPOINMENTS FOR TODAY!"
    } else {
      this.message = "NO APPOINTMENT AT THIS TIME!"
    }
  }

  private updateClock(clock: Date) {
    const hours = clock.getHours();
    this.ampm = hours >= 12 ? "PM" : "AM";
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ?  '0' + this.hour : this.hour;

    const minutes = clock.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds = clock.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }

  public appointmentProgress() {
    this.appProgress = 0;
    this.obj = {};
    this.obj.current = new Date()
    let deno = this.appointments[0].EndTime - this.appointments[0].StartTime;
    let numo = this.obj.current - this.appointments[0].StartTime;
    let refreshVal = 10;
  
    if (this.isVisible == true) {
      refreshVal = this.appointments[0].StartTime - this.obj.current;
     
    }
    this.appProgress = (numo/deno)*100
    if (this.appProgress >= 100 || refreshVal <= 0) {
      
      this.appointments = [];
      this.appProgress = 0;
      this.ngOnInit();
    }
  }

  public doctorProgress() {
    this.docProgress = 0;
    this.obj = {};
    this.obj.current = (new Date().getHours()*60*60)+(new Date().getMinutes()*60)+(new Date().getSeconds())
    this.obj.End = (new Date(this.doctors[0].shiftSlotEnd).getHours() * 60*60) + (new Date(this.doctors[0].shiftSlotEnd).getMinutes()*60) +(new Date(this.doctors[0].shiftSlotEnd).getSeconds())
    this.obj.Start = (new Date(this.doctors[0].shiftSlotStart).getHours() * 60*60) + (new Date(this.doctors[0].shiftSlotStart).getMinutes()*60) +(new Date(this.doctors[0].shiftSlotStart).getSeconds())
    let deno = this.obj.End - this.obj.Start;
    let numo = this.obj.current - this.obj.Start;
    let refreshVal = 10;
    if (this.isVisibleShift == true) {
      refreshVal = this.obj.Start - this.obj.current;
     
    }
    this.docProgress = (numo/deno)*100
    if (this.docProgress >= 100 || refreshVal <= 0) {
      
      this.doctors = [];
      this.docProgress = 0;
      this.ngOnInit();
    }
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

  updateAttendanceStatus(id:Int16Array,val:Int16Array) {

    this.appointments[0].StatusId = val;
    this.obj = {};
        this.obj.appointmentId = this.appointments[0].Id
        this.obj.subject = this.appointments[0].Subject
        this.obj.description = this.appointments[0].Description
        this.obj.statusId = this.appointments[0].StatusId
        this.obj.patientId = this.appointments[0].patientId
        this.obj.startTime = this.convertDateFormat(this.appointments[0].StartTime)
        this.obj.endTime = this.convertDateFormat(this.appointments[0].EndTime)
        this.service.updateAppointment(JSON.stringify(this.obj))
                    .subscribe(checker => console.log(checker));
    
    this.service.updateAppointment(JSON.stringify(this.obj))
                    .subscribe(checker => console.log(checker));
    this.appointments = [];
    this.appProgress = 0;
    this.ngOnInit();


        
  }
  
}
