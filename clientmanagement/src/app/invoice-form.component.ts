import { Component, EventEmitter, Output } from "@angular/core";
import {FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-invoice-form",
  template: `
    <h1>Ajouter une facture</h1>
    <form (ngSubmit)="onSubmit()" [formGroup]="form">
      <input
        formControlName="amount"
        type="number"
        name="invoice-amount"
        placeholder="Montant de la facture"
      />
      <select type="select" [(ngModel)]='ngSelect' formControlName="status" name="invoice-status" ngModel>
        <option value="SENT">Envoyée</option>
        <option value="PAID">Payée</option>
      </select>
      <button>Enregistrer la facture</button>
      <button routerLink="/">Retour aux clients</button>

    </form>
  `
})
export class InvoiceFormComponent {
  constructor(private route: ActivatedRoute) { }
  ngSelect = "SENT";

  id: number = Number(this.route.snapshot.paramMap.get('id'));

  @Output()
  onNewInvoice = new EventEmitter<any>();
  form = new FormGroup({
    amount: new FormControl(),
    status:new FormControl()
  });
  onSubmit() {
    console.log(this.form.value)
    this.onNewInvoice.emit({amount: this.form.value.amount, status:this.form.value.status, customer:this.id});
    this.form.setValue({
      amount: '',
      status: ''
    });
  }
}
