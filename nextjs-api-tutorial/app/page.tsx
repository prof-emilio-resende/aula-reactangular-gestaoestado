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
