import { SnakeType } from "../customTypes";
import { snakes } from "../app";
import Reptile from "../hierarchy/Reptile";
import { AnimalCandidate } from "../hierarchy/Animal";

export default class Snake extends Reptile {
  private type: SnakeType;
  private color: string;
  private length: number;
  protected home?: string | undefined;
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
    snakes.push(this);
  }
  override walk(): void {
    console.log(`${this.name} is sliding`);
  }

  public giveBirth(numberOfChildren:number,numberOfChildrenWithRandomGender:number): void {
    const candidateSnakes: AnimalCandidate[] = super.giveBirth(numberOfChildren,numberOfChildrenWithRandomGender) as AnimalCandidate[];
    let length: number;
    if (candidateSnakes) {
      candidateSnakes.forEach(snakeObjectInfo => {
        length = Math.floor(Math.random() * 3)+ 1;
        const babySnake = new Snake(snakeObjectInfo.name, 0, this.type, snakeObjectInfo.isMale, this.color, length);
        babySnake.home = this.home;
      });
    };
  };
}
