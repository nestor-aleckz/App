import { Component, Input } from '@angular/core';

/**
 * Generated class for the ComponentHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'component-header',
  templateUrl: 'component-header.html'
})

export class ComponentHeaderComponent {
  @Input('textToRead') text;

  constructor() {
 
  }

}
