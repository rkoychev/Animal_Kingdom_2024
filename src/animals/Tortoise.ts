import { ReptileAnimalType } from "../customTypes";
import { tortoises } from "../app";
import Reptile from "../hierarchy/Reptile";

export default class Tortoise
  extends Reptile
{
  private type: ReptileAnimalType = "Tortoise";

  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);

    this.home = "Animal Kingdom";
    tortoises.push(this);
  }
  
  giveBirth(): void {
    if (this.isMale) {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
    } else {
      this.timesGivenBirth += 1;
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const isMale: boolean = num === 1;
        const age: number = 0;
        new Tortoise(name, age, isMale);
      }
      for (let i = 6; i <= 8; i++) {
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const isMale: boolean = i % 2 != 0;
        const age: number = 0;
        new Tortoise(name, age, isMale);
      }
      console.log(`${this.name} lays eggs`);
    }
  }
  getType() {
    return this.type;
  }
}
