import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Customers } from './types/customer';

@Component({
  selector: 'app-customer-list',
  template: `
    <h1>Liste des clients</h1>
    <button routerLink="/create-customer"> Créer un client </button>
    <ul>
            <li *ngFor="let item of customers">
                <a routerLink="/{{ item.id }}/details">
                    {{ item.fullName }}
                </a>
              <label>
                {{ item.email }}
              </label>
            </li>
        </ul>
    `
})
export class CustomerListComponent {
  @Input()
  customers: Customers = [];

  @Output()
  onToggle = new EventEmitter<number>();

  toggle(id: number) {
    this.onToggle.emit(id);
  }
}
