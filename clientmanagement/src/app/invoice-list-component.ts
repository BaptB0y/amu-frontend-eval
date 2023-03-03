import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Invoices } from './types/invoice';

@Component({
  selector: 'app-invoices-list',
  template: `
    <ul>
        <li *ngFor="let item of invoices">
          <label>
              {{ item.amount }} {{ item.status }}
          </label>
        </li>
    </ul>
    <button>Créer une facture</button>
    `
})
export class InvoicesListComponent {
  @Input()
  invoices: Invoices = [];
}
