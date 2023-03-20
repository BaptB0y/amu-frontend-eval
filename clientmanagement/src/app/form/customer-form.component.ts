import { Component, EventEmitter, Output } from "@angular/core";
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: "app-customer-form",
  styleUrls: ['../../button.css',   '../../validators.css'],
  template: `
    <div class="container2">
      <button class="custom-btn return" routerLink="/">Retour aux clients</button>
      <div class="card text-white bg-info">
        <div class="card-header"><h1>Créer un client</h1></div>
        <div class="card-body bg-light">
          <form class="form-group"  style="text-align: right; margin-top: 35px;" (ngSubmit)="onSubmit($event)" [formGroup]="form">
            <input
              class="form-control"
              formControlName="fullName"
              type="text"
              name="fullName"
              required minlength="1"
              placeholder="Nom complet"
              [ngClass]="{'form-submitted': formSubmitted}"
            />
            <input formControlName="email"
                   class="form-control"
                   type="text"
                   name="email"
                   placeholder="email"
                   [ngClass]="{'form-submitted': formSubmitted}"
            />
            <button class="custom-btn creation" id="save" [class.spinner]="loading" [disabled]="loading">
              <span *ngIf="loading"> </span>
              <span *ngIf="!loading"> Enregistrer </span>
            </button>
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
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  formSubmitted = false;
  loading = false;

  onSubmit(event:any) {
    console.log('Test');
    event.preventDefault();
    if (this.form.valid) {
      this.onNewCustomer.emit( {fullName: this.form.value.fullName, email:this.form.value.email});
      this.formSubmitted = true;
      this.form.setValue({
        fullName: 'En cours d\'envoi...',
        email:'En cours d\'envoi...'
      });
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['/']);
        // And any other code that should run only after 5s
      }, 1000);
    }
  }
}
