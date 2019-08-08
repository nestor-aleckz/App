import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController, PopoverController} from 'ionic-angular';

import {VacunasPage} from '../vacunas/vacunas'
import { Vacuna } from '../../models/interfaces/ifVacuna';
import {AlimentacionPage} from '../alimentacion/alimentacion'
import { ProvInfanteProvider } from '../../providers/prov-infante/prov-infante'
import { ProvVacunaProvider } from '../../providers/prov-vacuna/prov-vacuna'
import { ProvAlimentoProvider } from '../../providers/prov-alimento/prov-alimento'
import { ProvDesarrolloProvider } from '../../providers/prov-desarrollo/prov-desarrollo'
import { ProvEstimuProvider } from '../../providers/prov-estimu/prov-estimu'
import { FechaVacuna } from '../../models/interfaces/ifVacuna'
import { Alimento } from '../../models/interfaces/ifAlimento'
import { Crecimiento } from '../../models/interfaces/ifCrecimiento'
import { Infantes } from '../../models/interfaces/infantes'
import * as moment from 'moment';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
   vacunas: Vacuna[];
   infantes: Infantes[] = [];
   fechasV: FechaVacuna[];
   edadAlimts: Alimento[];
   lstDesarrollo: Crecimiento[];
   lstEstimulo: Crecimiento[];
   edadVacuna = 1;
   edadAlimento = 0;
   etapaC = 0;
   etapaS = 0;
   infante :{edad:number,nombre:string,key:string} = {edad: -1,nombre: '',key:''};
   intMesV;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public svProvVac : ProvVacunaProvider,
              public svProvAlim :ProvAlimentoProvider,
              public svProvDesa : ProvDesarrolloProvider,
              public svProvEstimu :ProvEstimuProvider,
              public svInfante :ProvInfanteProvider,
              public popoverCtrl: PopoverController) {
    this.infantes = svInfante.getlstInfantes();
    this.fechasV = svProvVac.getFechas();
    this.edadAlimts = svProvAlim.getFechas();
    this.lstDesarrollo = svProvDesa.getEtapas();
    this.lstEstimulo = svProvEstimu.getEtapas();
  }

  ionViewDidLoad() {

  }

  slctNino(objInf){
    var intedad = this.getEdad(objInf.FechaNac);
    this.infante.edad = intedad;
    this.infante.nombre = objInf.Nombres;
    this.infante.key = objInf.Key;
    this.verinfoxedad(this.infante.edad);
  }

  verinfoxedad(edad){
    this.infoVac(edad);
    this.infoAlimento(edad)
    this.infoDyE(edad);
  }

  infoVac(edad){
      if(edad<=0){
        //vacunas recien nacido
       this.edadVacuna = 1;
     }else if(edad<=3){
       //vacunas 2 meses
       this.edadVacuna = 2;
     }else if(edad<=5){
       //vacuna 4 meses
       this.edadVacuna = 3;
     }else if(edad<=12){
       //vacuna 6 meses
       this.edadVacuna = 4;
     }else if(edad<=17){
       //vacuna 12 meses
       this.edadVacuna = 5;
     }else if(edad<=47){
       //vacuna 18 meses
       this.edadVacuna = 6;
     }else if(edad<=59){
       //vacuna 48 meses
       this.edadVacuna = 7;
     }else{
       //vacuna 48 meses
       this.edadVacuna = 8;
     }
  }

  infoAlimento(edad){
      if(edad<=6){
        //primer alimento
       this.edadAlimento = 0;
     }else if(edad<=9){
       //2 alimento
       this.edadAlimento = 1;
     }else if(edad<=12){
       //3 alimento
       this.edadAlimento = 2;
     }else{
       //alimento diario
       this.edadAlimento = 3;
     }
  }

  infoDyE(edad){
      if(edad<=3){
        //0-3 meses
       this.etapaC = 0;
       this.etapaS = 0;
     }else if(edad<=6){
       //3- 6 meses
       this.etapaC = 1;
       this.etapaS = 1;
     }else if(edad<=9){
       //6-9 meses
       this.etapaC = 2;
       this.etapaS = 2;
     }else if(edad<=12){
       //9-12
       this.etapaC = 3;
       this.etapaS = 3;
     }else if(edad<=18){
       //12-18
       this.etapaC = 4;
       this.etapaS = 4;
     }else{
       //19-24
       this.etapaC = 5;
       this.etapaS = 5;
     }
  }
  getEdad(strEdad : string){
    var fecha1 = moment(strEdad);
    var fecha2 = moment(Date.now());
    return fecha2.diff(fecha1, 'months');
  }

  verInfo(etapa:Number,tipoInfo:Number){
    switch(tipoInfo){
      case 1:{ //vacuna
          return (this.edadVacuna!=etapa);
      }
      case 2:{ //alimento
        return (this.edadAlimento!=etapa);
      }
      case 3:{ //crecimiento
        return (this.etapaC!=etapa);
      }
      case 4:{ //estimulacion
        return (this.etapaS!=etapa);
      }
    }
  }

/*vacunas INICIO*/
initVac(){
  this.vacunas = [];
}
  verVacuna(inttipo:Number){
    this.intMesV = inttipo;
    this.vacunas = this.svProvVac.crearVacunas(inttipo,this.infante.key);
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


/*vacunas FIN*/
}
