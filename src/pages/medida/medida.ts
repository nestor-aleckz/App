import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , LoadingController} from 'ionic-angular';
import { Infantes } from '../../models/interfaces/infantes';
import { ProvMedidaProvider } from '../../providers/prov-medida/prov-medida';
import { Medida } from '../../models/interfaces/ifMedida';
import { Observable } from 'rxjs-compat';
import { AddMedidaPage } from '../add-medida/add-medida';
import { UpdMedidaPage } from '../upd-medida/upd-medida';
import Chart from 'chart.js';
import { pesoxedadH,tallaxedadH,pesoxedadM,tallaxedadM } from '../../models/interfaces/ifDataMedida';
import * as moment from 'moment';

@Component({
  selector: 'page-medida',
  templateUrl: 'medida.html',
})
export class MedidaPage {
  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;
  Infante = {} as Infantes;
  itemKey : string ;
  items: Observable<any[]>;
  data =[] ;
  arrMeses = [];
  dtPexE = pesoxedadH;
  dtPexT = tallaxedadH;
  dtPexEM = pesoxedadM;
  dtPexTM = tallaxedadM;
  colorG: String;
  strKeyIn : string;
  strFechaN : string;

  constructor(public svMedida: ProvMedidaProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {
    this.itemKey = navParams.get('keyI');
    this.Infante = navParams.get('objInf');
    this.svMedida.lstMedidas(this.itemKey);
  }

  ionViewDidLoad() {
    this.items = this.svMedida.getmedidas();
    this.llenarDatas();
  }

  /*INICIO CRUD MEDIDA*/

    updMedida(strKeyM:string,strFecha:string){
      var medida = {} as Medida;
      medida = this.svMedida.getMedida(this.itemKey,strKeyM);
      let profileModal = this.modalCtrl.create(UpdMedidaPage,
        { strKeyM : strKeyM,
          objMed: medida,
          strFnac:strFecha
        });
      profileModal.present();
    }

    delMedida(strKeyM:string){
      this.svMedida.deleteItem(strKeyM).then((res:any)=>{
        if(res.success){
          this.ionViewDidLoad();
        }else{
          console.log(res);
        }
      });
    }

    openModal(strKeyI:string,strFecha:string){
      let profileModal = this.modalCtrl.create(AddMedidaPage,{strKeyI : strKeyI,strFnac:strFecha});
      profileModal.present();
    }

    getPesolb(strLb:string, stronz:string, strKg:string){
      return strLb + " lbs " + stronz+ " onzs " + " (" + strKg+" kg)";
    }

    verEdad(strEdad : string){
      if(strEdad == '1'){
          return strEdad + " mes";
      }else{
          return strEdad + " meses";
      }

    }

  /*FIN CRUD MEDIDA*/

  /* INICIO GRAFICA */
  onChange(strTipoGf : string) {
      this.createGrafica(strTipoGf);
  }

  createGrafica(strtipoG:string){
    var datos = this.getData(this.obtenerEdad(),strtipoG)
    var dataI = datos.dataI;
    var dataOms= datos.dataOMS;
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: 'line',
        data: {
          labels: this.arrMeses,
              datasets: [{
                  data: dataI,
                  label: this.Infante.Nombres,
                  borderColor: this.colorG,
                  fill: false
                }, {
                  data: dataOms,
                  label: "Estandar OMS",
                  borderColor: "#c45850",
                  fill: false
                }
              ]
            },
        options: {
          title: {
            display: true,
            text: 'Curvas de Crecimiento'
          }
        }
    });

  }

  /* FIN GRAFICA */

  llenarDatas(){
    this.items.subscribe(actions=>{
      actions.forEach(
        action=>{
            var values ={
              pos: parseInt(action.edad),
              valp: action.peso,
              valt: action.talla
            };
            this.data.push(values);
        })
    });
  }



  getDtInfante(inicio : number,fin:number,strtipoG:string){
    var data = [];
    for (var i = inicio; i < fin; i++) {
        data[i] = null;
    }
    for (let dt of this.data) {
      if(dt.pos>=inicio && dt.pos<=fin){
        if(strtipoG=='Peso'){
           data[dt.pos]=dt.valp;
       }else{
          data[dt.pos]=dt.valt;
       }
      }
    }
    return data;
  }



  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 3000
    });
    loader.present();
  }


  obtenerEdad(){
    var fecha1 = moment(this.Infante.FechaNac);
    var fecha2 = moment(Date.now());
    var edad = fecha2.diff(fecha1, 'months');
    return edad;
  }

  getData(edad:number,strtipoG:string){
    var datos = {dataI :[],dataOMS:[]};
    if(edad < 13){
      datos.dataI = this.getDtInfante(0,13,strtipoG);
      datos.dataOMS= this.getDataWithOms(0,13,strtipoG);
    }else if(edad < 25){
      datos.dataI = this.getDtInfante(12,25,strtipoG);
      datos.dataOMS =this.getDataWithOms(12,25,strtipoG);
    }else if(edad < 37){
      datos.dataI = this.getDtInfante(24,37,strtipoG);
      datos.dataOMS= this.getDataWithOms(24,37,strtipoG);
    }else if(edad < 49){
      datos.dataI = this.getDtInfante(36,49,strtipoG);
      datos.dataOMS = this.getDataWithOms(36,49,strtipoG);
    }else {
      datos.dataI = this.getDtInfante(48,61,strtipoG);
      datos.dataOMS = this.getDataWithOms(48,61,strtipoG);
    }
    return datos;
  }

  getDataWithOms(inicio :number,fin :number,strtipoG:string){
    var cont=0;
    var dtGraf=[];
    for(var i=inicio;i<fin;i++){
      if(strtipoG=='Peso'){
        if(this.Infante.Genero =='M'){
            this.colorG = "#3e95cd";
            dtGraf[cont]=this.dtPexE[i];
        }else{
            this.colorG = "#ff66cc";
            dtGraf[cont]=this.dtPexEM[i];
        }

      }else{
        if(this.Infante.Genero =='M'){
           this.colorG = "#3e95cd";
           dtGraf[cont]=this.dtPexT[i];
        }else{
          this.colorG = "#ff66cc";
          dtGraf[cont]=this.dtPexTM[i];
        }

      }
      this.arrMeses[i]=i;
      cont++;
    }
    return dtGraf;
  }

}
