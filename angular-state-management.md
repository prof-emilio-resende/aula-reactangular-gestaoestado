# 2. Instalando NGXS e Signal
Antes de começar a trabalhar com NGXS e Signals, instale as dependências necessárias:


```bash
npm install @ngxs/store @ngxs/devtools-plugin
npm install @angular/core@next
```

Isso instalará a versão mais recente do Angular (19) e as dependências do NGXS.

#4. Criando o Store com NGXS
O NGXS é um estado global para Angular. Agora vamos criar um estado para armazenar a mensagem da nossa API.

Crie um arquivo para o estado no diretório src/app/state:

```bash
mkdir src/app/state
touch src/app/state/message.state.ts
```

```typescript
// src/app/state/message.state.ts
import { State, Action, StateContext } from '@ngxs/store';

// A interface para o estado
export interface MessageStateModel {
  message: string;
}

// O estado inicial
const defaults: MessageStateModel = {
  message: ''
};

// A ação que irá alterar o estado
export class SetMessage {
  static readonly type = '[Message] Set';
  constructor(public message: string) {}
}

@State<MessageStateModel>({
  name: 'msg',
  defaults
})
@Injectable()
export class MessageState {
  @Action(SetMessage)
  setMessage(ctx: StateContext<MessageStateModel>, action: SetMessage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      message: action.message
    });
  }
}
```

# 5. Configurando o Store no AppModule
Agora, configure o NGXS Store no arquivo app.module.ts:

```typescript
// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxsModule, withNgxsDevelopmentOptions } from '@ngxs/store';
import { MessageState } from './state/message.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideHttpClient(withFetch()),
    importProvidersFrom(
      NgxsModule.forRoot([MessageState])
    )
  ]
};
``` 

# 6. Criando o Serviço para Consumir a API

```bash
ng generate service services/message
```

```typescript
// src/app/services/message.service.ts
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
```	

# 7. Consumindo a API no Componente

```typescript
// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from './services/message.service';
import { MessageState } from './state/message.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{ message$ | async }}</h1>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
```

# 8. Testando a Aplicação

```bash
ng serve
```

Abra o navegador e acesse http://localhost:4200. Você verá a mensagem da API exibida na página.
