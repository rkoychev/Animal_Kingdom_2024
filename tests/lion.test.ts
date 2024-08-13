import Lion from "../src/animals/Lion";
test("should log an error if age is negative", () => {
  expect(() => {
    const lion = new Lion("Simba", -5, true);
  }).toThrow("Age cannot be negative");
});
test("should log an error if name is an empty string", () => {
  expect(() => {
    const lion = new Lion("", 5, true);
  }).toThrow("Name cannot be empty");
});
describe("Lion Class Tests", () => {
  test("should create a Lion instance with valid age", () => {
    const lion = new Lion("Simba", 5, true);
    expect(lion.getName()).toBe("Simba");
    expect(lion.getAge()).toBe(5);
    expect(lion.getIsMale()).toBe(true);
  });

  test("should call run method correctly", () => {
    const logLock = jest.spyOn(console, "log").mockImplementation(() => {});
    const lion = new Lion("Simba", 5, true);
    const runSpy = jest.spyOn(lion, "run");
    lion.run();
    expect(runSpy).toHaveBeenCalled();
    expect(logLock).toHaveBeenCalledWith("Simba is running");
    logLock.mockRestore();
  });

  test("should call talk method correctly", () => {
    const logLock = jest.spyOn(console, "log").mockImplementation(() => {});
    const lion = new Lion("Simba", 5, true);
    const talkSpy = jest.spyOn(lion, "talk");
    lion.talk();
    expect(talkSpy).toHaveBeenCalled();
    expect(logLock).toHaveBeenCalledWith("Simba is talking");
    logLock.mockRestore();
  });

  test("should log an error if a male lion calls giveBirth", () => {
    const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    const lion = new Lion("Simba", 5, true);
    lion.giveBirth();
    expect(errorMock).toHaveBeenCalledWith(
      "Only Females can give birth and Simba is a proud male Lion"
    );
    errorMock.mockRestore();
  });
  test("should log an error if a lion with no home calls giveBirth", () => {
    const lion = new Lion("Nala", 4, false);
    const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    lion.giveBirth();
    expect(errorMock).toHaveBeenCalledWith(
      "Nala can't give birth because she doesn't have a home to meet a male"
    );
    errorMock.mockRestore();
  });
});
