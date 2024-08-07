import { SnakeType } from "../customTypes";
import { snakes } from "../app";
import Reptile from "../hierarchy/Reptile";
export default class Snake
  extends Reptile
{
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
  
  giveBirth(): [string, number, boolean,string][] {
    const snakesTuples = super.giveBirth();
    for (var snakeTuple of snakesTuples) {

      const babySnake = new Snake(snakeTuple[0], 0, this.type, snakeTuple[2], this.color, 10);
      babySnake.home = snakeTuple[3];
    }
    return [["", 0, false,""]];
  }

  getType() {
    return this.type;
  }
}
