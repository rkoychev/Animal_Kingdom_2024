import { ELEPHANT_HEIGHT_NEGATIVE, ELEPHANT_wEIGHT_NEGATIVE } from "../../messages/errorMessages";
import AnimalFamily from "../../src/animalFamily/AnimalFamily";
import Elephant, { NUMBER_OF_BABY_ELEPHANTS_BORN } from "../../src/animals/Elephant";

describe("Elephant Class Tests", () => {

    test("should log an error if height is negative", () => {
        expect(() => {
            const elephant = new Elephant("Dumbo", 5, true, -5, 560);
        }).toThrow(ELEPHANT_HEIGHT_NEGATIVE);
    });
    test("should log an error if weight is negative", () => {
        expect(() => {
            const elephant = new Elephant("Dumbo", 5, true, 5, -560);
        }).toThrow(ELEPHANT_wEIGHT_NEGATIVE);
    });
    test("should create a Squirrel instance with valid properties", () => {
        const elephant = new Elephant("Dumbo", 5, true, 5, 560);

        expect(elephant.getName()).toBe("Dumbo");
        expect(elephant.getAge()).toBe(5);
        expect(elephant.getIsMale()).toBe(true);
        expect(elephant.getIsAdult()).toBe(true);
        expect(elephant.getHome()).toBe(undefined);

    });
    test("should call run method correctly", () => {
        const elephant = new Elephant("Dumbo", 5, true, 5, 560);
        expect(elephant.run()).toBe("Dumbo is running");
    });
    test("should call talk method correctly", () => {
        const elephant = new Elephant("Dumbo", 5, true, 5, 560);
        expect(elephant.talk()).toBe("Dumbo is talking");
    });

    test("should log an error if only 1 male in family", () => {
        const elephant = new Elephant("Dumbo", 5, false, 5, 560);
        const elephant2 = new Elephant("Dumbo", 5, false, 5, 550);
        const elephant3 = new Elephant("Dumbo", 5, true, 5, 560);
        const elephant4 = new Elephant("Dumbo", 5, false, 5, 550);
        expect(() => {
            const elephants = new AnimalFamily("Elephants", [elephant, elephant2, elephant3, elephant4]);
        }).toThrow("Male adults in the family cannot be less than 2.")
    });
    test("should log an error if only 1 female in family", () => {
        const elephant = new Elephant("Dumbo", 5, true, 5, 560);
        const elephant2 = new Elephant("Dumbo", 5, true, 5, 560);
        const elephant3 = new Elephant("Dumbo", 5, true, 5, 560);
        const elephant4 = new Elephant("Dumbo", 5, false, 5, 550);
        expect(() => {
            const elephants = new AnimalFamily("Elephants", [elephant, elephant2, elephant3, elephant4]);
        }).toThrow("Female adults in the family cannot be less than 2.")
    });

    test("should call  giveBirth correctly", () => {
        const elephant = new Elephant("Dumbo", 5, false, 5, 560);
        const elephant2 = new Elephant("Dumbo", 5, true, 5, 560);
        const elephant3 = new Elephant("Dumbo", 5, true, 5, 560);
        const elephant4 = new Elephant("Dumbo", 5, false, 5, 560);
        const elephants = new AnimalFamily("Elephants", [elephant, elephant2, elephant3, elephant4]);
        const babies = elephant.giveBirth();
        expect(babies.length).toBe(NUMBER_OF_BABY_ELEPHANTS_BORN);
    });


});

