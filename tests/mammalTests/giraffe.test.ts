import { FAMILY_MIN_MEMBERS_NOT_MET, GIRAFFE_HEIGHT_NEGATIVE } from '../../messages/errorMessages'
import AnimalFamily from '../../src/animalFamily/AnimalFamily'
import {
  GIRAFFE_SPACE_NEEDED_AS_ADULT,
  GIRAFFE_SPACE_NEEDED_AS_CHILD,
  NUMBER_OF_BABY_GIRAFFES_BORN,
} from '../../src/animals/Giraffe'
import Giraffe from '../../src/animals/Giraffe'
import { AGE_TO_BE_ADULT } from '../../src/hierarchy/Animal'

describe('Giraffe Class Tests', () => {
  test('should log an error if height is negative', () => {
    expect(() => {
      const giraffe = new Giraffe('Savana', 5, true, -5)
    }).toThrow(GIRAFFE_HEIGHT_NEGATIVE)
  })

  test('should create a Giraffe instance with valid properties', () => {
    const giraffe = new Giraffe('Savana', 5, true, 5)

    expect(giraffe.getName()).toBe('Savana')
    expect(giraffe.getAge()).toBe(5)
    expect(giraffe.getIsMale()).toBe(true)
    expect(giraffe.getIsAdult()).toBe(true)
    expect(giraffe.getHome()).toBe(undefined)
  })
  test('should call run method correctly', () => {
    const giraffe = new Giraffe('Savana', 5, true, 5)
    expect(giraffe.run()).toBe('Savana is running')
  })

  test('should log an error if giraffes in family are less than 10', () => {
    const giraffe = new Giraffe('Savana', 5, false, 5)
    const giraffe3 = new Giraffe('Savana', 5, true, 5)
    const giraffe4 = new Giraffe('Savana', 5, false, 5)
    expect(() => {
      const girafes = new AnimalFamily('Giras', [giraffe, giraffe3, giraffe4])
    }).toThrow(FAMILY_MIN_MEMBERS_NOT_MET + '10')
  })
  test('should get space needed correctly', () => {
    const giraffe = new Giraffe('Gir', 1, false, 10)
    const giraffe2 = new Giraffe('Gir2', 4, false, 10)
    const giraffe3 = new Giraffe('Gir3', AGE_TO_BE_ADULT, false, 10)
    expect(giraffe.getSpaceNeeded()).toBe(GIRAFFE_SPACE_NEEDED_AS_CHILD)
    expect(giraffe2.getSpaceNeeded()).toBe(GIRAFFE_SPACE_NEEDED_AS_ADULT)
    expect(giraffe3.getSpaceNeeded()).toBe(GIRAFFE_SPACE_NEEDED_AS_ADULT)
  })
  test('should call  giveBirth correctly', () => {
    const giraffe = new Giraffe('Savana', 5, false, 5)
    const giraffe2 = new Giraffe('Savana', 5, false, 5)
    const giraffe3 = new Giraffe('Savana', 5, true, 5)
    const giraffe4 = new Giraffe('Savana', 5, false, 5)
    const giraffe5 = new Giraffe('Savana', 5, false, 5)
    const giraffe6 = new Giraffe('Savana', 5, true, 5)
    const giraffe7 = new Giraffe('Savana', 5, false, 5)
    const giraffe8 = new Giraffe('Savana', 5, false, 5)
    const giraffe9 = new Giraffe('Savana', 5, false, 5)
    const giraffe10 = new Giraffe('Savana', 5, true, 5)
    const giraffes = new AnimalFamily('Elephants', [
      giraffe,
      giraffe2,
      giraffe3,
      giraffe4,
      giraffe5,
      giraffe6,
      giraffe7,
      giraffe8,
      giraffe9,
      giraffe10,
    ])
    const babies = giraffe.giveBirth()
    expect(babies.length).toBe(NUMBER_OF_BABY_GIRAFFES_BORN)
  })
})
