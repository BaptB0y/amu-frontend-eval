import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import {CustomerDetailsPageComponent} from "../app/pages/customer-details-page.component";
import {InvoiceCreatePageComponent} from "../app/pages/invoice-create-page.component";
import {CustomersService} from "../app/api/customers.service";
import {InvoicesService} from "../app/api/invoices.service";
import {InvoiceFormComponent} from "../app/form/invoice-form.component";
import any = jasmine.any;


describe("InvoiceListComponent", () => {
  let fixture1: ComponentFixture<CustomerDetailsPageComponent>;
  let fixture2: ComponentFixture<InvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerDetailsPageComponent,
        InvoiceCreatePageComponent,
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
    fixture2 = TestBed.createComponent(InvoiceFormComponent);
  });

  it('should call InvoicesService and display returned invoices', () => {
    const service = TestBed.inject(InvoicesService);

    const findAllSpy = spyOn(service, "findByCustomerId");

    findAllSpy.and.returnValue(of([
      {id: 1, amount: 16000, status: "SENT", customer:1}
    ]));

    fixture1.detectChanges();
    expect(findAllSpy).toHaveBeenCalled();
    expect(fixture1.debugElement.queryAll(By.css('tr')).length).toBe(2);
  });

  it('should call InvoicesService on an invoice creation', () => {
    const service = TestBed.inject(InvoicesService);

    const findAllSpy = spyOn(service, "findByCustomerId");

    findAllSpy.and.returnValue(of([
      {id: 1, amount: 16000, status: "SENT", customer:1}
    ]));

    const toggleSpy = spyOn(service, "create");
    toggleSpy.and.returnValue(of([]));
    fixture2.detectChanges();

    const obj:any = [
      1, 0, 'SENT'
    ];
    const submitButton = fixture2.debugElement.query(By.css('#save'));
    submitButton.triggerEventHandler('click', {});
    expect(toggleSpy).toHaveBeenCalledWith(obj);
  });
});
