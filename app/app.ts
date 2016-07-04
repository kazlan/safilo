import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home'
import {LoginPage} from './pages/login/login'
import { FIREBASE_PROVIDERS, defaultFirebase,
  AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2'

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;
  private loggedIn:any;
  constructor(private platform:Platform, af: AngularFire) {
    af.auth.subscribe(x=>{
      this.rootPage= x? HomePage:LoginPage})
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp,[
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyAgllx9NddDVgUpiJB5cQJ273sZf2Ht1Kc",
    authDomain: "safilo-67ca1.firebaseapp.com",
    databaseURL: "https://safilo-67ca1.firebaseio.com",
    storageBucket: "safilo-67ca1.appspot.com",
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
  })
])
