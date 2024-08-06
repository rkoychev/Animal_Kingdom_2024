import { ReptileAnimalType } from "../customTypes";
import { ICanSwim } from "../interfaces/ICanSwim";
import { ICanWalk } from "../interfaces/ICanWalk";
import Animal from "../hierarchy/Animal";
import { families } from "../app";
import Reptile from "../hierarchy/Reptile";

export default class Crocodile
  extends Reptile
  implements ICanSwim, ICanWalk
{
  private length: number;
  private type: ReptileAnimalType = "Crocodile";
  constructor(name: string, age: number, isMale: boolean, length: number) {
    super(name, age, isMale);
    if (length <= 0) {
      throw new Error("Length must be greater than zero");
    }
    this.length = length;
  }
  swim() {
    console.log(`${this.name} is swimming`);
  }
  walk() {
    console.log(`${this.name} is walking`);
  }
  giveBirth(): void {
    if (this.isMale) {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
    } else if (this.home === undefined) {
      console.log(
        `${this.name} can't give birth because she doesn't have a home to meet a male`
      );
    } else {
      //Giving birth for reptiles creates 8 reptiles also of random gender, but always at least 2 males and 1 female.
      this.timesGivenBirth += 1;
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const gender: boolean = num === 1;
        const age: number = 0;
        const babyCroc = new Crocodile(name, age, gender, 10);
        families.forEach((fam) => {
          if (fam.name === this.home) {
            fam.addAnimal(babyCroc, true);
          }
        });
      }
      for (let i = 6; i <= 8; i++) {
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const gender: boolean = i % 2 != 0;
        const age: number = 0;
        const babyCroc = new Crocodile(name, age, gender, 10);
        families.forEach((fam) => {
          if (fam.name === this.home) {
            fam.addAnimal(babyCroc, true);
          }
        });
      }
      console.log(`${this.name} lays eggs`);
    }
  }
  getType() {
    return this.type;
  }
}
