import Elephant from "../src/animals/Elephant";

test("should log an error if  elephant age is negative", () => {
    expect(() => {
        const elephant = new Elephant("Dumbo", -5, true, 5, 580);
    }).toThrow("Age cannot be negative");
});

test("should log an error if name is an empty string", () => {
    expect(() => {
        const elephant = new Elephant("", 5, true, 3, 580);
    }).toThrow("Name cannot be empty");
});

test("should log an error if height is negative", () => {
    expect(() => {
        const elephant = new Elephant("Dumbo", 5, true, -5, 560);
    }).toThrow("Elephant height must be greater than zero!");
});

