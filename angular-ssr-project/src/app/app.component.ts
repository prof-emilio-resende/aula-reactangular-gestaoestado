import { Component, makeStateKey, OnInit, TransferState } from '@angular/core';
import { DataService } from './services/data.service';
import { of } from 'rxjs';
import { RouterOutlet } from '@angular/router';

interface LoadData {
  message: string;
}
const MSG_KEY = makeStateKey<LoadData>('data');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data: LoadData | null = null;

  constructor(private dataService: DataService, private tstate: TransferState) {
    console.log('server side or client side');
    this.loadData();
  }
  ngOnInit(): void {
    console.log('server side or client side ngOnInit');
  }

  loadData() {
    this.data = this.tstate.get<LoadData | null>(MSG_KEY, null);
    if (this.data) return of(this.data);

    return this.dataService.getData().subscribe((res) => (this.data = res));
  }
}
