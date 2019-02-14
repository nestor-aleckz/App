import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { usercreds } from '../../models/interfaces/usercreds'
import {TabsPage} from '../tabs/tabs'
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  newuser = {} as usercreds;

    constructor(public autservice: AuthProvider,
                public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl : ToastController,
                public lodingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad RegistroPage');
    }

    goBack(){
      this.navCtrl.setRoot('LoginPage');
    }


    showToast(message) {
      const toast = this.toastCtrl.create({
        message: message,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
    }

    isanemail(){
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.newuser.email);
    }

    async registrar(){
      try{
        if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.nickname == '') {
            this.showToast('Debe de llenar todos los campos');
          }
          else if(!this.isanemail()){
            this.showToast('Correo no válido');
          }
          else if (this.newuser.password.length < 7) {
            this.showToast('La contreseña debe de tener más de 6 caracteres');
          }else{
            let loader = this.lodingCtrl.create({
              content: 'Cargando'
            });
            this.autservice.registro(this.newuser).then((res:any)=>{
              loader.dismiss();
              if(res.success){
                  this.navCtrl.push(TabsPage);
                }
                else
                 this.showToast("Ha ocurrido un error");

            });
        }
      }catch(e){
         this.showToast(e);
      }
    }
}
