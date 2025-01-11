import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { SetMessage } from '../state/message.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient, private store: Store) {}

  fetchMessage(): Observable<any> {
    return this.http.get('http://localhost:4000/api/data');
  }

  loadMessage(): void {
    this.fetchMessage().subscribe((data: any) => {
      this.store.dispatch(new SetMessage(data.message));
    });
  }
}