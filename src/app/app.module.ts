import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MailbodyComponent } from './components/mailbody/mailbody.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { ApiService } from './api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    MailbodyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    
    NoopAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
