import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {FirebaseService} from './firebase.service';
import { Messages } from './messages';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 msgVal  = '';
 items: FirebaseListObservable<Messages[]>; // used to fetch messages
 messages: Messages[] ;
 user: Observable<firebase.User>;
 public name: string;

  constructor(private fservice: FirebaseService, private afAuth: AngularFireAuth) {
      this.user = this.afAuth.authState;

       this.afAuth.authState.subscribe((user) => {
        console.log('cccccc', user);
         this.name = user.displayName;
         console.log('hhhhname', this.name);
       });
       console.log('namessss', this.name);
       console.log('angular');
  }
  login() {
    this.fservice.login();
  }

  logout() {
    this.fservice.logout();
  }
    sendMessage(myMessage: string) {
    this.items.push({message: myMessage, name: this.name}); // this.user.displayName, this.user.facebook.photoUrl
    console.log('ggggname', this.name);
    console.log('message send');
  }

  ngOnInit(): void {
    console.log('angular');
    this.fservice.getMessages().subscribe((da) => {
      this.messages = da;
      console.log(this.messages);
    });
    this.sendMessage('message');

    console.log('namessss', this.name);
  }
}
