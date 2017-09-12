import { Messages } from './messages';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: FirebaseListObservable<Messages[]>;
  user: Observable<firebase.User>;
  myval = '';
  name: any;
  messages: Messages[];
  placeholder='Chat here.....';
  constructor(private afAuth: AngularFireAuth,
             private afDb: AngularFireDatabase) {

      this.items = this.afDb.list('/messages', {
        query: {
          limitToLast: 5
        }
      });

      // this.afAuth.authState.subscribe((auth) => {
      //     if (auth) {
      //         this.name = auth;
      //     }
      // });
        this.user = this.afAuth.authState;
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  getMessages() {
    this.afDb.list('/messages', {
        query: {
          limitToLast: 5
        }
    }).subscribe((msg) => {
      this.messages = msg;
    });
  }

  getUsername() {
   return this.afAuth.authState;
  }

  sendMessages(ourmessages: string) {
    let accname = '';
    this.getUsername().subscribe((user) => {
      accname = user.displayName;
      this.items.push({message: ourmessages, name: accname});
      this.myval = '';
    });
  }

  ngOnInit() {
    this.getMessages();
    this.getUsername();
  }
}
