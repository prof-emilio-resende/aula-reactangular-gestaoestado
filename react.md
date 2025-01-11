# Tutorial: Criando uma API com Next.js 15 e Consumindo-a

Este é um tutorial simples para criar uma API com Next.js 15, expô-la e consumi-la no frontend.

## 1. Criação do Projeto Next.js

Primeiro, crie um novo projeto Next.js:

```bash
npx create-next-app@latest nextjs-api-tutorial
cd nextjs-api-tutorial
```

## 2. Criando a API
O Next.js permite criar APIs facilmente usando arquivos dentro da pasta pages/api. Crie um arquivo para a sua API:

```bash
mkdir pages/api
touch pages/api/hello.ts
```
```typescript
// pages/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, World!' });
}
```

# 3. Consumindo a API no Frontend

Para consumir a API, você pode usar a função fetch diretamente em qualquer componente React.

Abra o arquivo pages/index.js e modifique-o para consumir a API que acabamos de criar:
```typescript
// pages/index.tsx
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fazendo a requisição para a API
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>{message ? message : 'Carregando...'}</h1>
    </div>
  );
}

# 4. Executando o Projeto

```bash
    npm run dev
```

Agora, abra o navegador e acesse http://localhost:3000. Você verá a mensagem "Hello, World!" exibida na página.

# 5. Renderizando no servidor

```typescript
// pages/index.tsx
export default async function Home() {
  let msg = "";
  const response = await fetch("http://localhost:3000/api/hello");
  const data = await response.json();
  msg = data.message;
  
  console.log(msg);

  return (
    <div>
      <h1>{msg ? msg : "Carregando..."}</h1>
    </div>
  );
}

```
```bash
    npm run dev
```

Agora, abra o navegador e acesse http://localhost:3000. Você verá a mensagem "Hello, World!" exibida na página (sem chamada de API no browser)
