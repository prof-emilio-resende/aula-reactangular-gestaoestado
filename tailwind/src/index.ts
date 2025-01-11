const app = document.getElementById("app");

if (app) {
  const message = document.createElement("p");
  message.className = "text-lg text-gray-700 mt-4";
  message.innerText = "This is a message rendered using TypeScript!";
  app.appendChild(message);
}