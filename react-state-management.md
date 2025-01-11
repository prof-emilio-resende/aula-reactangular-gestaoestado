# 1. Criando o Contexto para Gerenciar o Estado Global
Crie um arquivo para o contexto que gerenciará o estado global de nossa aplicação.

```bash
mkdir context
touch context/MessageContext.js
```

```typescript
// context/MessageContext.js
import { createContext, useContext, useState } from 'react';

// Criando o contexto
const MessageContext = createContext();

// Provedor do contexto
export function MessageProvider({ children }) {
  const [message, setMessage] = useState('');

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

// Hook para acessar o contexto
export function useMessage() {
  return useContext(MessageContext);
}	
```

# 2. Consumindo a API e Usando o Contexto
Agora, no arquivo pages/index.js, vamos consumir a API e atualizar o estado global usando o contexto que criamos.

```typescript
// pages/index.js
import { useEffect } from 'react';
import { useMessage } from '../context/MessageContext';

export default function Home() {
  const { message, setMessage } = useMessage();

  useEffect(() => {
    // Fazendo a requisição para a API
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, [setMessage]);

  return (
    <div>
      <h1>{message ? message : 'Carregando...'}</h1>
    </div>
  );
}
```
	
# 3. Envolvendo a Aplicação com o Provider

```typescript
// pages/_app.js
import { MessageProvider } from '../context/MessageContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <MessageProvider>
      <Component {...pageProps} />
    </MessageProvider>
  );
}
```

# 4. Testando a Aplicação
```bash
npm run dev
```

Abra o navegador e acesse http://localhost:3000. Você verá a mensagem "Hello, World!" exibida na página.
