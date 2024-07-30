import { AgeBracket, Gender, Group, SnakeType } from "../customTypes";
import Reptile from "../interfaces/IReptile";
import { ICanSwim } from "../interfaces/ICanSwim";
import { ICanWalk } from "../interfaces/ICanWalk";
import { ageToBeConsideredAdult, snakes } from "../constVariables";
import { checkAge, checkLength } from "../verificationFunction/inputCheck";
export default class Snake implements ICanWalk, ICanSwim, Reptile {
  private type: SnakeType;
  private color: string;
  private length: number;
  private ageBracket: AgeBracket;
  private name: string;
  private age: number;
  private gender: Gender;
  private home?: string | undefined;
  private group: Group = "Reptile";
  constructor(
    name: string,
    age: number,
    type: SnakeType,
    gender: Gender,
    color: string,
    length: number
  ) {
    checkAge(age);
    checkLength(length);
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.type = type;
    this.color = color;
    this.length = length;
    this.home = "hole";
    if (this.age >= ageToBeConsideredAdult) {
      this.ageBracket = "Adult";
    } else {
      this.ageBracket = "Child";
    }
    snakes.push(this);
  }
  walk() {
    console.log(`${this.name} is sliding`);
  }
  swim() {
    console.log(`${this.name} is swiming`);
  }
  giveBirth(): void {
    if (this.gender === "Male") {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
    } else {
      //Giving birth for reptiles creates 8 reptiles also of random gender, but always at least 2 males and 1 female.
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string = this.name + "Baby" + i;
        const gender: Gender = num === 1 ? "Female" : "Male";
        const age: number = 0;
        new Snake(name, age, this.type, gender, this.color, 10);
      }
      for (let i = 6; i <= 8; i++) {
        const name: string = this.name + "Baby" + i;
        const gender: Gender = i % 2 != 0 ? "Female" : "Male";
        const age: number = 0;
        new Snake(name, age, this.type, gender, this.color, 10);
      }
      console.log(`${this.name} lays eggs`);
    }
  }
  showHome(): void {
    console.log(`${this.name} lives in a ${this.home}`);
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
  getType(): SnakeType {
    return this.type;
  }
  // Setter for home
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
