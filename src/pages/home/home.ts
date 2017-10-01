import { Component } from "@angular/core";
import { NavController, LoadingController, Loading } from "ionic-angular";
import { FirebaseDatabaseProvider } from "../../providers/firebase-database/firebase-database";
import { FirebaseAuthProvider } from "../../providers/firebase-auth/firebase-auth";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  name = "";
  message = "";

  messages = [];

  loader: Loading;

  constructor (
    public navCtrl: NavController,
    public firebaseDatabase: FirebaseDatabaseProvider,
    public firebaseAuth: FirebaseAuthProvider
  ) {
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.name = this.firebaseAuth.user().displayName;
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });

    this.loadMessages();
  }

  loadMessages () {
    this.firebaseDatabase
      .getChats()
      .limitToLast(15)
      .on("value", snapshot => {
        let data = snapshot.val();
        let chats = [];

        for (let id in data) {
          chats.push(data[id]);
        }

        this.messages = chats;
      });
  }

  setName (name) {
    this.name = name;
  }

  sendMessage () {
    let user = this.firebaseAuth.user();

    this.firebaseDatabase
      .getChats()
      .push({
        user: {
          name: user.displayName
        },
        message: this.message
      })
      .then(() => {
        // clear message when success
        this.message = "";
      });
  }

  logout () {
    this.firebaseAuth.logout();
  }
}
