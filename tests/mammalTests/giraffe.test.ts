import { ELEPHANT_HEIGHT_NEGATIVE, ELEPHANT_wEIGHT_NEGATIVE, GIRAFFE_HEIGHT_NEGATIVE } from "../../messages/errorMessages";
import AnimalFamily from "../../src/animalFamily/AnimalFamily";
import Elephant, { NUMBER_OF_BABY_ELEPHANTS_BORN } from "../../src/animals/Elephant";
import Giraffe from "../../src/animals/Giraffe";

describe("Giraffe Class Tests", () => {

    test("should log an error if height is negative", () => {
        expect(() => {
            const giraffe = new Giraffe("Savana", 5, true, -5);
        }).toThrow(GIRAFFE_HEIGHT_NEGATIVE);
    });

    test("should create a Giraffe instance with valid properties", () => {
        const giraffe = new Giraffe("Savana", 5, true, 5);

        expect(giraffe.getName()).toBe("Savana");
        expect(giraffe.getAge()).toBe(5);
        expect(giraffe.getIsMale()).toBe(true);
        expect(giraffe.getIsAdult()).toBe(true);
        expect(giraffe.getHome()).toBe(undefined);

    });
    test("should call run method correctly", () => {
        const giraffe = new Giraffe("Savana", 5, true, 5);
        expect(giraffe.run()).toBe("Savana is running");
    });

    test("should log an error if giraffes in family are less than 10", () => {
        const giraffe = new Giraffe("Savana", 5, false, 5);
        const giraffe3 = new Giraffe("Savana", 5, true, 5);
        const giraffe4 = new Giraffe("Savana", 5, false, 5);
        expect(() => {
            const elephants = new AnimalFamily("Elephants", [giraffe, giraffe3, giraffe4]);
        }).toThrow("Family members cannot be less than 10.")
    });

    test("should call  giveBirth correctly", () => {
        const giraffe = new Giraffe("Savana", 5, false, 5);
        const giraffe2 = new Giraffe("Savana", 5, false, 5);
        const giraffe3 = new Giraffe("Savana", 5, true, 5);
        const giraffe4 = new Giraffe("Savana", 5, false, 5);
        const giraffe5 = new Giraffe("Savana", 5, false, 5);
        const giraffe6 = new Giraffe("Savana", 5, true, 5);
        const giraffe7 = new Giraffe("Savana", 5, false, 5);
        const giraffe8 = new Giraffe("Savana", 5, false, 5);
        const giraffe9 = new Giraffe("Savana", 5, false, 5);
        const giraffe10 = new Giraffe("Savana", 5, true, 5);
        const giraffes = new AnimalFamily("Elephants", [giraffe, giraffe2, giraffe3, giraffe4, giraffe5, giraffe6, giraffe7, giraffe8, giraffe9, giraffe10]);
        const babies = giraffe.giveBirth();
        expect(babies.length).toBe(NUMBER_OF_BABY_ELEPHANTS_BORN);
    });
});

