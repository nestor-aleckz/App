import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Infantes } from '../../models/interfaces/infantes'
import { ProvInfanteProvider } from '../../providers/prov-infante/prov-infante'

@Component({
  selector: 'page-add-infante',
  templateUrl: 'add-infante.html',
})
export class AddInfantePage {
  nwInfate = {} as Infantes;


  constructor(public svInfante: ProvInfanteProvider,
              public navCtrl: NavController,
              public viewmodal :ViewController,
              public navParams: NavParams) {


  }

  ionViewDidLoad() {
  }

  createNwInfante(infantnw : Infantes)
  {
      this.svInfante.addnewInfante(infantnw).then((res:any)=>{
        if(res.success){
          this.viewmodal.dismiss();
        }else{
          console.log(res);
        }
      });
  }

  closeModal() {
        this.navCtrl.pop();
    }

}
