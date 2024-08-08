import { ICanSwim } from "../interfaces/ICanSwim";
import Animal from "./Animal";
import { AnimalCandidate } from "./Animal";

export default abstract class Reptile extends Animal implements ICanSwim {

  swim() {
    console.log(`${this.name} is swiming`);
  }

  public giveBirth(): AnimalCandidate[] | void{
    if (!super.giveBirth()) {
      this.timesGivenBirth++;
      const candidatesforAnimals: AnimalCandidate[] = []
      const numberOfReptileBabies = 8;
      const numberOfReptilelBabiesRandomGender = 5;
      for (let i = 1; i <= numberOfReptileBabies; i++) {

        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        let isMale: boolean = true; // default Value
        if (i <= numberOfReptilelBabiesRandomGender) {
          isMale = Math.random() % 2 == 0 ? false : true;
        } else {
          isMale = i % 2 == 0 ? true : false;
        }
        candidatesforAnimals.push({ name: name, age: 0, isMale: isMale, home: this.home });
      }
      console.log(`${this.name} lays eggs`);
      return candidatesforAnimals;
    }
  };
}
