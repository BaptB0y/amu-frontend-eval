import { Component, EventEmitter, Output } from "@angular/core";
import {FormControl, FormGroup } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-customer-form",
  styleUrls: ['../button.css'],
  template: `
    <div class="container2">
      <button class="btn btn-secondary" routerLink="/">Retour aux clients</button>
      <div class="card text-white bg-info">
        <div class="card-header"><h1 >Créer un client</h1></div>
        <div class="card-body bg-light">
          <form class="form-group"  style="text-align: right; margin-top: 35px;" (ngSubmit)="onSubmit()" [formGroup]="form">
            <input
              class="form-control"
              id="fullNameField"
              formControlName="fullName"
              type="text"
              name="fullName"
              placeholder="Nom complet"
            />
            <input formControlName="email"
                   class="form-control"
                   id="emailField"
                   type="text"
                   name="email"
                   placeholder="email" />
            <button class="btn btn-primary" id="customerSubmitButton" [class.spinner]="loading" [disabled]="loading">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>



  `
})
export class CustomerFormComponent {
  constructor(private router: Router) { }

  @Output()
  onNewCustomer = new EventEmitter<any>();
  form = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl()
  });
  loading = false;

  onSubmit() {
    this.onNewCustomer.emit( {fullName: this.form.value.fullName, email:this.form.value.email});
    this.form.setValue({
      fullName: '',
      email:''
    });
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/']);
      // And any other code that should run only after 5s
    }, 1000);
  }
}
