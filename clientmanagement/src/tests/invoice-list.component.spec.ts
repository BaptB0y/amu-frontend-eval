import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import {CustomerDetailsPageComponent} from "../app/pages/customer-details-page.component";
import {InvoiceCreatePageComponent} from "../app/pages/invoice-create-page.component";
import {InvoicesService} from "../app/api/invoices.service";
describe("InvoiceListPageComponent", () => {
  let fixture: ComponentFixture<CustomerDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerDetailsPageComponent,
        InvoiceCreatePageComponent
      ],
      providers: [InvoicesService],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsPageComponent);
  });

  it('should call InvoicesService and display returned invoices', () => {
    const service = TestBed.inject(InvoicesService);

    const findAllSpy = spyOn(service, "findAll");

    findAllSpy.and.returnValue(of([
      {id: 1, amount: 16000, status: "SENT", customer:1}
    ]));

    fixture.detectChanges();
    expect(findAllSpy).toHaveBeenCalled();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(2);
  });
/*
  it('should call CustomsService on a creation', () => {
    const service = TestBed.inject(CustomersService);

    const findAllSpy = spyOn(service, "findAll");
    findAllSpy.and.returnValue(of([
      {id: 1, fullName: "MOCK_TASK_1", email: "MOCK_TASK_1_EMAIL"}
    ]));

    const toggleSpy = spyOn(service, "create");
    toggleSpy.and.returnValue(of([]));
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#customerSubmitButton'));
    submitButton.triggerEventHandler('click', {});

    expect(toggleSpy).toHaveBeenCalledWith(2);
  });*/
});
