import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChildActivationStart, Router } from '@angular/router';
import { CarenowService } from '../../services/carenow.service' 
import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas'

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.css']
})
export class PatientRecordsComponent implements OnInit {

  public isDetVisible: boolean = false;
  public isaddVisible: boolean = false;
  public isStepTab: boolean[] = [false, false, false, false];
  public currentTab = 0;
  obj: LooseObject = {};
  public tester = [];
  currentPat: LooseObject = {};
  public patients = []
  public familyDoctor=""
  public doctors = []
  public isVisible3 = false;
  public isVisible4 = false;
  public giveAway: LooseObject = {};
  public currentPatAppo = []
  public allergies = []
  public surgeries = []
  public password;
  public dateHolder;
  public ans;
  public problems = []
  public history = []
  public searchTerm;
  public searchTermappo;
  constructor(public service: CarenowService, public router: Router) { }

  ngOnInit(): void {
    this.patients = []
    this.doctors = []
    this.service.getAllPatients() 
        .subscribe(patients => {
         
          this.patients = patients
        })

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

  }

  public closeDetail() {
    this.isDetVisible = false;
  }
  public closeAdd(addPatForm: NgForm) {
    this.isaddVisible = false;
    addPatForm.reset();
  }

  public close3(docForm: NgForm) {
    this.isVisible3 = false;
    this.familyDoctor = ""
    docForm.reset();
  }

  public close4(passForm: NgForm) {
    this.isVisible4 = false;
    passForm.reset();
  }

  public open3() {
    this.familyDoctor = ""
    this.isVisible3 = true
  }

  public open4() {
    this.password = ""
    this.isVisible4 = true
  }

  public openDetail(val:any) {
    this.isDetVisible = true;
    this.currentPatAppo = []
    for (let pat of this.patients) {
      if (pat["patientId"] == val){
        this.currentPat = pat
        console.log(pat)
        break;
      }
    }
    this.allergies = this.currentPat.patient_H_Allergies.split(",", 3)
    this.problems = this.currentPat.patient_H_Illness.split(",", 3)
    this.history = this.currentPat.patient_H_FamilyHistory.split(",", 3)
    this.surgeries = this.currentPat.patient_H_PastSurgery.split(",", 3)

    this.service.getPatAppo(val)
    .subscribe(data => {
 
      for (let dat of data) {
        this.obj = {}
        this.obj.appointmentId = dat["appointmentId"]
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
        this.currentPatAppo.push(this.obj)
        
      }
  
    })
  }

  pushObject(objtest:LooseObject):void {
    this.service.getDoctor(objtest.employeeId)
              .subscribe(doc => {
                  objtest.doctorId = "DOC0" + doc["doctorId"]
                  objtest.education = doc["education"]
                  objtest.color = doc["color"]
              })
    this.doctors.push(objtest)
    console.log(this.doctors)
  }

  public openAdd() {
    this.isaddVisible = true;
    var x = document.getElementsByClassName("tabAddPat");
    for(let i = 0; i < x.length; i++){
      this.isStepTab[i] = false;
    }
    this.currentTab = 0;
    this.showTab(this.currentTab);
    
  }

  public DeletePatient(val){
    if(confirm("Do you Confirm to delete this Patient Record With Doctors Permission ?")) {
      this.service.deletePatient(val).subscribe(data => {
        console.log(data)
        this.ngOnInit()
      })
      
    }
  }

