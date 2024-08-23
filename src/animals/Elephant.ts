import { ELEPHANT_HEIGHT_NEGATIVE, ELEPHANT_wEIGHT_NEGATIVE } from '../../messages/errorMessages'
import { families } from '../app'
import Animal, { AnimalCandidate } from '../hierarchy/Animal'
import Mammal from '../hierarchy/Mammal'
import { ICanRun } from '../interfaces/ICanRun'
import { ICanTalk } from '../interfaces/ICanTalk'
export const NUMBER_OF_BABY_ELEPHANTS_BORN = 1
export const ELEPHANT_SPACE_NEEDED_AS_ADULT = 200
export const ELEPHANT_SPACE_NEEDED_AS_CHILD = 100

export default class Elephant extends Mammal implements ICanRun, ICanTalk {
  private height: number
  private weight: number
  private numberOfBabiesBorn = NUMBER_OF_BABY_ELEPHANTS_BORN
  constructor(name: string, age: number, isMale: boolean, height: number, weight: number) {
    super(name, age, isMale)
    if (height <= 0) {
      throw Error(ELEPHANT_HEIGHT_NEGATIVE)
    }
    if (weight <= 0) {
      throw Error(ELEPHANT_wEIGHT_NEGATIVE)
    }
    this._canHaveFamily = true
    this.canRun = true
    this.height = height
    this.weight = weight
  }

  run(): string {
    return `${this.name} is running`
  }
  talk(): string {
    return `${this.name} is talking`
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return ELEPHANT_SPACE_NEEDED_AS_ADULT
    } else {
      return ELEPHANT_SPACE_NEEDED_AS_CHILD
    }
  }
  public giveBirth(): Elephant[] {
    const family = families.find((elephant) => elephant.name == this.home)
    const candidateElephants: AnimalCandidate[] = this.generateBabyProperties(this.numberOfBabiesBorn)
    const babies: Elephant[] = []

    candidateElephants?.forEach((elephantObjectInfo) => {
      const babyElephantHeight = this.generateRandomHeight(0.8, 1.2)
      const babyElephantWeight = this.generateRandomWeight(65, 75)
      const babyElphant = new Elephant(
        elephantObjectInfo.name,
        0,
        elephantObjectInfo.isMale,
        babyElephantHeight,
        babyElephantWeight,
      )
      family?.addAnimal(babyElphant, true)
      babies.push(babyElphant)
    })
    return babies
  }
}
