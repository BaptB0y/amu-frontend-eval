import {Component, EventEmitter, Input, Output} from "@angular/core";
import { CustomersService } from "../api/customers.service";
import { Customers } from "../types/customer";

@Component({
  selector: "app-customer-list-page",
  styleUrls: ['../../button.css'],
  template: `
    <div class="container">
      <button class="custom-btn creation" routerLink="/create" data-placement="top" title="Permet d'ajouter un client"><span>Créer un client</span><i></i></button>
      <div class="card bg-light">
        <div class="card-header"><h1>Liste des clients</h1></div>
        <div class="card-body">
          <app-search (searchTextChanged)="onSearch($event)"></app-search>
          <div class="card" *ngFor="let item of customers">
            <div *ngIf="searchText === '' || item.email.toLowerCase().includes(searchText) || item.fullName.toLowerCase().includes(searchText) || item.email.includes(searchText) || item.fullName.includes(searchText) ">
              <div class="card-header header2">
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
    </div>

  `
})
export class CustomerListPageComponent {
  customers: Customers = [];

  searchText:string ='';

  constructor(private service: CustomersService) { }

  ngOnInit() {
    this.service
      .findAll()
      .subscribe((customers) => this.customers = customers)
  }

  onSearch(searchValue: string){
    this.searchText = searchValue;
  }
}
