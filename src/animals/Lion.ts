import { ICanRun } from '../interfaces/ICanRun'
import { ICanTalk } from '../interfaces/ICanTalk'
import { families } from '../app'
import { AnimalCandidate } from '../hierarchy/Animal'
import Mammal from '../hierarchy/Mammal'
import { ICanJump } from '../interfaces/ICanJump'
import AnimalShelter from '../animalShelter/AnimalShelter'
export const NUMBER_OF_BABY_LIONS_BORN = 5
export const LION_SPACE_NEEDED_AS_ADULT = 200
export const LION_SPACE_NEEDED_AS_CHILD = 100
export default class Lion extends Mammal implements ICanRun, ICanTalk, ICanJump {
  private numberOfBabiesBorn = NUMBER_OF_BABY_LIONS_BORN
  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale)
    this._canHaveFamily = true
    this.canClimbTrees = true
    this.canRun = true
    this.canJump = true
  }

  jump(): string {
    return `${this.name} is jumping`
  }
  run(): string {
    return `${this.name} is running`
  }
  talk(): string {
    return `${this.name} is talking`
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return LION_SPACE_NEEDED_AS_ADULT
    } else {
      return LION_SPACE_NEEDED_AS_CHILD
    }
  }
  public giveBirth(): Lion[] {
    const family = families.find((x) => x.name == this.home)
    const candidateLions: AnimalCandidate[] = this.generateBabyProperties(this.numberOfBabiesBorn)
    const babies: Lion[] = []
    candidateLions.forEach((lionObjectInfo) => {
      const babyLion = new Lion(lionObjectInfo.name, 0, lionObjectInfo.isMale)
      family!.addAnimal(babyLion, true)
      if (this.home === 'Animal Shelter') {
        AnimalShelter.getInstance().addAnimal(babyLion, true)
      }
      babies.push(babyLion)
    })
    return babies
  }
}
