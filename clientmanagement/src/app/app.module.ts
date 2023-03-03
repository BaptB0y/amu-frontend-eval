import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {InvoicesService} from "./api/invoices.service";
import {CustomersService} from "./api/customers.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CustomerListPageComponent } from "./pages/customers-list-page.component";
import {CustomerFormComponent} from "./customer-form.component";
import {CustomerListComponent} from "./customer-list-component";
import { RouterModule, Routes } from '@angular/router';
import {CustomerDetailsPageComponent} from "./pages/customer-details-page.component";
import {CustomerCreatePageComponent} from "./pages/customer-create-page.component";
import {InvoicesListComponent} from "./invoice-list-component";

const routes: Routes = [
  // La page d'accueil affichera la liste des clients
  { path: '', component: CustomerListPageComponent },
  // Ici on utilise une URL paramétrée
  { path: ':id/details', component: CustomerDetailsPageComponent },
  { path: 'create', component: CustomerCreatePageComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    CustomerListPageComponent,
    CustomerCreatePageComponent,
    CustomerFormComponent,
    CustomerListComponent,
    InvoicesListComponent,
    CustomerDetailsPageComponent
  ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes)
    ],
  providers: [
    CustomersService,
    InvoicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
