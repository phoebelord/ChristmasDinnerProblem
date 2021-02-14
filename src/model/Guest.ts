import { Relationship } from './Relationship';

export interface Guest {
  id: string;
  name: string;
  relationships: Array<Relationship>;
}
