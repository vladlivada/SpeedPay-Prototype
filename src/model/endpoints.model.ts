export interface Endpoints {
  base: string;
  operations: {[key: string]: PathObject | any};
}

type PathObject = {
  path: string;
};
