import { ICanSwim } from "../interfaces/ICanSwim";
import Animal from "./Animal";

export default abstract class Reptile extends Animal implements ICanSwim{

    swim() {
        console.log(`${this.name} is swiming`);
      }

    giveBirth(): void{

    };
}
  