import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>('http://localhost:4000/api/data');
  }
}
