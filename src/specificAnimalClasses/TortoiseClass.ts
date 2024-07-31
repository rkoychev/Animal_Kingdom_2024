import {
  AgeBracket,
  Gender,
  Group,
  MammalAnimalType,
  ReptileAnimalType,
} from "../customTypes";
import Reptile from "../interfaces/IReptile";
import { ICanSwim } from "../interfaces/ICanSwim";
import { ICanWalk } from "../interfaces/ICanWalk";
import { ageToBeConsideredAdult, tortoises } from "../constVariables";
import { checkAge, checkNameNotEmpty } from "../verificationFunction/inputCheck";

export default class Tortoise implements ICanSwim, ICanWalk, Reptile {
  private name: string;
  private age: number;
  private gender: Gender;
  private home?: string | undefined;
  private ageBracket: AgeBracket;
  private type: ReptileAnimalType = "Tortoise";
  private group: Group = "Reptile";
  private timesGivenBirth: number;

  constructor(name: string, age: number, gender: Gender) {
    checkNameNotEmpty(name);
    checkAge(age);
    this.name = name;
    this.age = age;
    this.gender = gender;
    if (this.age >= ageToBeConsideredAdult) {
      this.ageBracket = "Adult";
    } else {
      this.ageBracket = "Child";
    }
    this.home = "Animal Kingdom";
    this.timesGivenBirth = 0;
    tortoises.push(this);
  }
  swim() {
    console.log(`${this.name} is swimming`);
  }
  walk() {
    console.log(`${this.name} is walking`);
  }
  giveBirth(): void {
    if (this.gender === "Male") {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
    } else {
      this.timesGivenBirth += 1;
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const gender: Gender = num === 1 ? "Female" : "Male";
        const age: number = 0;
        new Tortoise(name, age, gender);
      }
      for (let i = 6; i <= 8; i++) {
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const gender: Gender = i % 2 != 0 ? "Female" : "Male";
        const age: number = 0;
        new Tortoise(name, age, gender);
      }
      console.log(`${this.name} lays eggs`);
    }
  }
  showHome(): void {
    console.log(`${this.name} lives in ${this.home}`);
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getGender(): Gender {
    return this.gender;
  }

  getHome(): string | undefined {
    return this.home;
  }

  getGroup(): Group {
    return this.group;
  }

  getType(): ReptileAnimalType | MammalAnimalType {
    return this.type;
  }
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
