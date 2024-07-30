import { Animal } from "../customTypes";
import { SnakeType } from "../customTypes";
import {
  animalShelterMammalsLimit,
  animalShelterReptilesLimit,
  crocodilePacks,
  lionFamilies,
} from "../constVariables";
import Crocodile from "../specificAnimalClasses/CrocodileClass";
import Lion from "../specificAnimalClasses/LionClass";

export default class AnimalShelter {
  private static instance: AnimalShelter;
  mammalLimit: number = animalShelterMammalsLimit;
  reptileLimit: number = animalShelterReptilesLimit;
  private lions = 0;
  private crocodiles = 0;
  private snakes = 0;
  private squirrels = 0;
  private tortoise = 0;
  private animals: Animal[] = [];

  private constructor() {}

  static getInstance() {
    if (!AnimalShelter.instance) {
      AnimalShelter.instance = new AnimalShelter();
    }
    return AnimalShelter.instance;
  }

  private get mammalsNumber() {
    return this.lions + this.squirrels;
  }

  private get reptileNumbers() {
    return this.snakes + this.crocodiles + this.tortoise;
  }
  showAnimals() {
    console.log(this.animals);
    console.log(`lions: ${this.lions}`);
    console.log(`crocodiles: ${this.crocodiles}`);
    console.log(`snakes: ${this.snakes}`);
    console.log(`tortoise: ${this.tortoise}`);
  }

  addAnimal(animal: Animal): void {
    if (animal.getGroup() === "Mammal") {
      if (this.mammalsNumber >= this.mammalLimit) {
        console.log(
          "Sorry, there is no space for another mammal in the Animal Shelter!"
        );
        return;
      }

      if (animal.getType() === "Lion") {
        if (animal.getHome() !== undefined) {
          const family = lionFamilies.find(
            (pack) => pack.name === animal.getHome()
          );
          family?.removeLion(animal as Lion);
          animal.setHome(undefined);
        }
        this.lions++;
      } else if (animal.getType() === "Squirrel") {
        this.squirrels++;
      }
      this.animals.push(animal);
      animal.setHome("Animal Shelter");
      console.log(`${animal.getName()} has been added to the Animal Shelter`);
    } else if (animal.getGroup() === "Reptile") {
      if (this.reptileNumbers >= this.reptileLimit) {
        console.log(
          "Sorry, there is no space for another reptile in the Animal Shelter!"
        );
        return;
      }
      if (animal.getType() === "Crocodile") {
        if (animal.getHome() !== undefined) {
          const pack = crocodilePacks.find(
            (pack) => pack.name === animal.getHome()
          );
          pack?.removeCrocodile(animal as Crocodile);
          animal.setHome(undefined);
        }
        this.crocodiles++;
      } else if (animal.getType() === "Tortoise") {
        this.tortoise++;
      } else if (["Anaconda", "Cobra", "Python"].includes(animal.getType())) {
        this.snakes++;
      }
      this.animals.push(animal);
      animal.setHome("Animal Shelter");
      console.log(`${animal.getName()} has been added to the Animal Shelter`);
    }
  }
}
