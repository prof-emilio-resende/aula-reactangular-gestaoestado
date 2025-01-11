// 1. Tipagem Estática
let userName: string = "John";
let age: number = 30;

// 2. Interfaces
interface User {
  name: string;
  age: number;
}
const user: User = { name: "Alice", age: 25 };

// 3. Tipos Personalizados (Type Aliases)
type ID = string | number;
let userId: ID = 12345;

// 4. Enums
enum Status {
  Active,
  Inactive,
  Pending,
}
let currentStatus: Status = Status.Active;

// 5. Union Types
function printId(id: string | number): void {
  console.log(id);
}

// 6. Intersection Types
type Person = { name: string };
type Employee = Person & { role: string };
const emp: Employee = { name: "Bob", role: "Developer" };

// 7. Classes e Modificadores de Acesso
class PersonClass {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

// 8. Herança
class Animal {
  move() {
    console.log("Moving...");
  }
}
class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

// 9. Funções com Tipagem
function sum(a: number, b: number): number {
  return a + b;
}

// 10. Tipos Genéricos
function identity<T>(value: T): T {
  return value;
}
console.log(identity<string>("Hello"));

// 11. Nullable Types
let userNullable: string | null = null;

// 12. Readonly e Optional Properties
interface Car {
  readonly brand: string;
  model?: string;
}
const car: Car = { brand: "Toyota" };

// 13. Tuplas
let tuple: [string, number] = ["Alice", 30];

// 14. Type Assertions
let value: any = "Hello";
let strLength: number = (value as string).length;

// 15. Decorators
function Log(target: any, key: string) {
  console.log(`${key} was called`);
}
class Example {
  @Log
  greet() {
    console.log("Hello");
  }
}

// 16. Namespaces e Módulos
namespace Utils {
  export function greet(name: string) {
    console.log(`Hello, ${name}`);
  }
}
Utils.greet("Alice");

// 17. Async/Await com Tipagem
async function fetchData(): Promise<string> {
  return "Data fetched";
}

// 18. Mapped Types
type Readonly<T> = { readonly [P in keyof T]: T[P] };

// 19. Conditional Types
type IsString<T> = T extends string ? true : false;
let result: IsString<number>; // false

// 20. Controle Estrito com `strict`
// tsconfig.json
// {
//   "compilerOptions": {
//     "strict": true
//   }
// }
