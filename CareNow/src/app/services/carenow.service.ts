import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Appointment } from '../models/appointment';
import { Employee } from '../models/Employee';
import { DS } from '../models/DS';
import { MP } from '../models/mp';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Router } from '@angular/router';
import { Memo } from '../models/memo';
import { tap } from 'rxjs/operators';
import { reorder } from '../models/reorder';
import { PR } from '../models/pr';
import { TD } from '../models/td';

@Injectable({
  providedIn: 'root'
})
export class CarenowService {
  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' +  btoa('carenow:password')
    })
  };

  //kaveen
  private getURL2 : string ="http://localhost:8080/api/";

  getDS(): Observable<DS[]>{
    return this.http.get<DS[]>(this.getURL2 + "all-DS", this.httpOptions);
  }

  //

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  getPres(): Observable<MP[]>{
    return this.http.get<MP[]>(this.getURL2 + "all-Pres", this.httpOptions).pipe(
      map(response => response)
    )
  }

  savePres(MP_: MP):Observable<MP>{
    return this.http.post<MP>(this.getURL2 + "add-Pres" ,MP_ , this.httpOptions)
    .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
    );
  }

  deletethis(presid: number): Observable<any> {
    return this.http.delete(this.getURL2 + "delete_Pres/" + presid, this.httpOptions);
  }

  addreorder(reorder_ : reorder):Observable<reorder>{
    return this.http.post<reorder>(this.getURL2 + "addReorder",reorder_ , this.httpOptions)
    .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
    );
  }

  //

  getPR(): Observable<PR[]>{
    return this.http.get<PR[]>(this.getURL2 + "all-PR", this.httpOptions).pipe(
      map(response => response)
    )
  }
  
  
  savepr(PR_: PR):Observable<PR>{
    return this.http.post<PR>(this.getURL2 + "add-PR" ,PR_ , this.httpOptions);
  }
  
  
  getPRbyid(patientRecordID: number): Observable<PR> {
    return this.http.get<PR>(`${this.getURL2}`+'find_PR/'+`${patientRecordID}`, this.httpOptions).pipe(
      map(response => response)
    )
  }
  
  deletePR(patientRecordID: number): Observable<any> {
    return this.http.delete(this.getURL2 + "delete_PR/" + patientRecordID, this.httpOptions);
  }

  //

  getTD(): Observable<TD[]>{
    return this.http.get<TD[]>(this.getURL2 + "all-TD",this.httpOptions).pipe(
      map(response => response)
    )
  }

  saveTD(TD_: TD):Observable<TD>{
    return this.http.post<TD>(`${this.getURL2}`+'add-TD',TD_ ,this.httpOptions)
    .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
    );
  }

  getTDbyid(tpid: number): Observable<TD> {
    return this.http.get<TD>(`${this.getURL2}`+'find_TD/'+`${tpid}`, this.httpOptions).pipe(
      map(response => response)
    )
  }

  deleteTD(tpid: number): Observable<any> {
    return this.http.delete(this.getURL2 + "delete_TD/" + tpid, this.httpOptions);
  }

  clearTD(): Observable<any> {
    return this.http.delete(this.getURL2  + "clear_TD", this.httpOptions);
  }

  //OPNY

  sharedData:number;
  private getUrl: string = "http://localhost:8080/";

  setData(data:number) : void{
    this.sharedData = data;;
  }

  getData(): number{
    return this.sharedData;
  }

  getAllPrescriptions(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getPrescriptions", this.httpOptions);
  }

  getPrescription(id): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getPrescription/" + id, this.httpOptions);
  }

  updatePrescription(pres): Observable<any> {
    return this.http.put<any>("http://localhost:8080/updatePrescriptions", pres, this.httpOptions);
  }

  getDrug(name): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getDrug/" + name, this.httpOptions);
  }

  getAllOrder(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getOrders", this.httpOptions);
  }

  rejectOrderStatus(data): Observable<any> {
    return this.http.put("http://localhost:8080/rejectOrderStatus", data, this.httpOptions);
  }

  acceptOrderStatus(data): Observable<any> {
    return this.http.put("http://localhost:8080/acceptOrderStatus", data, this.httpOptions);
  }

  getAllDeliverers(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getDeliverers", this.httpOptions);
  }

  getAllDrugs(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/drugs", this.httpOptions);
  }

  deleteDeliverer(id): Observable<any> {
    return this.http.delete("http://localhost:8080/deleteDeliverer/" + id, this.httpOptions);
  }

  updateDeliverer(data): Observable<any> {
    return this.http.put("http://localhost:8080/updateDeliverer",data, this.httpOptions);
  }

  saveDeliverer(deliverer): Observable<any> {
    return this.http.post<any>("http://localhost:8080/saveDeliverer", deliverer, this.httpOptions);
  }



  //ASHVINN

  credAuthenticate(data): Observable<any> {
    return this.http.post<boolean>("http://localhost:8080/Authenticate", data, this.httpOptions);
  }

  getPatAppo(id): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getPatAppo/" + id, this.httpOptions);
  }

  getAllAppointment(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>("http://localhost:8080/getAppointments", this.httpOptions);
  }

  getAppointmentAttendance(start, end): Observable<Appointment[]> {
    return this.http.get<Appointment[]>("http://localhost:8080/getAppointmentAttendance/" + start + "/" + end, this.httpOptions);
  }

  getDocDiagnose(start, end): Observable<any> {
    return this.http.get<any>("http://localhost:8080/DocDiagnose/" + start + "/" + end, this.httpOptions);
  }

  getDocsAppointments(id): Observable<Appointment[]> {
    return this.http.get<Appointment[]>("http://localhost:8080/getDocsAppointments/" + id, this.httpOptions);
  }

  getAllPatients(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getPatients", this.httpOptions);
  }

  getDocsPatient(doc): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getPatientDoc/" + doc, this.httpOptions);
  }

  getDocsShift(doc): Observable<any> {
    return this.http.get<any>("http://localhost:8080/getShiftDoc/" + doc, this.httpOptions);
  }

  getDoctor(id): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/getDoctor/" + id, this.httpOptions);
  }

  getShift(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/getShift", this.httpOptions);
  }

  getShiftToday(day): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/getShiftTodaySolution/" + day, this.httpOptions);
  }

  getAppointmentToday(start): Observable<Appointment[]> {
    return this.http.get<Appointment[]>("http://localhost:8080/getAppointmentsToday/" + start, this.httpOptions);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>("http://localhost:8080/getEmployees", this.httpOptions);
  }

  getAllMemos(): Observable<Memo[]> {
    return this.http.get<Memo[]>("http://localhost:8080/getMemos", this.httpOptions);
  }
