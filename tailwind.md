# Guia Rápido: Criando um Projeto TypeScript com Tailwind CSS

## 1. Criação do Projeto TypeScript

1. Inicialize um novo projeto:
   ```bash
   mkdir ts-tailwind-project
   cd ts-tailwind-project
   npm init -y
   ```

2. Instale o TypeScript e configure:
   ```bash
   npm install typescript --save-dev
   npx tsc --init
   ```
   Isso cria o arquivo `tsconfig.json`. Certifique-se de que ele inclua as seguintes configurações:
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "strict": true,
       "outDir": "./dist",
       "esModuleInterop": true
     },
     "include": ["src/**/*"]
   }
   ```

3. Crie a estrutura de pastas:
   ```bash
   mkdir src
   touch src/index.ts
   ```

---

## 2. Instale o Tailwind CSS

1. Instale o Tailwind e ferramentas relacionadas:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

2. Configure o arquivo `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ["./src/**/*.{html,ts}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

---

## 3. Configure o CSS

1. Crie um arquivo de entrada CSS:
   ```bash
   mkdir src/styles
   touch src/styles/tailwind.css
   ```

2. Adicione as diretivas do Tailwind no arquivo `src/styles/tailwind.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. Configure o `postcss.config.js` para processar o Tailwind:
   ```bash
   touch postcss.config.js
   ```
   No arquivo, adicione:
   ```javascript
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

---

## 4. Configurar o HTML

Crie um arquivo HTML básico para testar:
```bash
touch src/index.html
```

No arquivo, adicione:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TypeScript + Tailwind</title>
  <link rel="stylesheet" href="./styles/tailwind.css">
</head>
<body class="bg-gray-100 text-center">
  <h1 class="text-4xl font-bold text-blue-600">Hello, TypeScript + Tailwind!</h1>
  <div id="app"></div>
  <script src="./index.js" type="module"></script>
</body>
</html>
```

---

## 5. Escrevendo TypeScript

No `src/index.ts`, adicione:
```typescript
const app = document.getElementById("app");

if (app) {
  const message = document.createElement("p");
  message.className = "text-lg text-gray-700 mt-4";
  message.innerText = "This is a message rendered using TypeScript!";
  app.appendChild(message);
}
```

---

## 6. Compilação e Execução

1. Modifique o `package.json` para adicionar os scripts de compilação e execução:
   ```json
   "scripts": {
     "build-win": "tsc && xcopy .\\src\\index.html .\\dist\\ /y && tailwindcss -i ./src/styles/tailwind.css -o ./dist/styles/tailwind.css",
     "build-unix": "tsc && cp src/index.html dist/index.html && tailwindcss -i ./src/styles/tailwind.css -o ./dist/styles/tailwind.css",
     "serve": "npx http-server ./dist"
   }
   ```
---

Agora você tem um projeto TypeScript integrado com Tailwind CSS funcionando! 🎉
