import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Infantes } from '../../models/interfaces/infantes'
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';

/*
  Generated class for the ProvInfanteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvInfanteProvider {

  itemsRef: AngularFireList<any>;
  itemRef : AngularFireObject<any>;
  items: Observable<any[]>;
  lstInfantes: Infantes[]=[];
  constructor(private database: AngularFireDatabase, private afaut : AngularFireAuth) {
    this.afaut.authState.subscribe(auth=>{
      this.itemsRef =this.database.list(`Infantes/${auth.uid}`);
      // Use snapshotChanges().map() to store the key
      this.items= this.itemsRef.snapshotChanges().pipe( map(changes =>
        changes.map(c => ({ key:   c.payload.key, ...c.payload.val() }))
      ));
    });
  }

    getlstInfantes(){
      this.itemsRef.snapshotChanges().subscribe(
        actions => {
          actions.forEach(
            action=>{
              var infante =  {} as Infantes;
              infante.Nombres = action.payload.val().Nombres;
              infante.Apellidos = action.payload.val().Apellidos;
              infante.FechaNac = action.payload.val().FechaNac;
              infante.Genero = action.payload.val().Genero;
              infante.Key =  action.payload.key;
              this.lstInfantes.push(infante);
              infante = null;
            });
        });
        return this.lstInfantes;
    }

    listInfantes(){
        return this.items;
    }

    getInfante(strkeyInfante : string){
      var nwinfantes = {} as Infantes;
      this.afaut.authState.subscribe(auth=>{
        var path = `Infantes/${auth.uid}`+'/'+strkeyInfante;
        this.itemRef =this.database.object(path);
        this.itemRef.snapshotChanges().subscribe(
          action => {
            nwinfantes.Nombres = action.payload.val().Nombres;
            nwinfantes.Apellidos = action.payload.val().Apellidos;
            nwinfantes.FechaNac = action.payload.val().FechaNac;
            nwinfantes.Genero = action.payload.val().Genero;
          });
      });
      return nwinfantes;
    }

    addnewInfante(prminfante : Infantes){
      var promise = new Promise((resolve, reject) =>{
          this.itemsRef.push(prminfante).then(()=>{
              resolve({ success: true });
            })
      });
      return promise;
    }

    updateInfante(key: string, prminfante : Infantes) {
      var promise = new Promise((resolve, reject) =>{
        this.itemsRef.update(key, prminfante).then(()=>{
            resolve({ success: true });
          })
      });
      return promise;
    }

    deleteItem(key: string) {
      var promise = new Promise((resolve, reject) =>{
        this.itemsRef.remove(key).then(()=>{
            resolve({ success: true });
          })
      });
      return promise;
    }
}
