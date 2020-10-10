import { Component, OnInit } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  constructor(public service:CarenowService) { }

  ngOnInit(): void {
  }

}
