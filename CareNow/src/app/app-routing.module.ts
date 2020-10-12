import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentTodayComponent } from './components/appointment-today/appointment-today.component';
import { PatientRecordsComponent } from './components/patient-records/patient-records.component';
import { DoctorRecordsComponent } from './components/doctor-records/doctor-records.component';
import { GenerateReportsComponent } from './components/generate-reports/generate-reports.component';
import { CarenowMemoComponent } from './components/carenow-memo/carenow-memo.component';
import { LoginUiComponent } from './components/login-ui/login-ui.component';
import { TestComponent } from './components/test/test.component';
import { AuthGuard } from './guards/auth.guard'

import { DrugComponent } from './components/drug/drug.component'
import { DeliveryComponent } from './components/delivery/delivery.component'
import { DelivererComponent } from './components/deliverer/deliverer.component'
import { ReportComponent } from './components/report/report.component'

import { ListPRComponent } from './components/list-pr/list-pr.component';
import { AddPRComponent } from './components/add-pr/add-pr.component';
import { ListDsComponent } from './components/list-ds/list-ds.component';
import { ListTDComponent } from './components/list-td/list-td.component';
import { PrintViewPrescriptionComponent} from './components/print-view-prescription/print-view-prescription.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';

import { ListsupplierComponent } from './listsupplier/listsupplier.component';
import { AddsupplierComponent } from './addsupplier/addsupplier.component';
import { AddorderComponent } from './addorder/addorder.component';
import { ListorderComponent } from './listorder/listorder.component';

import { DelivererNComponent } from './components/deliverer-n/deliverer.component';
import { ListBillComponent } from './components/list-bill/list-bill.component';


const routes: Routes = [
  { path:'',redirectTo: 'login', pathMatch: 'prefix'},

  //ashvinn
   { path:'login', component: LoginUiComponent},
  { path: 'calendars', component: CalendarComponent, canActivate: [AuthGuard]},
  { path: 'appointments', component: AppointmentTodayComponent, canActivate: [AuthGuard]},  
  { path: 'patients', component: PatientRecordsComponent, canActivate: [AuthGuard]},
  { path: 'doctors', component: DoctorRecordsComponent , canActivate: [AuthGuard]},
  { path: 'reports', component: GenerateReportsComponent, canActivate: [AuthGuard]  },
  { path: 'create_memo', component: CarenowMemoComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },

  //opny
  { path:'drugs', component: DrugComponent, canActivate: [AuthGuard]},
  { path:'deliveries', component: DeliveryComponent, canActivate: [AuthGuard]},
  { path:'deliverers', component: DelivererComponent, canActivate: [AuthGuard]},
  { path:'phareports', component: ReportComponent, canActivate: [AuthGuard]},

  //kaveen
  {path: 'viewPRs', component: ListPRComponent, canActivate: [AuthGuard]},
  {path: 'addPR', component: AddPRComponent, canActivate: [AuthGuard]},
  {path: 'editPR/:id', component: AddPRComponent, canActivate: [AuthGuard]},
  {path: 'viewDS', component: ListDsComponent, canActivate: [AuthGuard]},
  {path: 'viewTD', component: ListTDComponent, canActivate: [AuthGuard]},
  {path: 'docHome', component: DoctorHomeComponent, canActivate: [AuthGuard]},
  {path: 'patientHome', component: PatientHomeComponent, canActivate: [AuthGuard]},
  {path: 'ADDpres', component: ListDsComponent, canActivate: [AuthGuard]},
  {path: 'PrintPres/:name/:age/:date', component: PrintViewPrescriptionComponent},

  //Dinodi

  {path: 'suppliers', component: ListsupplierComponent, canActivate: [AuthGuard]},
  {path: 'addsupplier', component: AddsupplierComponent, canActivate: [AuthGuard]},
  {path: 'editsupplier/:id', component: AddsupplierComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: ListorderComponent, canActivate: [AuthGuard]},
  {path: 'addorder', component: AddorderComponent, canActivate: [AuthGuard]},
  {path: 'editorder/:id', component: AddorderComponent, canActivate: [AuthGuard]},
  

  //NAnduni
  { path: 'viewbill', component:ListBillComponent, canActivate: [AuthGuard] },  
  { path: 'deliver', component: DelivererNComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
