import { AgeBracket, Gender, Group, MammalAnimalType } from "../customTypes";
import { ICanJump } from "../interfaces/ICanJump";
import { ICanRun } from "../interfaces/ICanRun";
import { ICanTalk } from "../interfaces/ICanTalk";
import { ICanWalk } from "../interfaces/ICanWalk";
import Mammal from "../interfaces/IMammal";
import { ageToBeConsideredAdult, lionFamilies } from "../constVariables";
import { checkAge } from "../verificationFunction/inputCheck";
export default class Lion
  implements ICanJump, ICanRun, ICanTalk, ICanWalk, Mammal
{
  private name: string;
  private age: number;
  private gender: Gender;
  private ageBracket: AgeBracket;
  private type: MammalAnimalType = "Lion";
  private group: Group = "Mammal";
  private home?: string | undefined;
  constructor(name: string, age: number, gender: Gender) {
    checkAge(age);
    this.name = name;
    this.age = age;
    this.gender = gender;
    if (this.age >= ageToBeConsideredAdult) {
      this.ageBracket = "Adult";
    } else {
      this.ageBracket = "Child";
    }
  }
  walk(): void {
    console.log(`${this.name} is walking`);
  }
  jump(): void {
    console.log(`${this.name} is jumping`);
  }
  run(): void {
    console.log(`${this.name} is running`);
  }
  talk(): void {
    console.log(`${this.name} is talking`);
  }
  giveBirth(): void {
    if (this.gender === "Male") {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
    } else if (this.home === undefined) {
      console.log(
        `${this.name} can't give birth because she doesn't have a home to meet a male`
      );
    } else {
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string = this.name + "Baby" + i;
        const gender: Gender = num === 1 ? "Female" : "Male";
        const age: number = 0;
        const babyLion = new Lion(name, age, gender);
        lionFamilies.forEach((family) => {
          if (family.name === this.home) {
            family.addLionFromBirth(babyLion);
          }
        });
      }
      console.log(`${this.name} gives birth`);
    }
  }
  showHome(): void {
    if (this.home === undefined) {
      console.log(`${this.name} doesn't have a home yet`);
    } else {
      console.log(`${this.name} lives in ${this.home} family`);
    }
  }

  getName(): string {
    return this.name;
  }
  getAgeBracket(): AgeBracket {
    return this.ageBracket;
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
  getType(): MammalAnimalType {
    return this.type;
  }
  // Setter for home
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
