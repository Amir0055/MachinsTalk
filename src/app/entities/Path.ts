import { Parameterss } from './Parameterss';
import { RequestType } from './RequestType';
import { application } from './application';


export class Path {

    id!: number;
    name!: string;
    path!: string;
    requestType!: RequestType;

    parameters: Parameterss[] = [];
    application?: application;
  }