/*
  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }*/

  createAppointment(data): Observable<any> {
    return this.http.post("http://localhost:8080/addAppointment", data, this.httpOptions);
  }

  updateShift(data): Observable<any> {
    return this.http.put("http://localhost:8080/updateShift", data, this.httpOptions);
  }

  createMemo(memo): Observable<any> {
    return this.http.post("http://localhost:8080/createMemo", memo, this.httpOptions);
  }

  createPatient(pat, psw): Observable<any> {
    return this.http.post("http://localhost:8080/addPatient/" + psw, pat, this.httpOptions);
  }

  updateAppointment(data): Observable<any> {
    return this.http.put("http://localhost:8080/updateAppointment", data, this.httpOptions);
  }

  updatePatient(data): Observable<any> {
    return this.http.put("http://localhost:8080/updateFamDoc", data, this.httpOptions);
  }

  updateLogin(data): Observable<any> {
    return this.http.put("http://localhost:8080/updateLogin", data, this.httpOptions);
  }

  deleteAppointment(id): Observable<any> {
    return this.http.delete("http://localhost:8080/deleteAppointment/" + id, this.httpOptions);
  }

  deletePatient(id): Observable<any> {
    console.log(id)
    return this.http.delete("http://localhost:8080/deletePatient/" + id, this.httpOptions);
  }

 /* deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }*/

  //private readonly mockUser = new Credential("ashvinnkana@gmail.com", "1234");
  isAuthenticated = false;
  isReceptionist = false;
  isPharmacist = false;
  isDoctor = false;
  isPatient = false;
  sessionUser_EMAIL = "";
  sessionUser_NAME = "";
  sessionUser_TYPE = "";
  sessionUser_ID = "";
  sessionUser_IDFormat = "";

  authenticateLogin(credentials: Credential): any {
    
    this.credAuthenticate(JSON.stringify(credentials)).subscribe(data => {
      if (data == true) {
        this.getAllEmployees().subscribe(employee => {
          for (let emp of employee){
            if (emp["email"] == credentials.getEmail()) {
              this.sessionUser_EMAIL += emp["email"];
              this.sessionUser_ID += emp["employeeId"]
              if (emp["gender"] == "Male")
                this.sessionUser_NAME = "Mr. ";
              else if (emp["gender"] == "Female")
                this.sessionUser_NAME = "Mrs./ Ms. ";
              this.sessionUser_NAME = this.sessionUser_NAME + emp["firstName"] + " " + emp["lastName"];

              if (emp["type"] == "RECEPTIONIST") {
                this.sessionUser_TYPE = "RECEPTIONIST";
                this.sessionUser_IDFormat = this.sessionUser_TYPE.substring(0,3) + "0" +this.sessionUser_ID;
                this.isAuthenticated = true;
                this.router.navigate(['calendars']);
                this.isReceptionist = true;
                
                
              } else if (emp["type"] == "PHARMACIST") {
                this.sessionUser_TYPE = "PHARMACIST";
                this.sessionUser_IDFormat = this.sessionUser_TYPE.substring(0,3) + "0" +this.sessionUser_ID;
                this.isAuthenticated = true;
                this.router.navigate(['drugs']);
                this.isPharmacist = true;

              } else if (emp["type"] == "DOCTOR") {
                this.sessionUser_TYPE = "DOCTOR";
                this.sessionUser_IDFormat = this.sessionUser_TYPE.substring(0,3) + "0" +this.sessionUser_ID;
                this.isAuthenticated = true;
                this.router.navigate(['/docHome']);
                this.isDoctor = true;
              } 
            }
          }
         
        });
      } else {
        alert("ERROR :: INVALID USERNAME OR PASSWORD!");
      }
     
    });
    
  }


  logout() {
    this.isAuthenticated = false;
    this.isReceptionist = false;
    this.isPharmacist = false;
    this.isDoctor = false;
    this.isPatient = false;
    this.sessionUser_EMAIL = "";
    this.sessionUser_NAME = "";
    this.sessionUser_TYPE = "";
    this.sessionUser_ID = "";
    this.sessionUser_IDFormat = "";
    this.router.navigate([''])
  }
}
