import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statemgmt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statemgmt.component.html',
  styleUrl: './statemgmt.component.css'
})
export class StatemgmtComponent implements OnInit {
  message$: Observable<string>;

  constructor(
    private messageService: MessageService,
    private store: Store
  ) {
    this.message$ = this.store.select(state => state.msg.message);
  }

  ngOnInit(): void {
    this.messageService.loadMessage();
  }
}
