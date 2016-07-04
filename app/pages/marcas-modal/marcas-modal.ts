import { Component} from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the MarcasModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/marcas-modal/marcas-modal.html',
})
export class MarcasModalPage{
  user = null
  marcas = null
  constructor(private nav: NavController, private view: ViewController) {
    this.user = view.data.user
    this.marcas = view.data.marcas
  }
  dismiss() {
   let data = this.marcas;
   this.view.dismiss(data);
  }
  onChange(){
    this.view.emit(this.marcas)
  }
}
