import { SnakeType } from "../customTypes";
import { snakes } from "../app";
import Reptile from "../hierarchy/Reptile";
import { AnimalCandidate } from "../hierarchy/Animal";
const NUMBER_OF_BABY_SNAKES_BORN = 8;
const NUMBER_OF_BABY_SNAKES_BORN_RANDOM_GENDER = 5;

export default class Snake extends Reptile {
  private type: SnakeType;
  private color: string;
  private length: number;
  protected home?: string | undefined;
  private numberOfBabiesBorn = NUMBER_OF_BABY_SNAKES_BORN;
  private numberOfBabiesBornRandomGender = NUMBER_OF_BABY_SNAKES_BORN_RANDOM_GENDER;
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
    this._canClimbTrees =true;
    this.home = "hole";
    snakes.push(this);
  }
  override walk(): void {
    console.log(`${this.name} is sliding`);
  }

  public giveBirth(): void {
    const candidateSnakes: AnimalCandidate[] =
      this.generateBabyProperties(this.numberOfBabiesBorn, this.numberOfBabiesBornRandomGender);
    let length: number;
    if (candidateSnakes) {
      candidateSnakes.forEach(snakeObjectInfo => {
        length = Math.floor(Math.random() * 3) + 1;
        const babySnake = new Snake(snakeObjectInfo.name, 0, this.type, snakeObjectInfo.isMale, this.color, length);
        babySnake.home = this.home;
      });
    };
  };
}
