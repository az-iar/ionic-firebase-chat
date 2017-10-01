import { Component } from "@angular/core";
import { AlertController, IonicPage, NavController, NavParams } from "ionic-angular";
import { FirebaseAuthProvider } from "../../providers/firebase-auth/firebase-auth";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: string = "";
  password: string = "";

  constructor (
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public firebaseAuth: FirebaseAuthProvider
  ) {
  }

  ionViewDidLoad () {
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  submitLogin () {
    this.firebaseAuth.login(this.email, this.password).then(() => {
      return this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      return this.alertCtrl.create({
        title: "Authentication Error!",
        message: error.message
      }).present();
    });
  }
}
