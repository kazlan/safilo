import {Component} from '@angular/core';
import {NavController, Popover} from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import { PopupPage } from '../popup/popup'

import {AngularFire, FirebaseListObservable} from 'angularfire2'


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  pedidos: Observable<any[]>
  user = firebase.auth().currentUser
  lista: Observable<any>
  ref = firebase.database().ref("pedidos")
  marcas: FirebaseListObservable<any[]>
  constructor(private navController: NavController,
    public af: AngularFire
    ) {
    this.marcas = af.database.list(`/user/${this.user.uid}/marcas`)  
    this.pedidos = af.database.list('/pedidos')
      // añade precio total del pedido
      .map(items=>{
        return items.map(item=>{
          return Object.assign({}, item, {
            piezas: item.piezas.length,
            total: item.piezas.reduce((acc,x)=>{
              return acc+ parseFloat(x.precio)
            },0)
          })
        })
      // Filtra solo las marcas que queremos ver  
      }).combineLatest(this.marcas,(pedidos,marcas)=>{
        let checked = marcas.filter(x=>x.checked).map(x=>x.nombre)
        return pedidos.filter(p=> checked.indexOf(p.marca) != -1)
      })     
  }
  login(){
    this.af.auth.login()
  }
  popup($event){
    let pop = Popover.create(PopupPage,{ user: this.user})
    this.navController.present(pop,{ev:$event})
    
  }
}
