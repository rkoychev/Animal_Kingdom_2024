import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
} from "../../messages/errorMessages";
import AnimalFamily from "../animalFamily/AnimalFamily";
import { families } from "../app";
import { ICanWalk } from "../interfaces/ICanWalk";
export type AnimalCandidate = {
  name: string;
  isMale: boolean;
};

export const AGE_TO_BE_ADULT = 2;
export default abstract class Animal implements ICanWalk {
  protected isAdult: boolean;
  protected name: string;
  protected age: number;
  protected isMale: boolean;
  protected home?: string;
  protected timesGivenBirth: number;
  protected _canHaveFamily: boolean = false;
  constructor(name: string, age: number, isMale: boolean) {
    if (age < 0) {
      throw new Error(NEGATIVE_AGE_ERROR_MESSAGE);
    }
    if (name === "") {
      throw new Error(EMPTY_NAME_ERROR_MESSAGE);
    }
    this.name = name;
    this.isMale = isMale;
    this.age = age;
    if (age >= AGE_TO_BE_ADULT) {
      this.isAdult = true;
    } else {
      this.isAdult = false;
    }
    this.timesGivenBirth = 0;
  }

  walk(): string {
    return `${this.name} is walking`;
  }

  showHome(): string {
    if (this.home === undefined) {
      return `${this.name} doesn't have a home yet`;
    } else {
      return `${this.name} lives in ${this.home}`;
    }
  }
  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }
  getIsMale(): boolean {
    return this.isMale;
  }
  getIsAdult(): boolean {
    return this.isAdult;
  }

  getHome(): string | undefined {
    return this.home;
  }
  setHome(home: string | undefined): void {
    this.home = home;
  }
  canHaveFamily(): boolean {
    return this._canHaveFamily;
  }
  public abstract giveBirth(): void;

  protected canGiveBirth(): boolean {
    if (this.isMale) {
      throw new Error(TELLING_MALE_TO_GIVE_BIRTH);
    } else if (this.home === undefined) {
      throw new Error(GIVING_BIRTH_WITHOUT_HOME);
    }
    return true;
  }
  public switchFamily(newFamily: AnimalFamily): void {
    if (!this._canHaveFamily) {
      console.log(
        `${this.name} can't switch family because ${this.constructor.name}s don't live in families`
      );
      return;
    }
    if (this.home === undefined) {
      `${this.name} can't switch family because it is not part of a family`;
      return;
    }
    const currentFamily = families.find((family) => family.name === this.home);
    const canRemoveFromFamily = currentFamily?.checkCanRemoveAnimal(this);
    if (canRemoveFromFamily !== "") {
      console.log(canRemoveFromFamily);
      return;
    } else {
      const canAddToNewFamily = newFamily.checkCanAddAnimal(this);
      if (canAddToNewFamily !== "") {
        console.log(canAddToNewFamily);
        return;
      }
      currentFamily?.removeAnimal(this);
      newFamily.addAnimal(this);
      console.log("Family switch completed");
    }
  }
}
