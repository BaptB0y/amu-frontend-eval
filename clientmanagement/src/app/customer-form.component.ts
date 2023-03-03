import { Component, EventEmitter, Output } from "@angular/core";
import {FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-customer-form",
  template: `
    <h1>Créer un client</h1>
    <form (ngSubmit)="onSubmit()" [formGroup]="form">
        <input
          formControlName="fullName"
          type="text"
          name="customer-full-name"
          placeholder="Nom complet"
        />
        <input formControlName="fullName"
               type="text"
               name="customer-email"
               placeholder="email" />
        <button>Enregistrer</button>
      </form>
      <a routerLink="/">Retour aux clients</a>
  `
})
export class CustomerFormComponent {
  @Output()
  onNewCustomer = new EventEmitter<string>();

  form = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl()
  });
  onSubmit() {
    this.onNewCustomer.emit(this.form.value.email);
    this.form.setValue({
      fullName: '',
      email:''
    });
  }
}
