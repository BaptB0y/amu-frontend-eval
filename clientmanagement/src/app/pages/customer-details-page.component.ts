import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CustomersService } from "../api/customers.service";
import { Customer } from "../types/customer";
import {Invoices} from "../types/invoice";
import {InvoicesService} from "../api/invoices.service";

@Component({
  selector: 'app-customer-details-page',
  styleUrls: ['../../button.css'],
  template: `

    <div class="container2">
      <button class="custom-btn return" routerLink="/">Retour aux clients</button>
      <div class="card bg-light">
        <div class="card-header">
          <ng-container *ngIf="customer">
            <h2>Fiche de {{ customer.fullName }}</h2>
            <h3>({{ customer.email }})</h3>
            <br/>
          </ng-container>
        </div>
        <div class="card-body bg-light">
          <ng-container *ngIf="invoices">
            <table class="table table-striped" style="text-align: left;">
              <thead class="thead-dark">
              <tr>
                <th scope="col">Montant (€)</th>
                <th scope="col">Status</th>
              </tr>
              </thead>
              <tbody>
              <tr id="item" *ngFor="let item of invoices">
                <th scope="row">{{ item.amount / 100 }} €</th>
                <td *ngIf="item.status === 'SENT'">Envoyée</td>
                <td *ngIf="item.status === 'PAID'">Payée</td>
              </tr>
              </tbody>
            </table>
          </ng-container>
        </div>
      </div>
      <div style="text-align: right">
        <button *ngIf="customer" class="custom-btn creation" routerLink="/{{customer.id}}/invoices/add">Créer une facture</button>
      </div>
    </div>


    <div class="container2" style="margin-top: 20px;">
      <p *ngIf="!customer">Le client n'est pas créé</p>
    </div>

  `
})
export class CustomerDetailsPageComponent {
  customer?: Customer;
  invoices: Invoices = [];

  constructor(private route: ActivatedRoute,  private customersService: CustomersService, private invoicesService: InvoicesService) { }
  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.invoicesService
      .findByCustomerId(id)
      .subscribe((invoices) => this.invoices = invoices);

    this.customersService
      .findOne(id)
      .subscribe(customers => this.customer = customers[0]);
  }
}
