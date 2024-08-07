import { ICanSwim } from "../interfaces/ICanSwim";
import Animal from "./Animal";

export default abstract class Reptile extends Animal implements ICanSwim{

    swim() {
        console.log(`${this.name} is swiming`);
      }

      giveBirth(): [string, number, boolean, string][] {
        if (this.isMale) {
          throw Error(
            `Only Females can give birth and ${this.name} is a proud male ${this.constructor.name}`
          );
        } else if (this.home === undefined) {
          throw Error(
            `${this.name} can't give birth because she doesn't have a home to meet a male`
          );
        } else {
          this.timesGivenBirth += 1;
          const candidatesforAnimals: [string, number, boolean, string][] = []
          for (let i = 1; i <= 8; i++) {
    
            const name: string =
              this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
            let isMale: boolean = true; // default Value
            if (i < 6) {
              isMale = Math.random() % 2 == 0 ? false : true;
            } else {
              isMale = i % 2 == 0 ? true : false;
            }
            candidatesforAnimals.push([name, 0, isMale, this.home]);
          }
          console.log(`${this.name} lays eggs`);
          return candidatesforAnimals;
        }
    
      };
}
  