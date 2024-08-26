import AnimalShelter from '../animalShelter/AnimalShelter'
import { tortoises } from '../app'
import { AnimalCandidate } from '../hierarchy/Animal'
import Reptile from '../hierarchy/Reptile'
export const TOIRTOISE_SPACE_NEEDED_AS_ADULT = 300
export const TOIRTOISE_SPACE_NEEDED_AS_CHILD = 150
export default class Tortoise extends Reptile {
  constructor(name: string, age: number, isMale: boolean) {
    super(name, age, isMale)

    this.home = 'Animal Kingdom'
    this.canClimbTrees = true
    tortoises.push(this)
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return TOIRTOISE_SPACE_NEEDED_AS_ADULT
    } else {
      return TOIRTOISE_SPACE_NEEDED_AS_CHILD
    }
  }
  public giveBirth(): Tortoise[] {
    const candidateTortoises: AnimalCandidate[] = this.generateBabyProperties()
    const babies: Tortoise[] = []
    candidateTortoises?.forEach((tortoiseObjectInfo) => {
      const babyTortoise = new Tortoise(tortoiseObjectInfo.name, 0, tortoiseObjectInfo.isMale)
      babyTortoise.home = this.home
      if (this.home === 'Animal Shelter') {
        AnimalShelter.getInstance().addAnimal(babyTortoise, true)
      }
      babies.push(babyTortoise)
    })
    return babies
  }
}
