import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarenowService } from 'src/app/services/carenow.service';
import { Credential } from '../../models/credential'

@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.css']
})
export class LoginUiComponent implements OnInit {

  constructor(private service:CarenowService) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    const credentials = new Credential(signInForm.value.email,signInForm.value.password);
    this.service.authenticateLogin(credentials);

  } 
}
