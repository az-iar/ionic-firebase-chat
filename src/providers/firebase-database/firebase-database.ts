import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { FirebaseProvider } from "../firebase/firebase";

@Injectable()
export class FirebaseDatabaseProvider {
  constructor(public firebase: FirebaseProvider) {}

  getChats() {
    return this.firebase.database().ref("chats");
  }
}
