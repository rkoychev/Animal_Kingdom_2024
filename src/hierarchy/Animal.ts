import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
} from '../../messages/errorMessages'
import AnimalFamily from '../animalFamily/AnimalFamily'
import { families } from '../app'
import { ICanWalk } from '../interfaces/ICanWalk'
export type AnimalCandidate = {
  name: string
  isMale: boolean
}

export const AGE_TO_BE_ADULT = 2
export default abstract class Animal implements ICanWalk {
  protected isAdult: boolean
  protected name: string
  protected age: number
  protected isMale: boolean
  protected home?: string
  protected timesGivenBirth: number
  protected _canHaveFamily: boolean = false
  public canClimbTrees = false
  public canJump = false
  public canRun = false
  constructor(name: string, age: number, isMale: boolean) {
    if (age < 0) {
      throw new Error(NEGATIVE_AGE_ERROR_MESSAGE)
    }
    if (name === '') {
      throw new Error(EMPTY_NAME_ERROR_MESSAGE)
    }
    this.name = name
    this.isMale = isMale
    this.age = age
    if (age >= AGE_TO_BE_ADULT) {
      this.isAdult = true
    } else {
      this.isAdult = false
    }
    this.timesGivenBirth = 0
  }
  public abstract getSpaceNeeded(): number

  walk(): string {
    return `${this.name} is walking`
  }

  showHome(): string {
    if (this.home === undefined) {
      return `${this.name} doesn't have a home yet`
    } else {
      return `${this.name} lives in ${this.home}`
    }
  }
  getName(): string {
    return this.name
  }

  getAge(): number {
    return this.age
  }
  getIsMale(): boolean {
    return this.isMale
  }
  getIsAdult(): boolean {
    return this.isAdult
  }
  private setAge(newAge: number): void {
    if (newAge >= AGE_TO_BE_ADULT) {
      this.isAdult = true
    }
    this.age = newAge
  }
  getHome(): string | undefined {
    return this.home
  }
  setHome(home: string | undefined): void {
    this.home = home
  }
  canHaveFamily(): boolean {
    return this._canHaveFamily
  }
  public abstract giveBirth(): Animal[]

  protected canGiveBirth(): boolean {
    if (this.isMale) {
      throw new Error(TELLING_MALE_TO_GIVE_BIRTH)
    } else if (this.home === undefined) {
      throw new Error(GIVING_BIRTH_WITHOUT_HOME)
    }
    return true
  }
  public grow(): void {
    this.setAge(this.age + 1)
  }
  public switchFamily(newFamily: AnimalFamily): boolean {
    if (!this._canHaveFamily) {
      return false
    }
    if (this.home === undefined) {
      return false
    }
    const currentFamily = families.find((family) => family.name === this.home)
    const canRemoveFromFamily = currentFamily?.checkCanRemoveAnimal(this)
    if (canRemoveFromFamily?.length !== 0) {
      return false
    } else {
      const canAddToNewFamily = newFamily.checkCanAddAnimal(this)
      if (canAddToNewFamily.length !== 0) {
        return false
      }
      currentFamily?.removeAnimal(this)
      newFamily.addAnimal(this)
      return true
    }
  }
}
