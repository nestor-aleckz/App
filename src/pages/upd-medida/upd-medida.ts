import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { Medida } from '../../models/interfaces/ifMedida';
import { ProvMedidaProvider } from '../../providers/prov-medida/prov-medida';
import * as moment from 'moment';

@Component({
  selector: 'page-upd-medida',
  templateUrl: 'upd-medida.html',
})

export class UpdMedidaPage {

  nwMedida = {} as  Medida;
  strKey : string;
  strFechaN : string;
  constructor(  public svMedida: ProvMedidaProvider,
                public navCtrl: NavController,
                public viewmodal :ViewController,
                public navParams: NavParams) {
        this.strKey = navParams.get('strKeyM');
        this.strFechaN = navParams.get('strFnac');
        this.nwMedida  = navParams.get('objMed');
  }

  ionViewDidLoad() {
  }

  updMedida(medida: Medida){
    var fecha1 = moment(this.strFechaN);
    var fecha2 = moment(medida.fecha);
    var edad  = fecha2.diff(fecha1, 'months');
    medida.edad = edad+"";
    medida.peso = this.converttoKg(medida.lb,medida.onz);
    this.svMedida.updateMedida(this.strKey,medida).then((res:any)=>{
      if(res.success){
        this.viewmodal.dismiss();
      }else{
        console.log(res);
      }
    });
  }

  converttoKg(strlibra:string, stronza:string){
    var intlb = +strlibra;
    var intonza = +stronza;
    var inttotalonza = intlb*16+intonza;
    var valkg = inttotalonza / 35.274;
    var ttkg = this.round(valkg,1);
    console.log(ttkg);
    return ttkg +"";
  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


  closeModal() {
        this.navCtrl.pop();
    }
}
