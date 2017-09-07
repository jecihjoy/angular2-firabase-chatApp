import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {MdCardModule} from '@angular/material';
import {FirebaseService} from './firebase.service';

import { AppComponent } from './app.component';

export const firebaseConfig = {

  apiKey: 'AIzaSyAerwICEUpUyd0nMMUEDNqJ0b1E87uC_aY',
    authDomain: 'angular2-chat-app-b05c8.firebaseapp.com',
    databaseURL: 'https://angular2-chat-app-b05c8.firebaseio.com',
    projectId: 'angular2-chat-app-b05c8',
    storageBucket: 'angular2-chat-app-b05c8.appspot.com',
    messagingSenderId: '883343715496'

};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MdCardModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
