import { Component } from '@angular/core';
import { App, NavController, NavParams, ModalController } from 'ionic-angular';
import { Infantes } from '../../models/interfaces/infantes'
import {AddInfantePage} from '../add-infante/add-infante';
import {UpdInfantePage} from '../upd-infante/upd-infante';
import {MedidaPage} from '../medida/medida';
import { ProvInfanteProvider } from '../../providers/prov-infante/prov-infante';
import { AuthProvider } from '../../providers/auth/auth'
import { Observable } from 'rxjs-compat';
import * as moment from 'moment';
import { from } from 'rxjs';

@Component({
  selector: 'page-infante',
  templateUrl: 'infante.html',
})
export class InfantePage {

  items: Observable<any[]>;

  constructor(public svInfante: ProvInfanteProvider,
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController,
      private svAuth:AuthProvider,
      private app:App){
  }

  ionViewDidLoad() {
   this.svInfante.listInfantes().then((result:any)=>{
      this.items = result.data; 
   });
  }

  verEdad(strEdad : string){
    var fecha1 = moment(strEdad);
    var fecha2 = moment(Date.now());
    var edad = fecha2.diff(fecha1, 'months');
    var str : string;
    if(edad == 1){
        str = edad + " mes de Edad";
        return  str;
    }else{
        str = edad + " meses de Edad";
        return  str;
    }

  }

  updInfante(prmKeyI : string){
    var Infante = {} as Infantes;
    Infante = this.svInfante.getInfante(prmKeyI);
    let profileModal = this.modalCtrl.create(UpdInfantePage,{keyI: prmKeyI, objInf:Infante });
    profileModal.present();
  }

  delInfante(prmKeyI : string){
     this.svInfante.deleteItem(prmKeyI).then((res:any)=>{
       if(res.success){
         this.ionViewDidLoad();
       }else{
         console.log(res);
       }
     });
  }

  openModal(){
    let profileModal = this.modalCtrl.create(AddInfantePage,'');
    profileModal.present();
  }

  monitoreo(prmKeyI : string){
    var Infante = {} as Infantes;
    Infante = this.svInfante.getInfante(prmKeyI);
    this.navCtrl.push(MedidaPage,{keyI: prmKeyI, objInf:Infante });
  }

  logOut(){
    this.svAuth.logOut().then((res:any)=>{
      if(res.success){
        this.app.getRootNav().setRoot('LoginPage');
      }
    });
  }

}
