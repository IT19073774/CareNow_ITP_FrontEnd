import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CarenowService } from 'src/app/services/carenow.service';
import { Memo } from './models/memo'


interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ampm: String;
  hour: any;
  minute: String;
  second: String;
  public Memos = [];
  obj: LooseObject = {};
  public memoCount: Int16Array;
  public isNotify:boolean = false;


  notifyOpen() {

    var paras = document.getElementsByClassName('remover');

    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }​
    this.service.getAllMemos()
        .subscribe(AllMemos => {
          for (let memo of AllMemos) {
            this.obj = {};
            this.obj.recepientType = memo["recepientType"]
            this.obj.senderType = memo["senderType"]
            this.obj.content = memo["content"]
            this.obj.senderId = memo["senderId"]
            this.obj.recepientId = memo["recepientId"]
            this.getTime(new Date(memo["memoDate"]))
            this.obj.memoDate = new Date(memo["memoDate"]).toDateString() + " " + this.hour + ":" + this.minute + ":" + this.second + "|" + this.ampm
            this.Memos.push(this.obj)
          }
        });
        this.isNotify = true;
  }
 
  notifyClose() {
    this.isNotify = false;
    var paras = document.getElementsByClassName('remover');

    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }​
  }

  ngOnInit(): void {


  }
  constructor(public service:CarenowService) { }
  title = 'CareNow';

  logout() {
    this.service.logout();
  }

  private getTime(clock: Date) {
    
    const hours = clock.getHours();
    this.ampm = hours >= 12 ? "PM" : "AM";
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ?  '0' + this.hour : this.hour;

    const minutes = clock.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds = clock.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }

}
