import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
import { families } from "../app";
import Mammal from "../hierarchy/Mammal";
export default class Lion extends Mammal implements ICanRun, ICanTalk {
  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale);
    this.canHaveFamily = true;
  }

  run(): void {
    console.log(`${this.name} is running`);
  }
  talk(): void {
    console.log(`${this.name} is talking`);
  }
  giveBirth(): void {
    if (this.isMale) {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.constructor.name}`
      );
    } else if (this.home === undefined) {
      console.log(
        `${this.name} can't give birth because she doesn't have a home to meet a male`
      );
    } else {
      this.timesGivenBirth += 1;
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const gender: boolean = num === 1;
        const age: number = 0;
        const babyLion = new Lion(name, age, gender);
        families.forEach((family) => {
          if (family.name === this.home) {
            family.addAnimal(babyLion, true);
          }
        });
      }
      console.log(`${this.name} gives birth`);
    }
  }
}
