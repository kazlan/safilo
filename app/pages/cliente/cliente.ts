import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ClientePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/cliente/cliente.html',
})
export class ClientePage {
  cliente = null
  pedidos = null
  constructor(private nav: NavController, private params: NavParams) {
    this.cliente = params.get('cliente')
    firebase.database().ref('/pedidos')
      .orderByChild('/cliente/id')
      .equalTo(this.cliente.id)
      .on('value',(snapshot)=>{
        let val = snapshot.val()
        this.pedidos = Object.keys(val).map(x=>val[x])
      })
  }

}
