import { Parameterss } from './Parameterss';
import { application } from './application';


export class Path {

    id!: number;
    name!: string;
    path!: string;
    requestType!: RequestType;

    parameters: Parameterss[] = [];
    application?: application;
  }
  enum RequestType {
    get,
    post,
    put,
    delete,

  }

