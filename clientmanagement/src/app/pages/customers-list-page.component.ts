import {Component, EventEmitter, Input, Output} from "@angular/core";
import { CustomersService } from "../api/customers.service";
import { Customers } from "../types/customer";

@Component({
  selector: "app-customer-list-page",
  template: `


    <div class="container">
      <button routerLink="/create" class="btn btn-info" data-toggle="tooltip" data-placement="top" title="Permet d'ajouter un client"> Créer un client </button>
      <div class="card bg-light">
        <div class="card-heade bg-info"><h1>Liste des clients</h1></div>
        <div class="card-body">
          <div class="card" *ngFor="let item of customers">
            <div class="card-header">
              <a routerLink="{{ item.id }}/" data-toggle="tooltip" data-placement="top" title="Voir plus de détails...">
                {{ item.fullName }}
              </a>
            </div>
            <div class="card-body">
              <blockquote class="blockquote">
                <label>
                  {{ item.email }}
                </label>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>

  `
})
export class CustomerListPageComponent {
  customers: Customers = [];

  constructor(private service: CustomersService) { }

  ngOnInit() {
    this.service
      .findAll()
      .subscribe((customers) => this.customers = customers)
  }
}
