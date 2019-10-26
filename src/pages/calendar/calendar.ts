import { Component,Output, EventEmitter,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { dateObj, Evento } from '../../models/interfaces/ifEvento'
import {EventoPage} from '../evento/evento'
import * as moment from 'moment';
import * as _ from "lodash";
import { ProvEventoProvider } from '../../providers/prov-evento/prov-evento';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})

export class CalendarPage {

  @Output() onDaySelect = new EventEmitter<dateObj>();

      currentYear: number;

      currentMonth: number;

      currentDate: number;

      currentDay: number;

      displayYear: number;

      displayMonth: number;

      dateArray: Array<dateObj> = []; // 本月展示的所有天的数组

      weekArray = [];// 保存日历每行的数组

      lastSelect: number = 0; // 记录上次点击的位置

      fechasE : Evento[];//todos los eventos del usuario logueado
      eventMes : Evento[];//los eventos correspondientes al mes
      // weekHead: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      weekHead: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


      constructor(public svEvento: ProvEventoProvider,public modalCtrl: ModalController) {
          this.currentYear = moment().year();
          this.currentMonth = moment().month();
          this.currentDate = moment().date();
          this.currentDay = moment().day();

      }

      verMes(intMes:number){
        var strMes:string;
        switch(intMes){
          case 1:{
            strMes ="Enero";
            break;
          }
          case 2:{
            strMes ="Febrero";
            break;
          }
          case 3:{
            strMes ="Marzo";
            break;
          }
          case 4:{
            strMes ="Abril";
            break;
          }
          case 5:{
            strMes ="Mayo";
            break;
          }
          case 6:{
            strMes ="Junio";
            break;
          }
          case 7:{
            strMes ="Julio";
            break;
          }
          case 8:{
            strMes ="Agosto";
            break;
          }
          case 9:{
            strMes ="Septiembre";
            break;
          }
          case 10:{
            strMes ="Octubre";
            break;
          }
          case 11:{
            strMes ="Noviembre";
            break;
          }
          case 12:{
            strMes ="Diciembre";
            break;
          }
        }
        return strMes;
      }

      eventosxMes(month, year){
        this.eventMes = [];
        for (var ev of this.fechasE) {
           var fecha = ev.fecha.split("-");
           if((month+1) == fecha[1] && year == fecha[2] ){
             var objFecha = {
                 fecha: ev.fecha,
                 descripcion : ev.descripcion,
                 evento : ev.evento
               } as Evento;
               this.eventMes.push(objFecha);
           }
        }
      }

      ngOnInit() {

        this.svEvento.getAllEvents().then((res:any)=>{
          this.fechasE = [];
          this.fechasE = res.objeve as Evento[];
          this.today();
        });

      }

      today() {
          this.displayYear = this.currentYear;
          this.displayMonth = this.currentMonth;
          this.createMonth(this.currentYear, this.currentMonth);

          let todayIndex = _.findIndex(this.dateArray, {
              year: this.currentYear,
              month: this.currentMonth,
              date: this.currentDate,
              isThisMonth: true
          })
          this.lastSelect = todayIndex;
          this.dateArray[todayIndex].isSelect = false;

          this.onDaySelect.emit(this.dateArray[todayIndex]);
      }


