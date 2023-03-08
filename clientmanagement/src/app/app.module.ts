import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {InvoicesService} from "./api/invoices.service";
import {CustomersService} from "./api/customers.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CustomerListPageComponent } from "./pages/customers-list-page.component";
import {CustomerFormComponent} from "./form/customer-form.component";
import { RouterModule, Routes } from '@angular/router';
import {CustomerDetailsPageComponent} from "./pages/customer-details-page.component";
import {CustomerCreatePageComponent} from "./pages/customer-create-page.component";
import {InvoiceFormComponent} from "./form/invoice-form.component";
import {InvoiceCreatePageComponent} from "./pages/invoice-create-page.component";
import {SearchComponent} from "./search/search-component";

const routes: Routes = [
  // La page d'accueil affichera la liste des clients
  { path: '', component: CustomerListPageComponent },
  // Ici on utilise une URL paramétrée
  { path: 'create', component: CustomerCreatePageComponent },
  { path: ':id/invoices/add', component: InvoiceCreatePageComponent },
  { path: ':id', component: CustomerDetailsPageComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    CustomerListPageComponent,
    CustomerCreatePageComponent,
    CustomerFormComponent,
    CustomerDetailsPageComponent,
    InvoiceFormComponent,
    InvoiceCreatePageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    CustomersService,
    InvoicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
