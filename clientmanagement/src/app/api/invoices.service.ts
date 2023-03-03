// src/app/api/tasks.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoices } from "../types/invoice";
import {Customers} from "../types/customer";

// Commençons par factoriser sur 2 constantes les URLs et
// clé d'API de SUPABASE histoire de ne pas avoir à les
// répéter pour chaque appel à l'API :
export const SUPABASE_URL = 'https://wnprumrkcufpgpnwhwor.supabase.co/rest/v1/invoices';
export const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducHJ1bXJrY3VmcGdwbndod29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4NDYxNDYsImV4cCI6MTk5MzQyMjE0Nn0.ejgtl-OE4KEZHq9HCYAcR8RfSfbDbD__YayhFL20-3I";

// Nous créons un service, c'est un objet que l'on pourra utiliser
// au sein de nos composants ou même dans d'autres services ! Afin de ne pas avoir à instancier
// nous même ce service lorsqu'on en aura besoin, on peut s'appuyer sur Angular pour l'instancier
// pour nous à la demande : Merci Angular DI (Dependency Injection) System !
// Pour indiquer à Angular qu'il devra se charger de l'instanciation de cette classe, on utilise le
// décorateur @Injectable() :
@Injectable()
export class InvoicesService {

  /**
   * Dans ce service, nous allons envoyer des requêtes HTTP, nous demanderons donc
   * au système d'injection de dépendances d'Angular de nous injecter une instance du HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * Récupère l'ensemble des lignes de l'API et retourne un tableau de tâches
   */
  findAll(): Observable<Invoices> {
    return this.http.get<Invoices>(SUPABASE_URL, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY
      }
    });
  }


  /**
   * Met à jour le statut d'une tâche et retourne la tâche mise à jour (dans un tableau contenant une tâche)
   */
  toggleDone(id: number, isDone: boolean): Observable<Invoices> {
    return this.http.patch<Invoices>(SUPABASE_URL + '?id=eq.' + id, {
      done: isDone
    }, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY,
        Prefer: "return=representation"
      }
    });
  }


  findByCustomerId(id: number): Observable<Invoices> {
    return this.http.get<Invoices>(SUPABASE_URL + '?customer=eq.' + id, {
      headers: {
        "Content-Type": "application/json",
        apiKey: SUPABASE_API_KEY,
      }
    });
  }


  /**
   * Créé une tâche auprès de l'API qui nous retournera un tableau contenant la tâche
   * nouvellement créée
   */
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
