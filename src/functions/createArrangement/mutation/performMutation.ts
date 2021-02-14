import { Arrangement } from '../../../model/Arrangement';
import { getElite } from '../helpers/getElite';
import { mutate } from './simpleMutation';

export const deps = {
  getElite,
  mutate,
};

export const performMutation = (population: Arrangement[]): void => {
  const elite = getElite(population);
  let skippedElite = false;
  population.forEach((a) => {
    if (a !== elite || skippedElite) {
      deps.mutate(a);
    } else {
      skippedElite = true;
    }
  });
};
