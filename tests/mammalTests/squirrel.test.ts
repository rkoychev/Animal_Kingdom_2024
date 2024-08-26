import { NEGATIVE_HOLE_SIZE, NEGATIVE_NUTS_ADDED, NEGATIVE_TREE_AGE } from '../../messages/errorMessages'
import Squirrel, {
  NUMBER_OF_BABY_SQUIRRELS_BORN,
  SQUIRREL_SPACE_NEEDED_AS_ADULT,
  SQUIRREL_SPACE_NEEDED_AS_CHILD,
} from '../../src/animals/Squirrel'
import { AGE_TO_BE_ADULT } from '../../src/hierarchy/Animal'

describe('Squirrel Class Tests', () => {
  test('should log an error if treeAge is negative', () => {
    expect(() => {
      const squirrel = new Squirrel('Kiki', 5, true, 'Cedar', -5, 56)
    }).toThrow(NEGATIVE_TREE_AGE)
  })

  test('should log an error if nutsLimit is negative', () => {
    expect(() => {
      const squirrel = new Squirrel('Kiki', 5, true, 'Cedar', 5, -56)
    }).toThrow(NEGATIVE_HOLE_SIZE)
  })
  test('should create a Squirrel instance with valid properties', () => {
    const squirrel = new Squirrel('Kiki', 5, true, 'Cedar', 5, 8)

    expect(squirrel.getName()).toBe('Kiki')
    expect(squirrel.getAge()).toBe(5)
    expect(squirrel.getIsMale()).toBe(true)
    expect(squirrel.getIsAdult()).toBe(true)
    expect(squirrel.getHome()).toBe('Cedar tree')
  })

  test('should call jump method correctly', () => {
    const squirrel = new Squirrel('Kiki', 5, true, 'Cedar', 5, 8)
    expect(squirrel.jump()).toBe('Kiki is jumping')
  })
  test('should get space needed correctly', () => {
    const sq1 = new Squirrel('Sq1', 1, false, 'Cedar', 5, 33)
    const sq2 = new Squirrel('Sq2', 4, false, 'Cedar', 5, 33)
    const sq3 = new Squirrel('Sq3', AGE_TO_BE_ADULT, false, 'Cedar', 5, 33)
    expect(sq1.getSpaceNeeded()).toBe(SQUIRREL_SPACE_NEEDED_AS_CHILD)
    expect(sq2.getSpaceNeeded()).toBe(SQUIRREL_SPACE_NEEDED_AS_ADULT)
    expect(sq3.getSpaceNeeded()).toBe(SQUIRREL_SPACE_NEEDED_AS_ADULT)
  })
  test('should call  giveBirth correctly', () => {
    const squirrel = new Squirrel('Kiki', 5, false, 'Cedar', 5, 8)
    const babies = squirrel.giveBirth()
    expect(babies.length).toBe(NUMBER_OF_BABY_SQUIRRELS_BORN)
  })

  test('should call addNuts method correctly', () => {
    const squirrel = new Squirrel('Kiki', 5, true, 'Cedar', 5, 8)
    squirrel.addNuts(8)
    expect(() => {
      squirrel.addNuts(1)
    }).toThrow('Kiki hole has space left only for 0 nuts')
  })

  test('should log an error if a squirrel adds negative nuts', () => {
    const squirrel = new Squirrel('Kiki', 5, true, 'Cedar', 5, 8)
    expect(() => {
      squirrel.addNuts(-5)
    }).toThrow(NEGATIVE_NUTS_ADDED)
  })

  test('should log an error if a squirrel adds too many nuts', () => {
    const squirrel = new Squirrel('Kiki', 5, true, 'Cedar', 5, 8)
    expect(() => {
      squirrel.addNuts(9)
    }).toThrow(`Kiki hole has space left only for 8 nuts`)
  })
})
