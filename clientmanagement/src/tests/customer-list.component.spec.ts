import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import {CustomerListPageComponent} from "../app/pages/customers-list-page.component";
import {CustomersService} from "../app/api/customers.service";
import {CustomerFormComponent} from "../app/form/customer-form.component";

describe("CustomerComponent", () => {
  let list_fixture: ComponentFixture<CustomerListPageComponent>;
  let form_fixture: ComponentFixture<CustomerFormComponent>;
  let form_component: CustomerFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerListPageComponent,
        CustomerFormComponent
      ],
      providers: [CustomersService],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
    }).compileComponents();

    list_fixture = TestBed.createComponent(CustomerListPageComponent);
    form_fixture = TestBed.createComponent(CustomerFormComponent);
    form_component = form_fixture.componentInstance;
  });

  it('should call CustomersService and display returned customers', () => {
    const service = TestBed.inject(CustomersService);

    const findAllSpy = spyOn(service, "findAll");

    findAllSpy.and.returnValue(of([
      {id: 1, fullName: "MOCK_CUSTOMER_1", email: "MOCK_CUSTOMER_1_EMAIL"}
    ]));

    list_fixture.detectChanges();
    expect(findAllSpy).toHaveBeenCalled();
    expect(list_fixture.debugElement.queryAll(By.css('.card-header')).length-1).toBe(1);
  });


  it('should call CustomersService, and create a customer', () => {
    const form = form_component.form;
    const submitButton = form_fixture.debugElement.query(By.css('#save'));
    const submitSpy = spyOn(form_component.onNewCustomer, 'emit');
    form.setValue({fullName:'Test Test', email:'test@test.com' });
    form_fixture.detectChanges();
    expect(form.valid).toBeTruthy();

    submitButton.nativeElement.click();

    expect(submitSpy).toHaveBeenCalled();

    let emitted = submitSpy.calls.mostRecent().args[0];
    expect(emitted.fullName).toBe('Test Test');
    expect(emitted.email).toBe('test@test.com');
  });
});
