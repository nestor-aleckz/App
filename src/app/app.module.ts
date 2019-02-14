import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TooltipsModule } from '../ionic-tooltips/src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//firebase

import {config} from './app.firebaseconfig';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';

//providers
import { AuthProvider } from '../providers/auth/auth';
//pages
import {LoginPageModule} from '../pages/login/login.module';
import {InfantePageModule} from '../pages/infante/infante.module';
import {CalendarPageModule} from '../pages/calendar/calendar.module';
import {EventoPageModule} from '../pages/evento/evento.module';
import {InfoPageModule} from '../pages/info/info.module';
import {AlimentacionPageModule} from '../pages/alimentacion/alimentacion.module';
import {VacunasPageModule} from '../pages/vacunas/vacunas.module';
import {MedidaPageModule} from '../pages/medida/medida.module';
import {AddInfantePageModule} from '../pages/add-infante/add-infante.module';
import {UpdInfantePageModule} from '../pages/upd-infante/upd-infante.module';
import {AddMedidaPageModule} from '../pages/add-medida/add-medida.module';
import {UpdMedidaPageModule} from '../pages/upd-medida/upd-medida.module';

import { TabsPage } from '../pages/tabs/tabs';
//tools
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { ProvInfanteProvider } from '../providers/prov-infante/prov-infante';
import { ProvVacunaProvider } from '../providers/prov-vacuna/prov-vacuna';
import { ProvAlimentoProvider } from '../providers/prov-alimento/prov-alimento';
import { ProvEstimuProvider } from '../providers/prov-estimu/prov-estimu';
import { ProvMedidaProvider } from '../providers/prov-medida/prov-medida';
import { ProvDesarrolloProvider } from '../providers/prov-desarrollo/prov-desarrollo';
import { ProvEventoProvider } from '../providers/prov-evento/prov-evento';


@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    InfantePageModule,
    CalendarPageModule,
    EventoPageModule,
    InfoPageModule,
    AddInfantePageModule,
    UpdInfantePageModule,
    AddMedidaPageModule,
    UpdMedidaPageModule,
    MedidaPageModule,
    VacunasPageModule,
    AlimentacionPageModule,
    TooltipsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    DatePicker,
    ProvInfanteProvider,
    ProvVacunaProvider,
    ProvAlimentoProvider,
    ProvEstimuProvider,
    ProvMedidaProvider,
    ProvDesarrolloProvider,
    ProvEventoProvider
  ]
})
export class AppModule {}
