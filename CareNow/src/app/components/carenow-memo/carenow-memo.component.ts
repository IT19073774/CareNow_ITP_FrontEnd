import { Component, OnInit } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { NgForm } from '@angular/forms';
import { Memo } from '../../models/memo'

@Component({
  selector: 'app-carenow-memo',
  templateUrl: './carenow-memo.component.html',
  styleUrls: ['./carenow-memo.component.css']
})
export class CarenowMemoComponent implements OnInit {

  memoColor = "";

  constructor(private service:CarenowService) { }

  ngOnInit(): void {
  }

  onSubmit(memoForm: NgForm) {

    switch (this.service.sessionUser_TYPE) {
      case "PHARMACIST" :
        this.memoColor = "#4B0082";
    }

    const memo = new Memo(memoForm.value.recepientType, this.service.sessionUser_TYPE, memoForm.value.content,
      this.service.sessionUser_NAME + " [" + this.service.sessionUser_TYPE.substring(0,3) + "0" +this.service.sessionUser_ID+"]",
      memoForm.value.recepientId, this.convertDateFormat(new Date()));

      //console.log(JSON.stringify(memo))
      this.service.createMemo(JSON.stringify(memo))
          .subscribe(checker => console.log(checker));

          memoForm.reset();
    
  }


  convertDateFormat(date:Date):any {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
    date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" +
    date.getSeconds()
  }
}
