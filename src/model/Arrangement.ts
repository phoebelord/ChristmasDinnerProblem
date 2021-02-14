import { Guest } from './Guest';

export class Arrangement {
  constructor(guests: Guest[]) {
    this.guests = guests;
    this.happiness = 0;
  }
  readonly guests: Guest[];
  readonly happiness: number;
}
