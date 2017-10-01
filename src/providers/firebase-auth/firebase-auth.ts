import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { FirebaseProvider } from "../firebase/firebase";

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {
  currentUser: any;

  constructor (public firebase: FirebaseProvider) {
    firebase.auth().onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  user () {
    return this.currentUser;
  }

  onAuthStateChanged (observer) {
    return this.firebase.auth().onAuthStateChanged(observer);
  }

  login (email, password) {
    return this.firebase.auth().signInWithEmailAndPassword(email, password);
  }

  register (name, email, password) {
    return this.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        this.firebase.auth().currentUser.updateProfile({
          displayName: name,
          photoURL: ""
        })
      );
  }

  logout () {
    return this.firebase.auth().signOut();
  }
}
