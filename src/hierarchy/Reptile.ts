import { ICanSwim } from '../interfaces/ICanSwim'
import Animal from './Animal'
import { AnimalCandidate } from './Animal'
export const MALES_AT_BIRTH = 2
export const FEMALES_AT_BIRTH = 1
export default abstract class Reptile extends Animal implements ICanSwim {
  swim() {
    return `${this.name} is swimming`
  }
  static NUMBER_OF_BABY_REPTILES_BORN = 8
  public generateBabyProperties(): AnimalCandidate[] {
    const candidatesforAnimals: AnimalCandidate[] = []
    if (this.canGiveBirth()) {
      this.timesGivenBirth++
      for (let i = 1; i <= Reptile.NUMBER_OF_BABY_REPTILES_BORN; i++) {
        const name: string = this.name + '-Baby-' + this.timesGivenBirth + '-' + i
        let isMale: boolean
        if (i <= MALES_AT_BIRTH) {
          isMale = true
        } else if (i <= MALES_AT_BIRTH + FEMALES_AT_BIRTH) {
          isMale = false
        } else {
          isMale = Math.random() % 2 == 0 ? false : true
        }
        candidatesforAnimals.push({ name: name, isMale: isMale })
      }
    }
    return candidatesforAnimals
  }
}
