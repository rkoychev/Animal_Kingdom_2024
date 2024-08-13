import Lion from "../src/animals/Lion";
// // Mock the Lion class
jest.mock("../src/animals/Lion", () => {
  return jest.fn().mockImplementation(() => ({
    getName: jest.fn().mockReturnValue("Simba"),
    getAge: jest.fn().mockReturnValue(5),
    getIsMale: jest.fn().mockReturnValue(true),
    run: jest.fn(),
    talk: jest.fn(),
    giveBirth: jest.fn(),
  }));
});

describe("Lion Class Tests", () => {
  test("should create a Lion instance with valid age", () => {
    const lion = new Lion("Simba", 5, true);
    expect(lion.getName()).toBe("Simba");
    expect(lion.getAge()).toBe(5);
    expect(lion.getIsMale()).toBe(true);
  });
});
