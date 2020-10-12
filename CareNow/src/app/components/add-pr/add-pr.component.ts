import { CarenowService } from 'src/app/services/carenow.service';
import { PR } from './../../models/pr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-pr',
  templateUrl: './add-pr.component.html',
  styleUrls: ['./add-pr.component.css']
})
export class AddPRComponent implements OnInit {


  PR_: PR = new PR();
  PR_DEMO: PR = new PR();


  constructor(private PR_service: CarenowService,
              private PR_router: Router,
              private PR_activated_Route: ActivatedRoute) { }

  ngOnInit(): void {
  const isPRIDPresent = this.PR_activated_Route.snapshot.paramMap.has('id');
      if(isPRIDPresent){
        const _id_ = +this.PR_activated_Route.snapshot.paramMap.get('id');
        this.PR_service.getPRbyid(_id_).subscribe(
          data => this.PR_ = data
        )
      }

  }

  savePR(){
    this.PR_service.savepr(this.PR_).subscribe(
      data =>{
        console.log('response',data);
        this.PR_router.navigate(['docHome']);
      }
    )
  }


  addprdemo(){
    this.PR_DEMO.patientID = Number('2');
    var date = '2020-11-16';
    this.PR_DEMO.patientrecorddate = new Date(date);
    this.PR_DEMO.patientrecordsubjective = String("No further Chest Pain or Shortness of Breath. 'Feeling better today.' Patient reports headache. - Demo");
    this.PR_DEMO.patientrecordobjective = String("");
    this.PR_DEMO.patientrecordassessment = String("Demo");
    this.PR_DEMO.patientrecordplan = String("Demo");
    this.PR_DEMO.patientrecordessential = String("Demo");
    this.PR_DEMO.patientrecordextra = String("Demo");

    this.PR_service.savepr(this.PR_DEMO).subscribe(
      data =>{
        this.PR_router.navigate(['docHome']);
      }
    )
  }



}
  
