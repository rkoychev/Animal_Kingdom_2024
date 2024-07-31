import { AgeBracket, Gender, Group, ReptileAnimalType } from "../customTypes";
import { ageToBeConsideredAdult, crocodilePacks } from "../constVariables";
import Reptile from "../interfaces/IReptile";
import { ICanSwim } from "../interfaces/ICanSwim";
import { ICanWalk } from "../interfaces/ICanWalk";
import { checkAge, checkLength } from "../verificationFunction/inputCheck";

export default class Crocodile implements ICanSwim, ICanWalk, Reptile {
  private length: number;
  private ageBracket: AgeBracket;
  private name: string;
  private age: number;
  private gender: Gender;
  private type: ReptileAnimalType = "Crocodile";
  private group: Group = "Reptile";
  private home?: string | undefined;
  private timesGivenBirth: number;
  constructor(name: string, age: number, gender: Gender, length: number) {
    checkAge(age);
    checkLength(length);
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.length = length;
    this.timesGivenBirth = 0;
    if (this.age >= ageToBeConsideredAdult) {
      this.ageBracket = "Adult";
    } else {
      this.ageBracket = "Child";
    }
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
    } else if (this.home === undefined) {
      console.log(
        `${this.name} can't give birth because she doesn't have a home to meet a male`
      );
    } else {
      //Giving birth for reptiles creates 8 reptiles also of random gender, but always at least 2 males and 1 female.
      this.timesGivenBirth += 1;
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const gender: Gender = num === 1 ? "Female" : "Male";
        const age: number = 0;
        const babyCroc = new Crocodile(name, age, gender, 10);
        crocodilePacks.forEach((pack) => {
          if (pack.name === this.home) {
            pack.addCrocodileFromBirth(babyCroc);
          }
        });
      }
      for (let i = 6; i <= 8; i++) {
        const name: string =
          this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
        const gender: Gender = i % 2 != 0 ? "Female" : "Male";
        const age: number = 0;
        const babyCroc = new Crocodile(name, age, gender, 10);
        crocodilePacks.forEach((pack) => {
          if (pack.name === this.home) {
            pack.addCrocodileFromBirth(babyCroc);
          }
        });
      }
      console.log(`${this.name} lays eggs`);
    }
  }
  showHome(): void {
    if (this.home === undefined) {
      console.log(`${this.name} doesn't have a home yet`);
    } else {
      console.log(`${this.name} lives in ${this.home} pack`);
    }
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
  getType(): ReptileAnimalType {
    return this.type;
  }
  // Setter for home
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
