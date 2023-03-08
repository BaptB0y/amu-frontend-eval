import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customers } from "../types/customer";
export const SUPABASE_URL = 'https://wnprumrkcufpgpnwhwor.supabase.co/rest/v1/customers';
export const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducHJ1bXJrY3VmcGdwbndod29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4NDYxNDYsImV4cCI6MTk5MzQyMjE0Nn0.ejgtl-OE4KEZHq9HCYAcR8RfSfbDbD__YayhFL20-3I";


@Injectable()
export class CustomersService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Customers> {
    return this.http.get<Customers>(SUPABASE_URL, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY
      }
    });
  }

  findOne(id: number): Observable<Customers> {
    return this.http.get<Customers>(SUPABASE_URL + '?id=eq.' + id, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY,
        Prefer: "return=representation"
      }
    });
  }

  create(obj:any): Observable<Customers> {
    return this.http.post<Customers>(SUPABASE_URL, {
      fullName: obj.fullName,
      email: obj.email
    }, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY,
        Prefer: "return=representation"
      }
    });
  }
}
