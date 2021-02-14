import { Guest } from './Guest';
import { Table } from './Table';

export interface Event {
  name: string;
  guests: Array<Guest>;
  tables: Array<Table>;
}
