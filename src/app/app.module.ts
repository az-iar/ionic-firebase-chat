import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { FirebaseProvider } from "../providers/firebase/firebase";
import { FirebaseAuthProvider } from "../providers/firebase-auth/firebase-auth";
import { FirebaseDatabaseProvider } from "../providers/firebase-database/firebase-database";
import { LoginPage } from "../pages/login/login";

@NgModule({
  declarations: [MyApp, HomePage, LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, LoginPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider,
    FirebaseAuthProvider,
    FirebaseDatabaseProvider
  ]
})
export class AppModule {}
