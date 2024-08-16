import Squirrel from "../src/animals/Squirrel";

test("should log an error if  squirrel age is negative", () => {
    expect(() => {
        const lion = new Squirrel("Kiki", -5, true, "Cedar", 5, 8);
    }).toThrow("Age cannot be negative");
});

test("should log an error if name is an empty string", () => {
    expect(() => {
        const lion = new Squirrel("", 5, true, "Cedar", 5, 8);
    }).toThrow("Name cannot be empty");
});

test("should log an error if treeAge is negative", () => {
    expect(() => {
        const squirrel = new Squirrel("Kiki", 5, true, "Cedar", -5, 56);
    }).toThrow("Tree age must be greater than zero");
});

test("should log an error if holeSize is negative", () => {
    expect(() => {
        const squirrel = new Squirrel("Kiki", 5, true, "Cedar", 5, -56);
    }).toThrow("Hole size must be greater than zero");
});

describe("Squirrel Class Tests", () => {
    test("should create a Squirrel instance with valid properties", () => {
        const squirrel = new Squirrel("Kiki", 5, true, "Cedar", 5, 8);

        expect(squirrel.getName()).toBe("Kiki");
        expect(squirrel.getAge()).toBe(5);
        expect(squirrel.getIsMale()).toBe(true);
        expect(squirrel.getHome()).toBe("Cedar tree"); // ------tree ili Cedar da e home
    });

    test("should call walk method correctly", () => {
        const logLock = jest.spyOn(console, "log").mockImplementation(() => { });
        const squirrel = new Squirrel("Kiki", 5, true, "Cedar", 5, 8);
        const walkSpy = jest.spyOn(squirrel, "walk");
        squirrel.walk();
        expect(walkSpy).toHaveBeenCalled();
        expect(logLock).toHaveBeenCalledWith("Kiki is walking");
        logLock.mockRestore();
    });

    test("should call jump method correctly", () => {
        const logLock = jest.spyOn(console, "log").mockImplementation(() => { });
        const squirrel = new Squirrel("Kiki", 5, true, "Cedar", 5, 8);
        const jumpSpy = jest.spyOn(squirrel, "jump");
        squirrel.jump();
        expect(jumpSpy).toHaveBeenCalled();
        expect(logLock).toHaveBeenCalledWith("Kiki is jumping");
        logLock.mockRestore();
    });

    test("should log an error if a male squirrel calls giveBirth", () => {
        const errorMock = jest.spyOn(console, "error").mockImplementation(() => { });
        const squirrel = new Squirrel("Kiki", 5, true, "Cedar", 5, 8);
        squirrel.giveBirth();
        expect(errorMock).toHaveBeenCalledWith(
            "Only Females can give birth and Kiki is a proud male Squirrel"
        );
        errorMock.mockRestore();
    });

    test("should log an error if a squirrel without home calls giveBirth", () => {
        const errorMock = jest.spyOn(console, "error").mockImplementation(() => { });
        const squirrel = new Squirrel("Kiki", 5, false, "Cedar", 5, 8);
        squirrel.setHome(undefined);
        squirrel.giveBirth();
        expect(errorMock).toHaveBeenCalledWith(
            "Kiki can't give birth because she doesn't have a home to meet a male"
        );
        errorMock.mockRestore();
    });

    test("should log an error if a squirrel adds too many nuts", () => {
        const errorMock = jest.spyOn(console, "error").mockImplementation(() => { });
        const squirrel = new Squirrel("Kiki", 5, false, "Cedar", 5, 8);
        const nutsToAdd = squirrel.getHoleSize() - squirrel.getStoredNuts() + 1;
        squirrel.addNuts(nutsToAdd);
        expect(errorMock).toHaveBeenCalledWith(
            `Kiki hole has space left only for 8 nuts`
        );
        errorMock.mockRestore();
    });
});  