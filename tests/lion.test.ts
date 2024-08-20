import Lion from "../src/animals/Lion";
import {
  EMPTY_NAME_ERROR_MESSAGE,
  GIVING_BIRTH_WITHOUT_HOME,
  NEGATIVE_AGE_ERROR_MESSAGE,
  TELLING_MALE_TO_GIVE_BIRTH,
} from "../messages/errorMessages";

describe("Lion Class Tests", () => {
  test("should log an error if age is negative", () => {
    expect(() => {
      const lion = new Lion("Simba", -5, true);
    }).toThrow(NEGATIVE_AGE_ERROR_MESSAGE);
  });
  test("should log an error if name is an empty string", () => {
    expect(() => {
      const lion = new Lion("", 5, true);
    }).toThrow(EMPTY_NAME_ERROR_MESSAGE);
  });
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
    const lion = new Lion("Simba", 5, true);
    expect(() => {
      lion.giveBirth();
    }).toThrow(TELLING_MALE_TO_GIVE_BIRTH);
  });
  test("should throw an error if a lion with no home calls giveBirth", () => {
    const lion = new Lion("Nala", 4, false);
    lion.setHome(undefined);
    expect(() => {
      lion.giveBirth();
    }).toThrow(GIVING_BIRTH_WITHOUT_HOME);
  });
});
