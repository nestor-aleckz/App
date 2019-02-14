import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProvVacunaProvider } from '../../providers/prov-vacuna/prov-vacuna';
import { Vacuna,VacunaxInfante } from '../../models/interfaces/ifVacuna';
/**
 * Generated class for the AlimentacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alimentacion',
  templateUrl: 'alimentacion.html',
})
export class AlimentacionPage {

  infante :{edad:number,nombre:string,key:string} = {edad: 0,nombre: '',key:''};
  VacInfante: VacunaxInfante;
  vacuna:string;
  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public svProvVac: ProvVacunaProvider) {
    this.infante = navParams.get('infante');
    this.vacuna = navParams.get('vacuna');
    this.VacInfante= navParams.get('vacInf');
  }

  ionViewDidLoad() {

  }
  dismiss(){
      this.viewCtrl.dismiss();
  }

  delete(){
    var strkeyVac = this.VacInfante.idVacuna+"_"+this.VacInfante.dosis;
    console.log(strkeyVac);
    this.svProvVac.deleteVacunaInfante(this.infante.key,strkeyVac).then((res:any)=>{
      if(res.success){
        this.viewCtrl.dismiss();
      }else{
        console.log(res);
      }
    });
  }

  guardarVacuna(){
    this.VacInfante.vacunado=true;
    this.svProvVac.addVacunaInfante(this.infante.key,this.VacInfante).then((res:any)=>{
      if(res.success){
        this.viewCtrl.dismiss();
      }else{
        console.log(res);
      }
    });
  }

}
