import { Component, EventEmitter, Output } from "@angular/core";
import {FormControl, FormGroup } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-invoice-form",
  styleUrls: ['../../button.css'],
  template: `

    <div class="container2">
      <button class="custom-btn return" routerLink="/">Retour aux clients</button>
      <div class="card text-white bg-info">
        <div class="card-header"><h1>Ajouter une facture</h1></div>
        <div class="card-body bg-light">
          <form class="form-group"  style="text-align: right; margin-top: 35px;" (ngSubmit)="onSubmit()" [formGroup]="form">
            <input
              class="form-control"
              formControlName="amount"
              type="number"
              name="amount"
              placeholder="Montant de la facture"
            />
            <select type="select" class="form-control" [(ngModel)]='ngSelect' formControlName="status" name="status" ngModel>
              <option value="SENT">Envoyée</option>
              <option value="PAID">Payée</option>
            </select>
            <button class="custom-btn creation" id="save" [class.spinner]="loading" [disabled]="loading">
              <span *ngIf="loading"> </span>
              <span *ngIf="!loading"> Enregistrer la facture </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class InvoiceFormComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngSelect = "SENT";

  id: number = Number(this.route.snapshot.paramMap.get('id'));

  @Output()
  onNewInvoice = new EventEmitter<any>();
  form = new FormGroup({
    amount: new FormControl(),
    status:new FormControl()
  });
  loading = false;

  onSubmit() {
    console.log(this.form.value)
    this.onNewInvoice.emit({amount: this.form.value.amount, status:this.form.value.status, customer:this.id});
    this.form.setValue({
      amount: '',
      status: ''
    });
    this.loading = true;
    setTimeout(() => {
      this.router.navigate( ['/'+this.id]);
      // And any other code that should run only after 5s
    }, 1000);

  }
}
