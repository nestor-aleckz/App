import { Injectable } from '@angular/core';
import { usercreds } from '../../models/interfaces/usercreds'
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afireauth: AngularFireAuth) {

  }

  registro(credentials: usercreds){
    var promise = new Promise((resolve, reject) =>{
      this.afireauth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(()=>{
        resolve({ success: true });
      }).catch((err)=>{
        resolve(err);
      })
    });
    return promise;
  }

  login(credentials: usercreds){

    var promise = new Promise((resolve, reject) =>{
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(()=>{
        resolve({ result: true });
      }).catch((err)=>{
        console.log(err);
        resolve({error : err});
      })
    });
    return promise;
  }
}
