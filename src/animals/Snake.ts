import { SnakeType } from '../customTypes'
import { snakes } from '../app'
import Reptile from '../hierarchy/Reptile'
import { AnimalCandidate } from '../hierarchy/Animal'
export const SNAKE_SPACE_NEEDED_AS_ADULT = 300
export const SNAKE_SPACE_NEEDED_AS_CHILD = 150
import { EMPTY_COLOR_ERROR_MESSAGE, NEGATIVE_LENGTH_ERROR_MESSAGE } from '../../messages/errorMessages'
import AnimalShelter, { shelterHomeName } from '../animalShelter/AnimalShelter'
export default class Snake extends Reptile {
  private type: SnakeType
  private color: string
  private length: number
  protected home?: string | undefined
  constructor(name: string, age: number, type: SnakeType, isMale: boolean, color: string, length: number) {
    super(name, age, isMale)
    if (length <= 0) {
      throw new Error(NEGATIVE_LENGTH_ERROR_MESSAGE)
    }
    if (color.length <= 0) {
      throw new Error(EMPTY_COLOR_ERROR_MESSAGE)
    }
    this.type = type
    this.color = color
    this.length = length
    this.canClimbTrees = true
    this.setHome('hole')
    snakes.push(this)
  }
  override walk(): string {
    return `${this.name} is sliding`
  }
  public getSpaceNeeded(): number {
    if (this.isAdult === true) {
      return SNAKE_SPACE_NEEDED_AS_ADULT
    } else {
      return SNAKE_SPACE_NEEDED_AS_CHILD
    }
  }
  public giveBirth(): Snake[] {
    const candidateSnakes: AnimalCandidate[] = this.generateBabyProperties()
    let length: number
    const babies: Snake[] = []
    candidateSnakes?.forEach((snakeObjectInfo) => {
      length = Math.floor(Math.random() * 3) + 1
      const babySnake = new Snake(snakeObjectInfo.name, 0, this.type, snakeObjectInfo.isMale, this.color, length)
      babySnake.home = this.home
      if (this.home === shelterHomeName) {
        AnimalShelter.getInstance().addAnimal(babySnake, true)
      }
      babies.push(babySnake)
    })
    return babies
  }
}