      createMonth(year: number, month: number) {
          this.eventosxMes(month,year);
          this.dateArray = [];
          this.weekArray = [];
          let firstDay;
          let preMonthDays;
          let monthDays;
          let weekDays: Array<dateObj> = [];

          firstDay = moment({ year: year, month: month, date: 1 }).day();
          if (month === 0) {
              preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
          } else {
              preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
          }
          monthDays = moment({ year: year, month: month }).daysInMonth();

          if (firstDay !== 7) { //星期日不用显示上个月
              let lastMonthStart = preMonthDays - firstDay + 1;// 从上个月几号开始
              for (let i = 0; i < firstDay; i++) {
                  if (month === 0) {
                    var dia = lastMonthStart + i;
                    var esevento = this.esevento(dia);
                      var fecha = {
                          year: year,
                          month: 11,
                          date: lastMonthStart + i,
                          isThisMonth: false,
                          isToday: false,
                          isSelect: false,
                          isEvent: esevento,
                      };
                      this.dateArray.push(fecha);
                  } else {
                    var mes =month -1+1;
                    var dia = lastMonthStart + i;
                    var esevento = this.esevento(dia);
                    var fecha ={
                        year: year,
                        month: month - 1,
                        date: lastMonthStart + i,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                        isEvent: esevento,
                    };
                    this.dateArray.push(fecha);
                  }

              }
          }

          for (let i = 0; i < monthDays; i++) {
            var mes =month+1;
            var dia = i + 1;
            var esevento = this.esevento(dia);
            var fecha = {
                year: year,
                month: month,
                date: i + 1,
                isThisMonth: true,
                isToday: false,
                isSelect: false,
                isEvent: esevento,
            };
            this.dateArray.push(fecha);          }

          if (this.currentYear === year && this.currentMonth === month) {
              let todayIndex = _.findIndex(this.dateArray, {
                  year: this.currentYear,
                  month: this.currentMonth,
                  date: this.currentDate,
                  isThisMonth: true
              })
              this.dateArray[todayIndex].isToday = true;
          }

          if (this.dateArray.length % 7 !== 0) {
              let nextMonthAdd = 7 - this.dateArray.length % 7
              for (let i = 0; i < nextMonthAdd; i++) {
                  if (month === 11) {
                    var mes =1;
                    var dia = i + 1;
                    var esevento = this.esevento(dia);
                    var fecha = {
                        year: year,
                        month: 0,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                        isEvent: esevento,
                    };
                      this.dateArray.push(fecha);
                  } else {
                    var mes =month+1+1;
                    var dia = i + 1;
                    var esevento = this.esevento(dia);
                    var fecha ={
                        year: year,
                        month: month + 1,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                        isEvent: esevento,
                    };
                      this.dateArray.push(fecha);
                      this.onDaySelect.emit(fecha);
                  }

              }
          }

          for (let i = 0; i < this.dateArray.length / 7; i++) {
              for (let j = 0; j < 7; j++) {
                  weekDays.push(this.dateArray[i * 7 + j]);
              }
              this.weekArray.push(weekDays);
              weekDays = [];
          }
      }

      back() {
          if (this.displayMonth === 0) {
              this.displayYear--;
              this.displayMonth = 11;
          } else {
              this.displayMonth--;
          }
          this.createMonth(this.displayYear, this.displayMonth);
      }

      forward() {
          if (this.displayMonth === 11) {
              this.displayYear++;
              this.displayMonth = 0;
          } else {
              this.displayMonth++;
          }
          this.createMonth(this.displayYear, this.displayMonth);
      }

      esevento(dia){
        var isevent:boolean = false;
        for (var ev of this.eventMes) {
          var fecha = ev.fecha.split("-");
           if(fecha[0] == dia  ){
              isevent = true;
              break;
           }
        }
        return isevent;
      }

      daySelect(day, i, j) {
          this.dateArray[this.lastSelect].isSelect = false;
          this.lastSelect = i * 7 + j;
          this.dateArray[i * 7 + j].isSelect = true;
          this.onDaySelect.emit(day);
          var mes = day.month+1;
          var strKeyE = day.date+"-"+mes+"-"+day.year;
          this.svEvento.getEvento(strKeyE).then((res:any)=>{
            var event = res.objeve as Evento;
            if(event.evento!=''){
               day.isEvent = true;
            }
            let profileModal = this.modalCtrl.create(EventoPage,{esEvento:day.isEvent,objEve:event});
            profileModal.onDidDismiss(()=>{
              this.svEvento.getAllEvents().then((res:any)=>{
                this.fechasE = [];
                this.fechasE = res.objeve as Evento[];
                this.createMonth(this.displayYear, this.displayMonth);
              });

            });
            profileModal.present();
          });
      }
  }
