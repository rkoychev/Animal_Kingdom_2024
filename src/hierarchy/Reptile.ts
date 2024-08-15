import { ICanSwim } from "../interfaces/ICanSwim";
import Animal from "./Animal";
import { AnimalCandidate } from "./Animal";

export default abstract class Reptile extends Animal implements ICanSwim {
  swim() {
    return `${this.name} is swimming`;
  }

  public giveBirth(): AnimalCandidate[] | void {
    if (super.giveBirth()) {
  public generateBabyProperties(numberOfChildren: number, numberOfChildrenWithRandomGender: number): AnimalCandidate[] {
    const candidatesforAnimals: AnimalCandidate[] = [];
    if (this.canGiveBirth()) {
      this.timesGivenBirth++;
      const candidatesforAnimals: AnimalCandidate[] = [];
      const numberOfReptileBabies = 8;
      const numberOfReptilelBabiesRandomGender = 5;
      for (let i = 1; i <= numberOfReptileBabies; i++) {
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        let isMale: boolean = true; // default Value
        if (i <= numberOfChildrenWithRandomGender) {
          isMale = Math.random() % 2 == 0 ? false : true;
        } else {
          isMale = i % 2 == 0 ? true : false;
        }
        candidatesforAnimals.push({ name: name, isMale: isMale });
      }
      console.log(`${this.name} lays eggs`);
      return candidatesforAnimals;
    }
  }
}
