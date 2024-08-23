import { NEGATIVE_VALUES } from '../messages/errorMessages'
import Lion from '../src/animals/Lion'
describe('Generating height and weight checking', () => {
  test('should log an error if any height is negative', () => {
    const lion = new Lion('Simba', 5, true)
    expect(() => {
      lion.generateRandomHeight(5, -8)
    }).toThrow(NEGATIVE_VALUES)
    expect(() => {
      lion.generateRandomHeight(-5, 8)
    }).toThrow(NEGATIVE_VALUES)
    expect(() => {
      lion.generateRandomHeight(-5, -8)
    }).toThrow(NEGATIVE_VALUES)
  })

  test('should log an error if any weight is negative', () => {
    const lion = new Lion('Simba', 5, true)
    expect(() => {
      lion.generateRandomWeight(5, -8)
    }).toThrow(NEGATIVE_VALUES)
    expect(() => {
      lion.generateRandomWeight(-5, 8)
    }).toThrow(NEGATIVE_VALUES)
    expect(() => {
      lion.generateRandomWeight(-5, -8)
    }).toThrow(NEGATIVE_VALUES)
  })
})
