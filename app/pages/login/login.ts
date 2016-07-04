import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire,FirebaseAuthState} from 'angularfire2'

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  loggedIn:FirebaseAuthState= null
  constructor(private nav: NavController, public af: AngularFire) {
    this.af.auth.subscribe(x=>this.loggedIn = x)
  }
  login(){
    this.af.auth.login()
  }

}
