import { Injectable } from '@angular/core';

import { of as observableOf, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase';

import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState) return null
      else return authState.uid;
    })
  );
  isAdmin: Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if(!uid) return observableOf(false)
      else return this.db.object<boolean>('admin/' + uid).valueChanges();
    })
  );

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
