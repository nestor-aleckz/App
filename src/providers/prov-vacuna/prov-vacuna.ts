import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase , AngularFireList,AngularFireObject } from '@angular/fire/database';
import { Vacuna,FechaVacuna,VacunaxInfante } from '../../models/interfaces/ifVacuna'


@Injectable()
export class ProvVacunaProvider {
  lstvacxIn: VacunaxInfante[]=[];
  fechasV: FechaVacuna[] = [];
  itemsRef: AngularFireList<any>;
  itemsVacIn: AngularFireList<any>;
  itemVacIn : AngularFireObject<any>;
  itemRef: AngularFireObject<any>;
  strKeyInfante : string;
  constructor(private database: AngularFireDatabase, private afaut : AngularFireAuth) {

    this.itemsRef =this.database.list('FechaVacuna/');
      this.itemsRef.snapshotChanges().subscribe(
        actions => {
          actions.forEach(
            action=>{
              var fcha =  {} as FechaVacuna;
              fcha.idFecha = action.payload.val().idFecha;
              fcha.titulo = action.payload.val().titulo;
              fcha.strimg = action.payload.val().strimg;
              this.fechasV.push(fcha);
              fcha = null;
            });
        })
  }

  getVAcuna(intId : number,intOp : Number){
    var vac = {} as Vacuna  ;
      this.itemRef =this.database.object('Vacuna/'+intId);
      this.itemRef.snapshotChanges().subscribe(
        action => {
          vac.idVacuna=intId;
          vac.descripcion = action.payload.val().descripcion;
          switch(intOp){
            case 2:{
              vac.dosis=1;
              vac.nombre = action.payload.val().nombre + " (1a. dosis)";
              break;
            }
            case 3:
            case 8:{
              vac.dosis =2;
              vac.nombre = action.payload.val().nombre + " (2a. dosis)";
              break;
            }
            case 4:{
              vac.dosis=3;
              vac.nombre = action.payload.val().nombre + " (3a. dosis)";
              break;
            }
            case 5:{
              if(intId==6){
                vac.dosis =1;
                vac.nombre = action.payload.val().nombre + " (1a. dosis)";
              }else if(intId==5){
                vac.dosis =2;
                vac.nombre = action.payload.val().nombre + " (Refuerzo)";
              }
              break;
            }
            case 6:{
              vac.dosis=1;
              vac.nombre = action.payload.val().nombre + " (1er. Refuerzo)";
              break;
            }
            case 7:{
              vac.dosis=2;
              vac.nombre = action.payload.val().nombre + " (2do. Refuerzo)";
              break;
            }
            default:{
              vac.dosis=1;
              vac.nombre = action.payload.val().nombre;
              break;
            }
          }
          this.vacunaAplicada(this.strKeyInfante,vac).then((res:any)=>{
            vac.vacunado =res.success;
          });

        });
    return vac;
  }

  getFechas(){
    return this.fechasV;
  }


  vacunaAplicada(strKeyInfante,vac){
    var promise = new Promise((resolve, reject) =>{
        this.getVacunaInfante(strKeyInfante,vac).then((res:any)=>{
          resolve({ success: res.vacInfante.vacunado });
        });
      });
      return promise;

   }


