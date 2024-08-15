import AnimalFamily from "../animalFamily/AnimalFamily";
import { families } from "../app";
import { ICanWalk } from "../interfaces/ICanWalk";
export type AnimalCandidate = {
  name: string;
  isMale: boolean;
};

const AGE_TO_BE_ADULT = 2;
export default abstract class Animal implements ICanWalk {
  protected isAdult: boolean;
  protected name: string;
  protected age: number;
  protected isMale: boolean;
  protected home?: string;
  protected timesGivenBirth: number;
  protected _canHaveFamily: boolean = false;
  public _canClimbTrees = false;
  constructor(name: string, age: number, isMale: boolean) {
    if (age < 0) {
      throw new Error("Age cannot be negative");
    }
    if (name === "") {
      throw new Error("Name cannot be empty");
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

  walk(): void {
    console.log(`${this.name} is walking`);
  }

  showHome(): void {
    if (this.home === undefined) {
      console.log(`${this.name} doesn't have a home yet`);
    } else {
      console.log(`${this.name} lives in ${this.home}`);
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
      console.error(
        `Only Females can give birth and ${this.name} is a proud male ${this.constructor.name}`
      );
      return false;
    } else if (this.home === undefined) {
      console.error(
        `${this.name} can't give birth because she doesn't have a home to meet a male`
      );
      return false;
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
