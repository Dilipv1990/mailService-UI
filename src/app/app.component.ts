import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CustomErrorStateMatcher } from './error-state-matcher'
import { ApiService } from './api/api.service'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mailForm: FormGroup
  title = 'app'
  public matcher = new CustomErrorStateMatcher()
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mailForm = this.formBuilder.group({
      from: ['', Validators.compose([Validators.required, Validators.email])],
      to: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/)])],
      cc: ['', Validators.compose([Validators.pattern(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/)])],
      bcc: ['', Validators.compose([Validators.pattern(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/)])],
      subject: [''],
      body: [''],
    })
  }

  submit() {
    if (this.mailForm.valid) {
      console.log("hurray!!!!")
      let mailMap = (mailstring: string) => mailstring ? mailstring.split(",").map((x) => { return { 'email': x } }) : []
      this.apiService.sendEmail({ "from": { email: this.mailForm.controls.from.value }, to: mailMap(this.mailForm.controls.to.value), cc: mailMap(this.mailForm.controls.cc.value), bcc: mailMap(this.mailForm.controls.bcc.value), subject: this.mailForm.controls.subject.value, content: this.mailForm.controls.body.value }).subscribe((res) => {
        if (res === "error") {
          let snackBarRef = this.snackBar.open('Mail sending failed!', null, { duration: 1500 });
        } else {
          let snackBarRef = this.snackBar.open('Mail sent!', null, { duration: 1500 });
        }
      })
    }
  }
}