  crearVacunas(intOp : Number,strKeyI:string){
    this.strKeyInfante=strKeyI;
    var vacunas: Vacuna[] =[];
    switch(intOp){
      case 0:{ //ebmarazo
       vacunas.push(this.getVAcuna(8,0));
       vacunas.push(this.getVAcuna(9,0));
        break;
      }
      case 1:{ //recien nacido
       vacunas.push(this.getVAcuna(0,1));
       vacunas.push(this.getVAcuna(1,1));
        break;
      }
      case 2:{ // 2 meses
       vacunas.push(this.getVAcuna(2,2));
       vacunas.push(this.getVAcuna(3,2));
       vacunas.push(this.getVAcuna(4,2));
       vacunas.push(this.getVAcuna(5,2));
        break;
      }
      case 3:{ // 4 meses
        vacunas.push(this.getVAcuna(2,3));
        vacunas.push(this.getVAcuna(3,3));
        vacunas.push(this.getVAcuna(4,3));
        vacunas.push(this.getVAcuna(5,3));
        break;
      }
      case 4:{ // 6 meses
        vacunas.push(this.getVAcuna(2,4));
        vacunas.push(this.getVAcuna(3,4));
        break;
      }
      case 5:{ // 12 meses
        vacunas.push(this.getVAcuna(5,5));
        vacunas.push(this.getVAcuna(6,5));
        break;
      }
      case 6:{ // 18 meses
        vacunas.push(this.getVAcuna(7,6));
        break;
      }
      case 7:{ // 48 meses
        vacunas.push(this.getVAcuna(7,7));
        break;
      }
      case 8:{ // 60 meses
        vacunas.push(this.getVAcuna(6,8));
        break;
      }
    }
    return vacunas;
  }


   listVacunaxInfante(strKeyInf:string){
     this.afaut.authState.subscribe(auth=>{
      if(auth){
        this.itemsVacIn =this.database.list(`VacunaInfante/${auth.uid}/${strKeyInf}`);
        this.itemsVacIn.snapshotChanges().subscribe( actions => {
          actions.forEach(
            action=>{
              var vacI =  {} as VacunaxInfante;
              vacI.dosis = action.payload.val().dosis;
              vacI.fechaVacuna = action.payload.val().fechaVacuna;
              vacI.idVacuna = action.payload.val().idVacuna;
              vacI.vacunado = action.payload.val().vacunado;
              this.lstvacxIn.push(vacI);
              vacI = null;
            });
        });
      }
   });
 }

   getVacunaInfante(strKeyI:string, vacuna : Vacuna){
    var vacI = {} as VacunaxInfante;
    var promise = new Promise((resolve, reject) =>{
      this.afaut.authState.subscribe(auth=>{
        if(auth){
          var path = `VacunaInfante/${auth.uid}/${strKeyI}/${vacuna.idVacuna+"_"+vacuna.dosis}`;
       this.itemVacIn =this.database.object(path);
       this.itemVacIn.snapshotChanges().subscribe(
         action => {
           if(action.payload.val()==null){
             vacI.vacunado=false;
             vacI.fechaVacuna = '';
             vacI.idVacuna = vacuna.idVacuna;
             vacI.dosis = vacuna.dosis;
           }else{
             vacI.dosis = action.payload.val().dosis;
             vacI.fechaVacuna = action.payload.val().fechaVacuna;
             vacI.idVacuna = action.payload.val().idVacuna;
             vacI.vacunado = action.payload.val().vacunado;
          }
          resolve({ vacInfante: vacI });
         });
        }
       });
    });
   return promise;
   }

   addVacunaInfante(strKeyI:string,objVacInf : VacunaxInfante){
      var promise = new Promise((resolve, reject) =>{
        this.afaut.authState.subscribe(auth=>{
         if(auth){
          this.itemsVacIn =this.database.list(`VacunaInfante/${auth.uid}/${strKeyI}`);
          this.itemsVacIn.set(objVacInf.idVacuna+"_"+objVacInf.dosis,objVacInf).then(()=>{
              resolve({ success: true });
            });
         }
        });
     });
     return promise;
   }

   deleteVacunaInfante(strKeyI:string,key: string) {
     var promise = new Promise((resolve, reject) =>{
         this.afaut.authState.subscribe(auth=>{
            if(auth){
              this.itemsVacIn =this.database.list(`VacunaInfante/${auth.uid}/${strKeyI}`);
              this.itemsVacIn.remove(key).then(()=>{
                  resolve({ success: true });
                });
            }
          });
      });
      return promise;
  }
}
