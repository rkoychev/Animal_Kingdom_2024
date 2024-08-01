import {
  AgeBracket,
  Gender,
  Group,
  MammalAnimalType,
  ReptileAnimalType,
  TreeType,
} from "../customTypes";
import { ICanJump } from "../interfaces/ICanJump";
import { ICanWalk } from "../interfaces/ICanWalk";
import Mammal from "../interfaces/IMammal";
import { ageToBeConsideredAdult, squirrels } from "../constVariables";
import { checkAge, checkHoleSize } from "../verificationFunction/inputCheck";

export default class Squirrel implements ICanJump, ICanWalk, Mammal {
  private age: number;
  private name: string;
  private gender: Gender;
  private ageBracket: AgeBracket;
  private type: MammalAnimalType = "Squirrel";
  private treeType: TreeType;
  private treeAge: number;
  private holeSize: number;
  private storedNuts = 0;
  private home?: string | undefined;
  private group: Group = "Mammal";
  constructor(
    name: string,
    age: number,
    gender: Gender,
    treeType: TreeType,
    treeAge: number,
    holeSize: number
  ) {
    checkAge(age);
    checkHoleSize(holeSize);
    this.name = name;
    this.age = age;
    this.gender = gender;
    if (this.age >= ageToBeConsideredAdult) {
      this.ageBracket = "Adult";
    } else {
      this.ageBracket = "Child";
    }
    this.treeType = treeType;
    this.treeAge = treeAge;
    this.holeSize = holeSize;
    this.home = `${this.treeAge} old ${this.treeType} tree`;
    squirrels.push(this);
  }
  walk(): void {
    console.log(`${this.name} is walking`);
  }
  jump(): void {
    console.log(`${this.name} is jumping`);
  }
  addNuts(numberOfNuts: number): void {
    if (numberOfNuts < 0) {
      console.log(`Cannot add a negative number of Nuts`);
      return;
    }
    if (this.storedNuts + numberOfNuts <= this.holeSize) {
      this.storedNuts += numberOfNuts;
    } else
      console.log(
        `${this.name} hole has space left only for ${
          this.holeSize - this.storedNuts
        } nuts`
      );
  }
  giveBirth(): void {
    console.log(squirrels);
    if (this.gender === "Male") {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
    } else {
      for (let i = 1; i <= 5; i++) {
        const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const name: string = this.name + "Baby" + i;
        const gender: Gender = num === 1 ? "Female" : "Male";
        const age: number = 0;
        new Squirrel(
          name,
          age,
          gender,
          this.treeType,
          this.treeAge,
          this.holeSize
        );
      }
      console.log(`${this.name} gives birth`);
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
  getType(): ReptileAnimalType | MammalAnimalType {
    return this.type;
  }

  // Setter for home
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
