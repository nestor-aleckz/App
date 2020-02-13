import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { usercreds } from '../../models/interfaces/usercreds'
import {TabsPage} from '../tabs/tabs'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as usercreds;

  constructor(public autservice: AuthProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl : ToastController,
              public lodingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }

  showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'middle'
    });
    toast.present();
  }

  signin(){

    if(this.isanemail()&&this.credentials.password.length>=7){
        var success = false;

        this.autservice.login(this.credentials).then((res:any)=>{
            success = res.result;
            if(success){
                this.navCtrl.push(TabsPage);
            }else{
                this.showToast("Correo o contraseña incorrectos");
            }
        });

    }else{
        this.showToast("Correo o contraseña no válidos");
    }
  }



  signup(){
    this.navCtrl.push('RegistroPage');
  }

  resetpassword(){
    //this.navCtrl.push('PasswordresetPage');
  }

  isanemail(){
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.credentials.email);
  }


}