  public openTab(evt, tabName) {
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

  onSubmit4(passForm:NgForm) {
    this.isVisible4 = false;
    this.obj = {}
    this.obj.email = this.currentPat.patientEmail
    this.obj.password = this.password
    passForm.reset()
    console.log(JSON.stringify(this.obj))
    this.service.updateLogin(JSON.stringify(this.obj)).subscribe(checker => console.log(checker))
  }

  onSubmit3(docForm:NgForm) {
    this.isVisible3 = false;
    
    this.currentPat.familyDoctorId = docForm.value.doctor
    docForm.reset();
    this.service.updatePatient(JSON.stringify(this.currentPat)).subscribe(checker => console.log(checker))
    this.openDetail(this.currentPat.patientId);

  }
  onSubmit(addPatForm: NgForm) {
    console.log(addPatForm.status)
      if (addPatForm.status == "VALID") {
              this.isaddVisible = false;
              this.obj = {}
              this.obj.patientName = addPatForm.value.fname + " " + addPatForm.value.lname
              this.obj.patientOccupation = addPatForm.value.occupation
              this.obj.patientDOB = addPatForm.value.dob
              this.obj.patientGender = addPatForm.value.gender
              this.obj.familyDoctorId = addPatForm.value.doctor
              this.obj.patientEmail = addPatForm.value.email
              this.obj.patientPhone1 = addPatForm.value.tel1
              this.obj.patientPhone2 = addPatForm.value.tel2
              this.obj.patientAddress = addPatForm.value.address

              this.tester = addPatForm.value.allergy.split("\n")
              this.obj.patient_H_Allergies = ""
              for (let test of this.tester) {
                this.obj.patient_H_Allergies += test + ","
              }

              this.tester = addPatForm.value.surgery.split("\n")
              this.obj.patient_H_PastSurgery = ""
              for (let test of this.tester) {
                this.obj.patient_H_PastSurgery += test + ","
              }

              this.tester = addPatForm.value.problem.split("\n")
              this.obj.patient_H_Illness = ""
              for (let test of this.tester) {
                this.obj.patient_H_Illness += test + ","
              }

              this.tester = addPatForm.value.history.split("\n")
              this.obj.patient_H_FamilyHistory = ""
              for (let test of this.tester) {
                this.obj.patient_H_FamilyHistory += test + ","
              }
              this.obj.patient_E_Name = addPatForm.value.eName
              this.obj.patient_E_Phone = addPatForm.value.eTel
              this.obj.patient_E_Relationship = addPatForm.value.eRel

              this.giveAway.name = this.obj.patientName
              this.giveAway.email = this.obj.patientEmail
              this.giveAway.password = this.password
              
              console.log(JSON.stringify(this.obj))
              this.service.createPatient(JSON.stringify(this.obj), this.password)
                .subscribe(checker => {
                  console.log(checker)
                  
                  this.ngOnInit();
                  this.downloadPassword(this.password);
                  addPatForm.reset();
                  
                })
      }
      else {
        alert("ERROR => All Details is Required to be filled!")
        this.currentTab = this.currentTab - 1;
        this.showTab(this.currentTab)
        
        
      }
  }

  demoSubmit() {
      this.isaddVisible = false;
      const demo = {
      familyDoctorId: "DOC05",
      patientAddress: "13 B Lenpool Flat, Block D, Asoka Gardens",  
      patientDOB: "2001-03-20",
      patientEmail: "kevin@gmail.com",
      patientGender: "Male",
      patientId: 960,
      patientName: "Kevin Fernando",
      patientOccupation: "Athelete",
      patientPhone1: "751234567",
      patientPhone2: "123456789",
      patient_E_Name: "Shamra Perera",
      patient_E_Phone: "761237894",
      patient_E_Relationship: "Sister",
      patient_H_Allergies: "Plaster,Peanuts,Cheese",
      patient_H_Extra: null,
      patient_H_FamilyHistory: "NONE",
      patient_H_Illness: "Cholestrol,Low Blood Pressure",
      patient_H_PastSurgery: "NONE"
    }
    this.giveAway.name = demo.patientName
    this.giveAway.email = demo.patientEmail
    this.giveAway.password = "DEMOPSW"
    console.log(demo)
    console.log(JSON.stringify(demo))
    this.service.createPatient(JSON.stringify(demo), "DEMOPSW")
                .subscribe(checker => {
                  console.log(checker)
                  
                  this.ngOnInit();
                  this.downloadPassword("DEMO_PATIENT");
                  
                })
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

  public generateRandomPassword() {
      var result  = ""
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      var charactersLength = characters.length;
      for ( var i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      console.log(result)
      let myContainer = document.getElementById('generatePassword') as HTMLInputElement;
      myContainer.value = result;
      this.password = result;
  }

  downloadPassword(fileName:String) {
    var element = document.getElementById("passwordGiveAway")
    html2canvas(element).then((canvas) => {
      console.log(canvas)

       let pagewidth = 100

      var imgData = canvas.toDataURL('image/png')
      var imgHeight = canvas.height * pagewidth / canvas.width
      var doc = new jspdf.jsPDF('p', 'mm', [pagewidth, imgHeight])
      doc.addImage(imgData, 0, 0, pagewidth, imgHeight)
      
      doc.save(fileName+".pdf")
    })
  }
}


