import { Component } from '@angular/core';
import { ViewController, NavController, Modal} from 'ionic-angular';
import { MarcasModalPage } from '../marcas-modal/marcas-modal'

/*
  Generated class for the PopupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/popup/popup.html',
})
export class PopupPage {
  user = null
  marcas = null
  constructor(private view: ViewController, private nav: NavController) {
    this.user = view.data.user
    firebase.database().ref(`/user/${this.user.uid}/marcas`).on('value',(snapshot)=> {
      this.marcas = snapshot.val()})
  }
  close(){
    this.view.dismiss()
  }
  logout(){
    console.log('ñaña')
    firebase.auth().signOut()
  }
  modal_marcas($event){
    this.view.dismiss()
    let marcas = Modal.create(MarcasModalPage,{user: this.user, marcas: this.marcas})
    marcas.subscribe(data => {
      firebase.database().ref(`/user/${this.user.uid}/marcas`).set(data)
    })
    this.nav.present(marcas,{ev:$event})
  }
}
