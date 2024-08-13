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
  getCanHaveFamily(): boolean {
    return this._canHaveFamily;
  }
  public giveBirth(): AnimalCandidate[] | void | boolean {
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
}
