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
    console.log("hi")
    this.PR_DEMO.patientID = Number('2');
    var date = '2020-11-16';
    this.PR_DEMO.patientrecorddate = new Date(date);
    this.PR_DEMO.patientrecordsubjective = String("Fever - 3days. Rash - 1day. Varicella contact h/o 2wk back - Demo");
    this.PR_DEMO.patientrecordobjective = String("Fever - 101f. Vesicopapular Rash. Multistage lesions,raindrops with erythematous base. Crusted top. - Demo");
    this.PR_DEMO.patientrecordassessment = String("Varicella infection  - Demo");
    this.PR_DEMO.patientrecordplan = String("Isolation , Notification,Bed rest, plenty of fluids. Paracetamol. 1gr. 6hly. 5days | Acyclovir. 800mg 5hly. 7days | Pirtion 4mg BD. 5days  - Demo");
    this.PR_DEMO.patientrecordessential = String("RV in 2wks for MC  - Demo");
    this.PR_DEMO.patientrecordextra = String("Provided instructions for Isolation  - Demo");

    this.PR_service.savepr(this.PR_DEMO).subscribe(
      data =>{
        this.PR_router.navigate(['docHome']);
      }
    )
  }



}
  
