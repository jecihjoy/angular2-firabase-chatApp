import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { Messages } from './messages';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class FirebaseService {

  items: FirebaseListObservable<Messages[]>; // used to fetch messages
  public messages: BehaviorSubject<any> = new BehaviorSubject([]);
  public name: any;
  user: Observable<firebase.User>;
  // for input binding and clears the chat field

 constructor( private afAuth: AngularFireAuth,
               private afDB: AngularFireDatabase,
                private _http: Http) {

  }

  getMessages() {
     this.afDB.list('/messages', {
       query: {
          limitToLast: 8
        }
     }).subscribe((res) => {
       this.messages.next(res);
     });
       return this.messages.asObservable();

  }

  // getMessages2() {
  //   console.log('here');
  //   return this._http.get('https://angular2-chat-app-b05c8.firebaseio.com/messages.json')
  //     .map((response: Response) => <Messages[]>response.json())
  //     .do(Messages => JSON.stringify(Messages));
  // }

  login() {
    console.log(this.user);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUsername() {
        this.afAuth.authState.subscribe((user) => {
         this.name = user.displayName;
  });
  }

}
