import AnimalShelter from './animalShelter/AnimalShelter'
import Snake from './animals/Snake'
import Squirrel from './animals/Squirrel'
import Tortoise from './animals/Tortoise'
import AnimalFamily from './animalFamily/AnimalFamily'

export const families: AnimalFamily[] = []
export const squirrels: Squirrel[] = []
export const snakes: Snake[] = []
export const tortoises: Tortoise[] = []
/* 
/*console.log("Starting");

console.log("\n--- Lion Section ---");
const lion1 = new Lion("Simba", 5, true);

try {
  const invalidAgeLion = new Lion("Simba", -5, true);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

try {
  const invalidAniAnimalFamily = new AnimalFamily("Pride Rock", [
    new Lion("Simba", 5, true),
    new Lion("Mufasa", 6, false),
    new Lion("Nala", 4, false),
    new Lion("Sarabi", 6, false),
  ]);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

try {
  const lionData = [
    { name: "Nala", age: 4, isMale: false },
    { name: "Sarabi", age: 6, isMale: false },
    { name: "Kiara", age: 2, isMale: false },
    { name: "Kion", age: 3, isMale: true },
    { name: "Vitani", age: 3, isMale: false },
    { name: "Zira", age: 5, isMale: false },
    { name: "Kovu", age: 4, isMale: true },
    { name: "Rani", age: 2, isMale: false },
  ];
  const lions: Lion[] = lionData.map(
    (data) => new Lion(data.name, data.age, data.isMale)
  );
  const lionsFamily = new AnimalFamily("Pride Rock", lions);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

const lionData = [
  { name: "Nala", age: 4, isMale: false },
  { name: "Sarabi", age: 6, isMale: false },
  { name: "Kiara", age: 2, isMale: true },
  { name: "Kion", age: 1, isMale: true },
  { name: "Vitani", age: 3, isMale: false },
  { name: "Zira", age: 5, isMale: false },
  { name: "Kovu", age: 4, isMale: false },
  { name: "Rani", age: 2, isMale: false },
];
const lions: Lion[] = lionData.map(
  (data) => new Lion(data.name, data.age, data.isMale)
);
const lionsFamily2 = new AnimalFamily("Pride Rock", lions);

try {
  const lionData = [
    { name: "Nala", age: 4, isMale: false },
    { name: "Sarabi", age: 6, isMale: false },
    { name: "Kiara", age: 2, isMale: true },
    { name: "Kion", age: 3, isMale: false },
    { name: "Vitani", age: 3, isMale: false },
    { name: "Zira", age: 5, isMale: false },
    { name: "Kovu", age: 4, isMale: true },
    { name: "Rani", age: 2, isMale: false },
  ];
  const lions: Lion[] = lionData.map(
    (data) => new Lion(data.name, data.age, data.isMale)
  );
  const lionsFamily = new AnimalFamily("Pride Rock", lions);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

(<Lion>lionsFamily2.animals[2]).giveBirth();
console.log(lionsFamily2.animals[2]);
lion1.walk();
lion1.talk();
lion1.run();
lion1.jump();
lion1.giveBirth();
lion1.showHome();
console.log(lionsFamily2);
lionsFamily2.addAnimal(lion1);
console.log(lionsFamily2);

console.log("\n--- Squirrel Section ---");
const squirrel1 = new Squirrel("Chip", 2, false, "Oak", 50, 20);
const squirrel2 = new Squirrel("Dale", 3, true, "Maple", 60, 25);

squirrel1.walk();
squirrel1.jump();
squirrel1.addNuts(15);
squirrel1.addNuts(-3);
squirrel1.addNuts(10);
squirrel1.giveBirth();
squirrel1.showHome();
squirrel2.giveBirth();
console.log(squirrels);

console.log("\n--- Crocodile Section ---");
try {
  const crocodile51 = new Crocodile("Croco", 10, false, -23);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
const crocodile1 = new Crocodile("Croco", 10, false, 23);
const crocodile2 = new Crocodile("Snapper", 5, true, 22);
const crocodile3 = new Crocodile("Crocodile3", 10, false, 22);

try {
  const crocodilePack = new AnimalFamily("Swamp Squad", [
    crocodile1,
    crocodile2,
  ]);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

const crocodilePack = new AnimalFamily("Swamp Squad", [
  crocodile1,
  crocodile2,
  crocodile3,
]);

try {
  crocodilePack.addAnimal(lion1);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

const c = crocodilePack.animals[0];

crocodile1.walk();
crocodile1.swim();
crocodile1.giveBirth();
crocodile1.showHome();
crocodilePack.animals[1];
(<Crocodile>crocodilePack.animals[0]).giveBirth();
console.log(crocodilePack);

console.log("\n--- Snake Section ---");
const snake1 = new Snake("Slither", 4, "Anaconda", false, "Green", 33);
snake1.swim();
snake1.walk();
snake1.giveBirth();
snake1.showHome();
console.log(snakes);

console.log("\n--- Tortoise Section ---");
const tortoise1 = new Tortoise("Shelly", 100, false);
tortoise1.walk();
tortoise1.swim();
tortoise1.giveBirth();
tortoise1.showHome();
console.log(tortoises);

console.log("\n--- Animal Shelter Section ---");
const lion2 = new Lion("Maximus", 3, false);

try {
  const squirrel6 = new Squirrel("asd", 2, true, "Cedar", 3, 5);
  const fam5 = new AnimalFamily("sqsqsq", [squirrel6]);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

try {
  const snake2 = new Snake("Ssss", 3, "Anaconda", false, "Red", -1);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

try {
  const snake2 = new Snake("d", 3, "Anaconda", false, "Red", 3);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

const snake2 = new Snake("Ssss", 3, "Anaconda", false, "Red", 33);
const animalShelter = AnimalShelter.getInstance();
animalShelter.addAnimal(snake2);
animalShelter.addAnimal(lion2);
animalShelter.addAnimal(lion1);
lionsFamily2.addAnimal(new Lion("Lion2", 3, true));
animalShelter.addAnimal(squirrel1);
animalShelter.addAnimal(crocodile1);
animalShelter.addAnimal(snake1);
animalShelter.addAnimal(tortoise1);
animalShelter.showAnimals();
animalShelter.setMammalLimit(1);
animalShelter.setMammalLimit(3);
animalShelter.addAnimal(lionsFamily2.animals[2]);
animalShelter.setReptileLimit(12);
console.log(animalShelter.getMammalLimit(), animalShelter.getReptileLimit());
animalShelter.setMammalLimit(-3);
animalShelter.setReptileLimit(0);

const el1 = new Elephant("s", 2, true, 5, 350);
const el2 = new Elephant("a", 2, true, 5, 350);
const el3 = new Elephant("d", 2, false, 5, 350);
const el4 = new Elephant("w", 2, false, 5, 350);

const elephantHerd = new AnimalFamily("Long Horns", [el1, el2, el3, el4]);
el3.giveBirth();
try {
  const el5 = new Elephant("d", 3, false, -10, 3);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

try {
  const el5 = new Elephant("d", 3, false, 3, -20);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
try {
  el2.giveBirth();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
try {
  const giraffe1 = new Giraffe("high in the sky", 4, false, -5);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

const giraffe1 = new Giraffe("high in the sky", 4, false, 5);

try {
  giraffe1.giveBirth();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
try {
  const giraffesFamily = new AnimalFamily("Long Necks", [giraffe1]);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}


giraffe1.giveBirth();

try {
  const giraffesFamily = new AnimalFamily("Long Necks", [giraffe1, crocodile1]);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

animalShelter.report(); */
