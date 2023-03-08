import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoices } from "../types/invoice";
import {Customers} from "../types/customer";


export const SUPABASE_URL = 'https://wnprumrkcufpgpnwhwor.supabase.co/rest/v1/invoices';
export const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducHJ1bXJrY3VmcGdwbndod29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4NDYxNDYsImV4cCI6MTk5MzQyMjE0Nn0.ejgtl-OE4KEZHq9HCYAcR8RfSfbDbD__YayhFL20-3I";


@Injectable()
export class InvoicesService {

  constructor(private http: HttpClient) { }

  findByCustomerId(id: number): Observable<Invoices> {
    return this.http.get<Invoices>(SUPABASE_URL + '?customer=eq.' + id, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY,
      }
    });
  }

  create(obj:any): Observable<Invoices> {
    return this.http.post<Invoices>(SUPABASE_URL, {
      amount: obj.amount * 100,
      status: obj.status,
      customer:obj.customer
    }, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY,
        Prefer: "return=representation"
      }
    });
  }
}
