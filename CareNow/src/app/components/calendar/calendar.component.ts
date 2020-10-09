import { Component, OnInit } from '@angular/core';
import { View, EventSettingsModel, ScheduleComponent, ActionEventArgs, EventRenderedArgs } from '@syncfusion/ej2-angular-schedule';
import { CarenowService } from 'src/app/services/carenow.service';
import { Router } from '@angular/router';


interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html', 
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public statusCollections: Object[] = [
    { Status: 'PENDING', StatusId: 1, Color: '#A9A9A9' },
      { Status: 'ARRIVED', StatusId: 2, Color: '#228B22' },
      { Status: 'ABSENT', StatusId: 3, Color: '#F22035' }

  ];
  public patientCollections: Object[] = [];

  
  public appointments = [];
  obj: LooseObject = {};
  public setView: View = "Day";
  public scheduleViews: View[] = ['Week','Month']
  id:Int16Array;

  constructor(private service:CarenowService, private router: Router) { }


  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor = '#A9A9A9';
    switch(args.data.StatusId as number){
      case 1 : 
        categoryColor = '#A9A9A9'
      break;
      case 2: categoryColor = '#228B22'
        break;
      case 3: categoryColor = '#F22035'
      break;
    }
    if (!args.element || !categoryColor) {
        return;
    }
     args.element.style.backgroundColor = categoryColor;

}


  onActionComplete(args:ActionEventArgs): void {
    //console.log(args.requestType)
    if (args.requestType == 'eventCreated')  {
      var name;
      for (let added of args.addedRecords){
        for (let pat of this.patientCollections){
          if (added["patientId"] == pat["patientId"])
           var name = pat["patientName"]
        }
        this.obj = {};
        this.obj.subject = name
        this.obj.description = added["Description"]
        this.obj.statusId = 1
        this.obj.patientId = added["patientId"]
        this.obj.startTime = this.convertDateFormat(added["StartTime"])
        this.obj.endTime = this.convertDateFormat(added["EndTime"])
        this.service.createAppointment(JSON.stringify(this.obj))
                    .subscribe(checker => {
                      console.log(checker)
                      this.ngOnInit();
                    });
        
      }
    } else if (args.requestType == 'eventRemoved') {
      for (let deleted of args.deletedRecords){
        this.id = deleted["Id"]
        this.service.deleteAppointment(this.id)
                    .subscribe(checker => console.log(checker));
      } 
    } else if (args.requestType == 'eventChanged') {
      for (let changed of args.changedRecords){
        this.obj = {};
        this.obj.appointmentId = changed["Id"]
        this.obj.subject = changed["Subject"]
        this.obj.description = changed["Description"]
        this.obj.statusId = changed["StatusId"]
          this.obj.patientId = changed["patientId"]
        this.obj.startTime = this.convertDateFormat(changed["StartTime"])
        this.obj.endTime = this.convertDateFormat(changed["EndTime"])
        this.service.updateAppointment(JSON.stringify(this.obj))
                    .subscribe(checker => console.log(checker));
      }
    } 
  }

  ngOnInit(): void {
    this.patientCollections = []
    this.appointments = []
    this.eventSettings = {}

    this.service.getAllAppointment()
        .subscribe(data => {
          for (let dat of data){
              this.obj = {};
              this.obj.Id = dat["appointmentId"]
              this.obj.Subject = dat["subject"]
              this.obj.Description = dat["description"]
              this.obj.StartTime = new Date(dat["startTime"])
              this.obj.EndTime = new Date(dat["endTime"])
              this.obj.StatusId = Number(dat["statusId"])
              this.obj.patientId = dat["patientId"]
              this.pushObject(this.obj)
          }
          this.eventSettings = {
            dataSource: this.appointments,
            fields: {
              id: 'Id',
              subject: { name: 'Subject', title: 'Appointment Title' },
              location: { name: 'Location', title: 'Appointment Location'},
              description: { name: 'Description', title: 'Appointment Description' },
              startTime: { name: 'StartTime', title: 'Start' },
              endTime: { name: 'EndTime', title: 'End'  }
            }
          };
  
        })

        this.service.getAllPatients()
                    .subscribe(patients => {
                      for(let patient of patients) {
                        this.obj = {}
                        this.obj.patientId = patient["patientId"]
                        this.obj.patientName = patient["patientName"] + " - " +  "PAT0" + patient["patientId"] 
                        this.patientCollections.push(this.obj)
                      }
                      this.resourceDataSource = this.patientCollections
                    })
                    
  }

  public eventSettings: EventSettingsModel
  /*public eventSettings: EventSettingsModel = {
    dataSource: this.appointments,
    fields: {
      id: 'Id',
      subject: { name: 'Subject', title: 'Appointment Title' },
      location: { name: 'Location', title: 'Appointment Location'},
      description: { name: 'Description', title: 'Appointment Description' },
      startTime: { name: 'StartTime', title: 'Start' },
      endTime: { name: 'EndTime', title: 'End'  }
    }
  };*/

  public resourceDataSource: Object[];
  
  pushObject(objtest:Object):void {
    this.appointments.push(objtest)
  }

  convertDateFormat(date:Date):any {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
    date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" +
    date.getSeconds()
  }
}
 