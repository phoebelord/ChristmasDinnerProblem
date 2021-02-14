import { Arrangement } from '../../../model/Arrangement';

export const getElite = (population: Arrangement[]): Arrangement => {
  return population.reduce((a, b) => (a.happiness >= b.happiness ? a : b));
};
