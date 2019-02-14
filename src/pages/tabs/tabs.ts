import { Component } from '@angular/core';

import { InfantePage } from '../infante/infante';
import { CalendarPage } from '../calendar/calendar';
import { InfoPage } from '../info/info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InfantePage;
  tab2Root = CalendarPage;
  tab3Root = InfoPage;

  constructor() {

  }
}
