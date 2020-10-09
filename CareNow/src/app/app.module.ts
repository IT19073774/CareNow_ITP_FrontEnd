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

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AppointmentTodayComponent,
    PatientRecordsComponent,
    DoctorRecordsComponent,
    GenerateReportsComponent,
    CarenowMemoComponent,
    LoginUiComponent,
    TestComponent,
    DrugComponent,
    DeliveryComponent,
    DelivererComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ScheduleModule, RecurrenceEditorModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [DayService, WeekService, MonthService, CarenowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
