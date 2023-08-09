
import { Path } from './Path';
import { TypeTest } from './TypeTest';
export class Scenario {
    id!:number;
    name!: string;
    TypeTest!:TypeTest;
    scenario!: string;
    erreurMsg !: string;
    success !: boolean;
    pauseTime !: Date;
    eapsedTime !: number;
    duration !:Date;
    tryMax!:number;
    path!:Path;
  }
