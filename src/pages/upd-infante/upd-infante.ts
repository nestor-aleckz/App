import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Infantes } from '../../models/interfaces/infantes'
import { ProvInfanteProvider } from '../../providers/prov-infante/prov-infante'


@Component({
  selector: 'page-upd-infante',
  templateUrl: 'upd-infante.html',
})

export class UpdInfantePage {
  Infante = {} as Infantes;
  itemKey : string ;
  constructor(  public svInfante : ProvInfanteProvider,
                public navCtrl: NavController,
                public viewmodal :ViewController,
                public navParams: NavParams) {
      this.itemKey = navParams.get('keyI');
      this.Infante = navParams.get('objInf');
  }

  ionViewDidLoad() {
  }

  Guardar(strKey:string, prmInfante : Infantes){
    this.svInfante.updateInfante(strKey,prmInfante).then((res:any)=>{
      if(res.success){
        this.viewmodal.dismiss();
      }else{
        console.log(res);
      }
    });
  }

}
