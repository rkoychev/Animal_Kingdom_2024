import { ICanSwim } from '../interfaces/ICanSwim'
import Animal from './Animal'
import { AnimalCandidate } from './Animal'
export const REPTILE_MALES_AT_BIRTH = 2
export const REPTILE_FEMALES_AT_BIRTH = 1
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
        if (i <= REPTILE_MALES_AT_BIRTH) {
          isMale = true
        } else if (i <= REPTILE_MALES_AT_BIRTH + REPTILE_FEMALES_AT_BIRTH) {
          isMale = false
        } else {
          //if some things are changed that work with the random function the tests also need to be updated
          isMale = Math.floor(Math.random() * 100) % 2 === 0 ? false : true
        }
        candidatesforAnimals.push({ name: name, isMale: isMale })
      }
    }
    return candidatesforAnimals
  }
}
