const AGE_TO_BE_ADULT = 2;
export default abstract class Animal {
  protected isAdult: boolean;
  protected name: string;
  protected age: number;
  protected isMale: boolean;
  protected home?: string | undefined;
  protected timesGivenBirth: number;
  constructor(name: string, age: number, isMale: boolean) {
    if (age < 0) {
      throw new Error("Age cant be negative");
    }
    if (name === "") {
      throw new Error("Name cannot be empty");
    }
    this.name = name;
    this.isMale = isMale;
    this.age = age;
    if (age >= AGE_TO_BE_ADULT) {
      this.isAdult = true;
    } else {
      this.isAdult = false;
    }
    this.timesGivenBirth = 0;
  }
  showHome(): void {
    if (this.home === undefined) {
      console.log(`${this.name} doesn't have a home yet`);
    } else {
      console.log(`${this.name} lives in ${this.home}`);
    }
  }
  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }
  getIsMale(): boolean {
    return this.isMale;
  }
  getIsAdult(): boolean {
    return this.isAdult;
  }

  getHome(): string | undefined {
    return this.home;
  }
  setHome(home: string | undefined): void {
    this.home = home;
  }
}
