import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Ashvinn
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentTodayComponent } from './components/appointment-today/appointment-today.component';
import { PatientRecordsComponent } from './components/patient-records/patient-records.component';
import { DoctorRecordsComponent } from './components/doctor-records/doctor-records.component';
import { GenerateReportsComponent } from './components/generate-reports/generate-reports.component';
import { CarenowMemoComponent } from './components/carenow-memo/carenow-memo.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { CarenowService } from './services/carenow.service';
import { LoginUiComponent } from './components/login-ui/login-ui.component';
import { TestComponent } from './components/test/test.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//opny
import { DrugComponent } from './components/drug/drug.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { DelivererComponent } from './components/deliverer/deliverer.component';
import { ReportComponent } from './components/report/report.component';

//kaveen
import { DataTablesModule } from 'angular-datatables';
import { ListPRComponent } from './components/list-pr/list-pr.component';
import { AddPRComponent } from './components/add-pr/add-pr.component';
import { ListDsComponent } from './components/list-ds/list-ds.component';
import { ListTDComponent } from './components/list-td/list-td.component';
import { MPComponent } from './components/mp/mp.component';
import { PrintViewPrescriptionComponent} from './components/print-view-prescription/print-view-prescription.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';



//Dinodi
import { ListsupplierComponent } from './listsupplier/listsupplier.component';
import { AddsupplierComponent } from './addsupplier/addsupplier.component';
import { AddorderComponent } from './addorder/addorder.component';
import { ListorderComponent } from './listorder/listorder.component';

//Nanduni
import { DelivererNComponent } from './components/deliverer-n/deliverer.component';
import { ListBillComponent } from './components/list-bill/list-bill.component';

//Naveen
import { ListPharmacistComponent } from './component/listpharmacist/listpharmacist.component';
import { ListStockmanagerComponent } from './component/list-stockmanager/list-stockmanager.component';
import { AddPharmacistComponent } from './component/add-pharmacist/add-pharmacist.component';

//Osura
import { RegisComponent } from './component/add-reception/regis.component';
import { ListReceptionComponent } from './component/list-reception/list-reception.component'
import { ListCashierComponent } from './component/list-cashier/list-cashier.component';
import { AddCashierComponent } from './component/add-cashier/add-cashier.component';
import {AddDoctorComponent} from './component/add-doctor/add-doctor.component';
import {ListDoctorComponent} from './component/list-doctor/list-doctor.component';


@NgModule({
  declarations: [
    //ashvinn
    AppComponent,
    CalendarComponent,
    AppointmentTodayComponent,
    PatientRecordsComponent,
    DoctorRecordsComponent,
    GenerateReportsComponent,
    CarenowMemoComponent,
    LoginUiComponent,
    TestComponent,
    //opny
    DrugComponent,
    DeliveryComponent,
    DelivererComponent,
    ReportComponent,
    //kaveen
    ListPRComponent,
    AddPRComponent,
    ListDsComponent,
    PrescriptionComponent,
    ListTDComponent,
    MPComponent,
    PrintViewPrescriptionComponent,
    DoctorHomeComponent,
    PatientHomeComponent,
    //Dinodi
    ListsupplierComponent,
    AddsupplierComponent,
    AddorderComponent,
    ListorderComponent,
    //Nanduni
    ListBillComponent,
    DelivererNComponent,
    //Naveen
    ListPharmacistComponent,
    ListStockmanagerComponent,
    AddPharmacistComponent,
    //Osura
    RegisComponent,
    ListReceptionComponent,
    ListCashierComponent,
    AddCashierComponent,
    AddDoctorComponent,
    ListDoctorComponent
  ],
  imports: [
    //ashvinn
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ScheduleModule, RecurrenceEditorModule,
    ReactiveFormsModule,
    AppRoutingModule,
    //kaveen
    DataTablesModule
  ],
  providers: [DayService, WeekService, MonthService, CarenowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
