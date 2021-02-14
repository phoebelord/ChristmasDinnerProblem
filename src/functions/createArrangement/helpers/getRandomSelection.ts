import { Arrangement } from '../../../model/Arrangement';
import { shuffle } from './shuffle';

export const deps = {
  shuffle,
};

export const getRandomSelection = (population: Arrangement[], n: number): Arrangement[] => {
  const copy = [...population];
  deps.shuffle(copy);
  return copy.splice(0, n);
};
