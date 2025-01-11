# Tutorial: Projeto Angular 19 com SSR e Endpoint HTTP Simples

Este tutorial mostrará como criar um projeto Angular 19 que:

1. Expõe um endpoint HTTP no servidor.
2. Consome o endpoint no lado do cliente usando Server-Side Rendering (SSR).

---

## 1. Criação do Projeto Angular

1. Crie o projeto Angular:
   ```bash
   npx @angular/cli@19 new angular-ssr-project --style=css --routing=true
   cd angular-ssr-project
   ```

2. Adicione suporte a SSR:
   ```bash
   ng add @nguniversal/common
   ```
   Isso configura automaticamente o Angular Universal e cria os arquivos necessários para SSR.

---

## 2. Configurando o Endpoint HTTP

1. Abra o arquivo `src/server.ts` e adicione um endpoint HTTP:
   ```typescript
   // ...

   // Endpoint HTTP
   app.get('/api/data', (req, res) => {
     res.json({ message: 'Hello from the server!' });
   });

   // ...
   ```

---

## 3. Consumo do Endpoint no Cliente

1. Gere um serviço para consumir o endpoint:
   ```bash
   ng generate service services/data
   ```

2. Atualize o serviço `src/app/services/data.service.ts`:
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';

   @Injectable({
     providedIn: 'root',
   })
   export class DataService {
     constructor(private http: HttpClient) {}

     getData(): Observable<{ message: string }> {
       return this.http.get<{ message: string }>('/api/data');
     }
   }
   ```

3. Atualize o componente `src/app/app.component.ts` para exibir os dados:
   ```typescript
   import { Component, OnInit } from '@angular/core';
   import { DataService } from './services/data.service';

   @Component({
     selector: 'app-root',
     template: `
       <h1>Angular 19 SSR</h1>
       <p>{{ data?.message }}</p>
     `,
     providers: [DataService],
     styles: [],
   })
   export class AppComponent implements OnInit {
     data: { message: string } | null = null;

     constructor(private dataService: DataService) {}

     ngOnInit(): void {
       this.dataService.getData().subscribe((res) => (this.data = res));
     }
   }
   ```
4. Atualize o arquivo `src/app/app.config.ts` e insira a importação do `provideHttpClient`:
  ```typescript
    // ...
    import { provideHttpClient } from '@angular/common/http';
    // ...
    export const appConfig: ApplicationConfig = {
      providers: [..., provideHttpClient()]
    };
    // ...
  ```
---

## 5. Teste o Projeto

1. Compile o projeto:
   ```bash
   npm run build:ssr
   ```

2. Execute o servidor:
   ```bash
   npm run serve:ssr
   ```

3. Acesse o projeto em [http://localhost:4000](http://localhost:4000). Você verá a mensagem "Hello from the server!" sendo exibida.

---

Agora você tem um projeto Angular 19 que utiliza SSR para consumir e expor endpoints HTTP! 🎉
