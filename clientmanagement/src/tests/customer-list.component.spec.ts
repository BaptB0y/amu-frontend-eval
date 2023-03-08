import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import {CustomerListPageComponent} from "../app/pages/customers-list-page.component";
import {CustomersService} from "../app/api/customers.service";
import {CustomerCreatePageComponent} from "../app/pages/customer-create-page.component";
import {CustomerFormComponent} from "../app/form/customer-form.component";
describe("CustomerListPageComponent", () => {
  let fixture1: ComponentFixture<CustomerListPageComponent>;
  let fixture2: ComponentFixture<CustomerCreatePageComponent>;
  let fixture3: ComponentFixture<CustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerListPageComponent,
        CustomerCreatePageComponent,
        CustomerFormComponent
      ],
      providers: [CustomersService],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
    }).compileComponents();

    fixture1 = TestBed.createComponent(CustomerListPageComponent);
    fixture2 = TestBed.createComponent(CustomerCreatePageComponent);
    fixture3 = TestBed.createComponent(CustomerFormComponent);

  });

  it('should call CustomersService and display returned customers', () => {
    const service = TestBed.inject(CustomersService);

    const findAllSpy = spyOn(service, "findAll");

    findAllSpy.and.returnValue(of([
      {id: 1, fullName: "MOCK_CUSTOMER_1", email: "MOCK_CUSTOMER_1_EMAIL"}
    ]));

    fixture1.detectChanges();
    expect(findAllSpy).toHaveBeenCalled();
    expect(fixture1.debugElement.queryAll(By.css('.card-header')).length-1).toBe(1);
  });


  it('should call CustomsService on a creation', () => {
    const service = TestBed.inject(CustomersService);
    const component = fixture3.componentInstance;
    const createSpy = spyOn(service, "create");
    createSpy.and.returnValue(of([]));
    fixture2.detectChanges();

    const submitButton = fixture3.debugElement.query(By.css('#save')).nativeElement;
    submitButton.click();
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
  it('should be created', () => {
    const service = TestBed.inject(CustomersService);
    expect(service).toBeTruthy();
  });
});
