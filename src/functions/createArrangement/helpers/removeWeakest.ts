import { Arrangement } from '../../../model/Arrangement';

export const removeWeakest = (population: Arrangement[]): Arrangement[] => {
  const worst = population.reduce((a, b) => (a.happiness <= b.happiness ? a : b));
  return population.filter((a) => a !== worst);
};
