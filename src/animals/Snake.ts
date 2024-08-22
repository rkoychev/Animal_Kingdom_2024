import { SnakeType } from "../customTypes";
import { snakes } from "../app";
import Reptile from "../hierarchy/Reptile";
import { AnimalCandidate } from "../hierarchy/Animal";
export const NUMBER_OF_BABY_SNAKES_BORN = 8;
export const NUMBER_OF_BABY_SNAKES_BORN_RANDOM_GENDER = 5;
export const SNAKE_SPACE_NEEDED_AS_ADULT = 300;
export const SNAKE_SPACE_NEEDED_AS_CHILD = 150;
import {
  EMPTY_COLOR_ERROR_MESSAGE,
  NEGATIVE_LENGTH_ERROR_MESSAGE,
} from "../../messages/errorMessages";
export default class Snake extends Reptile {
  private type: SnakeType;
  private color: string;
  private length: number;
  protected home?: string | undefined;
  private numberOfBabiesBorn = NUMBER_OF_BABY_SNAKES_BORN;
  private numberOfBabiesBornRandomGender =
    NUMBER_OF_BABY_SNAKES_BORN_RANDOM_GENDER;
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
      throw new Error(NEGATIVE_LENGTH_ERROR_MESSAGE);
    }
    if (color.length <= 0) {
      throw new Error(EMPTY_COLOR_ERROR_MESSAGE);
    }
    this.type = type;
    this.color = color;
    this.length = length;
    this.canClimbTrees = true;
    this.home = "hole";
    snakes.push(this);
  }
  override walk(): string {
    return `${this.name} is sliding`;
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return SNAKE_SPACE_NEEDED_AS_ADULT;
    } else {
      return SNAKE_SPACE_NEEDED_AS_CHILD;
    }
  }
  public giveBirth() {
    const candidateSnakes: AnimalCandidate[] = this.generateBabyProperties(
      this.numberOfBabiesBorn,
      this.numberOfBabiesBornRandomGender
    );
    let length: number;
    const babies: Snake[] = [];
    if (candidateSnakes) {
      candidateSnakes.forEach((snakeObjectInfo) => {
        length = Math.floor(Math.random() * 3) + 1;
        const babySnake = new Snake(
          snakeObjectInfo.name,
          0,
          this.type,
          snakeObjectInfo.isMale,
          this.color,
          length
        );
        babySnake.home = this.home;
        babies.push(babySnake);
      });
    }
    return babies;
  }
}
