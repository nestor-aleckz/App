import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { ProvVacunaProvider } from '../../providers/prov-vacuna/prov-vacuna';
import { Vacuna } from '../../models/interfaces/ifVacuna';
import {AlimentacionPage} from '../alimentacion/alimentacion';



@Component({
  selector: 'page-vacunas',
  templateUrl: 'vacunas.html',
})
export class VacunasPage {
  vacunas: Vacuna[];
  strTitulo: String;
  infante :{edad:number,nombre:string,key:string} = {edad: 0,nombre: '',key:''};
  intMesV;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public svProvVac: ProvVacunaProvider) {
     this.intMesV = navParams.get('mes');
     this.infante = navParams.get('infante');
  }

  ionViewDidLoad() {
    this.vacunas = this.svProvVac.crearVacunas(this.intMesV,this.infante.key);
    }

  showVacuna(vacuna:Vacuna){
    this.svProvVac.getVacunaInfante(this.infante.key,vacuna).then((res:any)=>{
        var  vacI = res.vacInfante;
         let profileModal = this.modalCtrl.create(
           AlimentacionPage,
           {
            vacuna:vacuna.nombre,
            vacInf: vacI,
            infante:this.infante
           }
         );
          profileModal.onDidDismiss (() => {
            this.vacunas = this.svProvVac.crearVacunas(this.intMesV,this.infante.key);
          });
         profileModal.present();
    });
  }


}
