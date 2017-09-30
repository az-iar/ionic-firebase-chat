import { Component } from "@angular/core";
import { NavController, LoadingController, Loading } from "ionic-angular";
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCvzxA1x_ov-4qpU913FP_a_WanC5Fmwvg",
  authDomain: "ionic-training-c1603.firebaseapp.com",
  databaseURL: "https://ionic-training-c1603.firebaseio.com",
  projectId: "ionic-training-c1603",
  storageBucket: "ionic-training-c1603.appspot.com",
  messagingSenderId: "951903650715"
};

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  name = "";
  message = "";

  messages = [];

  loader: Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
    // initialize firebase
    firebase.initializeApp(config);
    // initialize loader
    this.loader = this.loadingCtrl.create({
      content: "Processing.."
    });

    this.loadMessages();
  }

  loadMessages() {
    firebase
      .database()
      .ref("chats")
      .on("value", snapshot => {
        let data = snapshot.val();
        let messages = [];

        for (let id in data) {
          messages.push(data[id]);
        }

        this.messages = messages;
      });
  }

  setName(name) {
    this.name = name;
  }

  sendMessage() {
    this.loader.present();

    firebase
      .database()
      .ref("chats")
      .push({
        name: this.name,
        message: this.message
      })
      .then(() => {
        // clear message when success
        this.message = "";

        this.loader.dismiss();
      });
  }
}
