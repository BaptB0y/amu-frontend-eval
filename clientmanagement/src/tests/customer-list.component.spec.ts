import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";
import {CustomerListPageComponent} from "../app/pages/customers-list-page.component";
import {CustomerFormComponent} from "../app/form/customer-form.component";
import {CustomersService} from "../app/api/customers.service";
import {CustomerCreatePageComponent} from "../app/pages/customer-create-page.component";
describe("CustomerListPageComponent", () => {
  let fixture: ComponentFixture<CustomerListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomerListPageComponent,
        CustomerCreatePageComponent
      ],
      providers: [CustomersService],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListPageComponent);
  });

  it('should call CustomersService and display returned customers', () => {
    const service = TestBed.inject(CustomersService);

    const findAllSpy = spyOn(service, "findAll");

    findAllSpy.and.returnValue(of([
      {id: 1, fullName: "MOCK_TASK_1", email: "MOCK_TASK_1_EMAIL"}
    ]));

    fixture.detectChanges();
    expect(findAllSpy).toHaveBeenCalled();
    expect(fixture.debugElement.queryAll(By.css('.card-header')).length).toBe(1);
  });

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
  });
});
