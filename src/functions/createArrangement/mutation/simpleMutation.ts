import { Arrangement } from '../../../model/Arrangement';
import { getRandomInt } from '../helpers/getRandomInt';

export const MUTATION_RATE = 0.01;

export const deps = {
  getRandom: Math.random,
  getRandomInt,
};

export const mutate = (arrangement: Arrangement): void => {
  const rand = deps.getRandom();
  if (rand < MUTATION_RATE) {
    const guests = arrangement.guests;
    const i = deps.getRandomInt(guests.length);
    const j = deps.getRandomInt(guests.length);
    [guests[i], guests[j]] = [guests[j], guests[i]];
  }
};
