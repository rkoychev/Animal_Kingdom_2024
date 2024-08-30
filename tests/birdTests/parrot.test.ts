import Parrot, { AGE_TO_BE_ADULT, NUMBER_OF_BABY_PARROT_BORN, PARROT_SPACE_NEEDED_AS_ADULT, PARROT_SPACE_NEEDED_AS_CHILD } from "../../src/animals/Parrot"

describe('Parrot Class Tests', () => {

    test('should create a Eagle instance with valid properties', () => {
        const eagle = new Parrot('Rar', 5, true)

        expect(eagle.getName()).toBe('Rar')
        expect(eagle.getAge()).toBe(5)
        expect(eagle.getIsMale()).toBe(true)
        expect(eagle.getIsAdult()).toBe(true)
        expect(eagle.getHome()).toBe("Animal Shelter")
    })
    test('should call talk method correctly', () => {
        const eagle = new Parrot('Rar', 5, true)
        expect(eagle.talk()).toBe('Rar is talking')
    })
    test('should call fly method correctly', () => {
        const eagle = new Parrot('Rar', 5, true)
        expect(eagle.fly()).toBe('Rar is flying')
    })
    test('should get space needed correctly', () => {
        const eagle = new Parrot('Rar', 0, false)
        const eagle2 = new Parrot('Rar', 4, false)
        const eagle3 = new Parrot('Rar', AGE_TO_BE_ADULT, false)
        expect(eagle.getSpaceNeeded()).toBe(PARROT_SPACE_NEEDED_AS_CHILD)
        expect(eagle2.getSpaceNeeded()).toBe(PARROT_SPACE_NEEDED_AS_ADULT)
        expect(eagle3.getSpaceNeeded()).toBe(PARROT_SPACE_NEEDED_AS_ADULT)
    })
    test('should call  giveBirth correctly', () => {
        const eagle = new Parrot('Rar', 5, false)
        const babies = eagle.giveBirth()
        expect(babies.length).toBe(NUMBER_OF_BABY_PARROT_BORN)
    })
})