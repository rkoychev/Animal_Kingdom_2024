import { lionFamilies } from "../constVariables";
import Lion from "../specificAnimalClasses/LionClass";
import { checkNameNotEmpty } from "../verificationFunction/inputCheck";
import verifyLionFamily, {
  verifyFamilyName,
} from "../verificationFunction/lionVerifications";
import { verifyAddingLion } from "../verificationFunction/lionVerifications";
export default class LionFamily {
  name: string;
  lions: Lion[] = [];
  constructor(name: string, lions: Lion[]) {
    checkNameNotEmpty(name);
    verifyFamilyName(name);
    verifyLionFamily(lions);
    this.name = name;
    this.lions.push(
      ...lions.map((lion) => {
        lion.setHome(this.name);
        return lion;
      })
    );
    lionFamilies.push(this);
  }
  addLion(lion: Lion): void {
    if (lion.getHome() !== undefined) {
      console.log(`${lion.getName()} already has a family`);
      return;
    }
    if (verifyAddingLion(this.lions, lion)) {
      lion.setHome(this.name);
      this.lions.push(lion);
      console.log(`Added ${lion.getName()} to ${this.name}`);
    }
  }
  addLionFromBirth(lion: Lion): void {
    lion.setHome(this.name);
    this.lions.push(lion);
  }
  removeLion(lion: Lion): void {
    lion.setHome(undefined);
    this.lions = this.lions.filter((lio) => lio !== lion);
    console.log(`${lion.getName()} has left ${this.name}`);
  }
}
