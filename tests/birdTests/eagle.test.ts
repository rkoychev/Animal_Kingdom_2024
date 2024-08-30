import Eagle, { AGE_TO_BE_ADULT, EAGLE_SPACE_NEEDED_AS_ADULT, EAGLE_SPACE_NEEDED_AS_CHILD, NUMBER_OF_BABY_EAGLES_BORN } from "../../src/animals/Eagle"

describe('Eagle Class Tests', () => {

    test('should create a Eagle instance with valid properties', () => {
        const eagle = new Eagle('Rar', 5, true)

        expect(eagle.getName()).toBe('Rar')
        expect(eagle.getAge()).toBe(5)
        expect(eagle.getIsMale()).toBe(true)
        expect(eagle.getIsAdult()).toBe(true)
        expect(eagle.getHome()).toBe("Animal Shelter")
    })
    test('should call talk method correctly', () => {
        const eagle = new Eagle('Rar', 5, true)
        expect(eagle.talk()).toBe('Rar is talking')
    })
    test('should call fly method correctly', () => {
        const eagle = new Eagle('Rar', 5, true)
        expect(eagle.fly()).toBe('Rar is flying')
    })
    test('should get space needed correctly', () => {
        const eagle = new Eagle('Rar', 0, false)
        const eagle2 = new Eagle('Rar', 4, false)
        const eagle3 = new Eagle('Rar', AGE_TO_BE_ADULT, false)
        expect(eagle.getSpaceNeeded()).toBe(EAGLE_SPACE_NEEDED_AS_CHILD)
        expect(eagle2.getSpaceNeeded()).toBe(EAGLE_SPACE_NEEDED_AS_ADULT)
        expect(eagle3.getSpaceNeeded()).toBe(EAGLE_SPACE_NEEDED_AS_ADULT)
    })
    test('should call  giveBirth correctly', () => {
        const eagle = new Eagle('Rar', 5, false)
        const babies = eagle.giveBirth()
        expect(babies.length).toBe(NUMBER_OF_BABY_EAGLES_BORN)
    })
})