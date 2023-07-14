import { Parameterss } from './Parameterss';


export class Path {

    id!: number;
    name!: string;
    path!: string;
    requestType!: RequestType;

    parameters!: Parameterss[];

  }
  enum RequestType {
    GET,
    POST,
    PUT,
    DELETE,

  }

