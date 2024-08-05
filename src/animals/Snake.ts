import { SnakeType } from "../customTypes";
import Reptile from "../interfaces/IReptile";
import { ICanSwim } from "../interfaces/ICanSwim";
import { ICanWalk } from "../interfaces/ICanWalk";
import { snakes } from "../app";
import Animal from "../Animal";
export default class Snake
  extends Animal
  implements ICanWalk, ICanSwim, Reptile
{
  private type: SnakeType;
  private color: string;
  private length: number;
  protected home?: string | undefined;
  group: "Reptile";
  constructor(
    name: string,
    age: number,
    type: SnakeType,
    isMale: boolean,
    color: string,
    length: number
  ) {
    super(name, age, isMale);
    if (length <= 0) {
      throw new Error("Length must be greater than zero");
    }
    this.type = type;
    this.color = color;
    this.length = length;
    this.home = "hole";
    this.group = "Reptile";
    snakes.push(this);
  }
  walk() {
    console.log(`${this.name} is sliding`);
  }
  swim() {
    console.log(`${this.name} is swiming`);
  }
  giveBirth(): void {
    if (this.isMale) {
      console.log(
        `Only Females can give birth and ${this.name} is a proud male ${this.type}`
      );
      return;
    }
    //Giving birth for reptiles creates 8 reptiles also of random gender, but always at least 2 males and 1 female.
    this.timesGivenBirth += 1;
    for (let i = 1; i <= 5; i++) {
      const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      const name: string =
        this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
      const gender: boolean = num === 1;
      const age: number = 0;
      new Snake(name, age, this.type, gender, this.color, 10);
    }
    for (let i = 6; i <= 8; i++) {
      const name: string =
        this.name + "-Baby-" + this.timesGivenBirth + "-" + i;
      const gender: boolean = i % 2 != 0;
      const age: number = 0;
      new Snake(name, age, this.type, gender, this.color, 10);
    }
    console.log(`${this.name} lays eggs`);
  }
  getType() {
    return this.type;
  }
  getGroup() {
    return this.group;
  }
}
