import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';
import { dateObj, Evento } from '../../models/interfaces/ifEvento'
import { ProvEventoProvider } from '../../providers/prov-evento/prov-evento';

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  evento = {} as Evento ;
  isevent:boolean;
  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public svEvento: ProvEventoProvider) {
    this.isevent =navParams.get('esEvento');
    this.evento = navParams.get('objEve');
  }

  ionViewDidLoad() {
  }

  guardarEvento(eve:Evento){
    this.svEvento.addEvento(eve.fecha,eve).then((res:any)=>{
      if(res.success){
        this.viewCtrl.dismiss();
      }else{
        console.log(res);
      }
    });
  }
  eliminarEvento(eve:Evento){
    this.svEvento.deleteEvento(eve.fecha).then((res:any)=>{
      if(res.success){
        this.viewCtrl.dismiss();
      }else{
        console.log(res);
      }
    });
  }
  closeModal() {
        this.navCtrl.pop();
    }

}
