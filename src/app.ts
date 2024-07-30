import CrocodilesPack from "./animalPacksClasses/CrocodilesPackClass";
import LionFamily from "./animalPacksClasses/LionsPackClass";
import { crocodilePacks, snakes, squirrels, tortoises } from "./constVariables";
import { Gender } from "./customTypes";
import AnimalShelter from "./singletonClasses/AnimalShelterClass";
import Crocodile from "./specificAnimalClasses/CrocodileClass";
import Lion from "./specificAnimalClasses/LionClass";
import Snake from "./specificAnimalClasses/SnakeClass";
import Squirrel from "./specificAnimalClasses/SquirrelClass";
import Tortoise from "./specificAnimalClasses/TortoiseClass";

console.log("Starting");

console.log("\n--- Lion Section ---");
const lion1 = new Lion("Simba", 5, "Male");
try {
  const invalidAgeLion = new Lion("Simba", -5, "Male");
} catch (error: any) {
  console.error(error.message);
}
try {
  const invalidLionFamily = new LionFamily("Pride Rock", [
    new Lion("Simba", 5, "Male"),
    new Lion("Mufasa", 6, "Male"),
    new Lion("Nala", 4, "Female"),
    new Lion("Sarabi", 6, "Female"),
  ]);
} catch (error: any) {
  console.error(error.message);
}
try {
  
  const lionData = [
    { name: "Nala", age: 4, gender: "Female" },
    { name: "Sarabi", age: 6, gender: "Female" },
    { name: "Kiara", age: 2, gender: "Female" },
    { name: "Kion", age: 3, gender: "Male" },
    { name: "Vitani", age: 3, gender: "Female" },
    { name: "Zira", age: 5, gender: "Female" },
    { name: "Kovu", age: 4, gender: "Male" },
    { name: "Rani", age: 2, gender: "Female" },
  ];
  const lions: Lion[] = lionData.map(
    (data) => new Lion(data.name, data.age, data.gender as Gender)
  );
  const lionFamily = new LionFamily("Pride Rock", lions);
} catch (error: any) {
  console.error(error.message);
}
const lionData = [
  { name: "Nala", age: 4, gender: "Female" },
  { name: "Sarabi", age: 6, gender: "Female" },
  { name: "Kiara", age: 2, gender: "Female" },
  { name: "Kion", age: 1, gender: "Male" },
  { name: "Vitani", age: 3, gender: "Female" },
  { name: "Zira", age: 5, gender: "Female" },
  { name: "Kovu", age: 4, gender: "Female" },
  { name: "Rani", age: 2, gender: "Female" },
];
const lions: Lion[] = lionData.map(
  (data) => new Lion(data.name, data.age, data.gender as Gender)
);
const lionFamily = new LionFamily("Pride Rock", lions);
try {
  
  const lionData = [
    { name: "Nala", age: 4, gender: "Female" },
    { name: "Sarabi", age: 6, gender: "Female" },
    { name: "Kiara", age: 2, gender: "Female" },
    { name: "Kion", age: 3, gender: "Male" },
    { name: "Vitani", age: 3, gender: "Female" },
    { name: "Zira", age: 5, gender: "Female" },
    { name: "Kovu", age: 4, gender: "Male" },
    { name: "Rani", age: 2, gender: "Female" },
  ];
  const lions: Lion[] = lionData.map(
    (data) => new Lion(data.name, data.age, data.gender as Gender)
  );
  const lionFamily = new LionFamily("Pride Rock", lions);
} catch (error: any) {
  console.error(error.message);
}
lion1.walk();
lion1.talk();
lion1.run();
lion1.jump();
lion1.giveBirth();
lion1.showHome();

lionFamily.addLion(lion1);
console.log(lionFamily);

console.log("\n--- Squirrel Section ---");
const squirrel1 = new Squirrel("Chip", 2, "Female", "Oak", 50, 20);
const squirrel2 = new Squirrel("Dale", 3, "Male", "Maple", 60, 25);

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
const crocodile1 = new Crocodile("Croco", 10, "Female", 23);
const crocodile2 = new Crocodile("Snapper", 5, "Male", 22);
const crocodile3 = new Crocodile("Crocodile3", 10, "Female", 22);
try {
  const crocodilePack = new CrocodilesPack("Swamp Squad", [
    crocodile1,
    crocodile2,
  ]);
} catch (error: any) {
  console.error(error.message);
}

const crocodilePack = new CrocodilesPack("Swamp Squad", [
  crocodile1,
  crocodile2,
  crocodile3,
]);
crocodile1.walk();
crocodile1.swim();
crocodile1.giveBirth();
crocodile1.showHome();
crocodilePack.crocodiles[1].swim();
crocodilePack.crocodiles[0].giveBirth();
console.log(crocodilePack);

console.log("\n--- Snake Section ---");
const snake1 = new Snake("Slither", 4, "Anaconda", "Female", "Green", 33);
snake1.swim();
snake1.walk();
snake1.giveBirth();
snake1.showHome();
console.log(snakes);

console.log("\n--- Tortoise Section ---");
const tortoise1 = new Tortoise("Shelly", 100, "Female");
tortoise1.walk();
tortoise1.swim();
tortoise1.giveBirth();
tortoise1.showHome();
console.log(tortoises);

console.log("\n--- Animal Shelter Section ---");
const lion2 = new Lion("Maximus", 3, "Female");
try {
  const snake2=new Snake("Ssss",3,"Anaconda","Female","Red",-1)
} catch (error: any) {
  console.error(error.message);
}
const snake2=new Snake("Ssss",3,"Anaconda","Female","Red",33)
const animalShelter = AnimalShelter.getInstance();
console.log(crocodilePacks[0].crocodiles);
animalShelter.addAnimal(snake2);
animalShelter.addAnimal(lion2);
animalShelter.addAnimal(lion1);
lionFamily.addLion(new Lion("Lion2",3,"Male"));
animalShelter.addAnimal(squirrel1);
animalShelter.addAnimal(crocodile1);
animalShelter.addAnimal(snake1);
animalShelter.addAnimal(tortoise1);
animalShelter.showAnimals();
console.log(crocodilePacks);
