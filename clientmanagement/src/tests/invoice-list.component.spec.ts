import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import {CustomerDetailsPageComponent} from "../app/pages/customer-details-page.component";
import {CustomersService} from "../app/api/customers.service";
import {InvoicesService} from "../app/api/invoices.service";
import {InvoiceFormComponent} from "../app/form/invoice-form.component";


describe("InvoiceListComponent", () => {
  let fixture1: ComponentFixture<CustomerDetailsPageComponent>;
  let form_fixture: ComponentFixture<InvoiceFormComponent>;
  let form_component: InvoiceFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerDetailsPageComponent,
        InvoiceFormComponent
      ],
      providers: [InvoicesService, CustomersService],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
    }).compileComponents();

    fixture1 = TestBed.createComponent(CustomerDetailsPageComponent);
    form_fixture = TestBed.createComponent(InvoiceFormComponent);
    form_component = form_fixture.componentInstance;
  });

  it('should call InvoicesService and display returned invoices', () => {
    const service = TestBed.inject(InvoicesService);

    const findAllSpy = spyOn(service, "findByCustomerId");
    findAllSpy.and.returnValue(of([
      {id: 1, amount: 16000, status: "SENT", customer:1}
    ]));

    fixture1.detectChanges();
    expect(findAllSpy).toHaveBeenCalled();
    expect(fixture1.debugElement.queryAll(By.css('#item')).length).toBe(1);
  });

  it('should call InvoicesService, and display created customer', () => {
    const submitSpy = spyOn(form_component.onNewInvoice, 'emit');
    const saveButton = form_fixture.debugElement.query(By.css("#save"))
    const form =  form_component.form

    form.setValue({amount:10000, status: "SENT"})
    form_fixture.detectChanges();
    saveButton.nativeElement.click();

    expect(submitSpy).toHaveBeenCalled()
  });
});
