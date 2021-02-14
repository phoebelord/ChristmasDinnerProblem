import { Arrangement } from '../../../model/Arrangement';
import { getRandomInt } from '../helpers/getRandomInt';

export const deps = {
  getRandomInt,
};

export const performOnePointCrossover = (parents: Arrangement[]): Arrangement[] => {
  if (parents.length !== 2) {
    throw new Error('Must supply exactly 2 parents');
  }

  const parent1 = parents[0];
  const parent2 = parents[1];
  const numGuests = parent1.guests.length;
  const crossoverPoint = deps.getRandomInt(numGuests);

  const child1 = [];
  const child2 = [];

  // Copy the children from one parent up to the crossover point
  for (let i = 0; i <= crossoverPoint; i++) {
    child1.push(parent1.guests[i]);
    child2.push(parent2.guests[i]);
  }

  // Add the remaining guests in the order they appear in the other parent
  for (let i = 0; i < numGuests; i++) {
    if (!child1.includes(parent2.guests[i])) {
      child1.push(parent2.guests[i]);
    }

    if (!child2.includes(parent1.guests[i])) {
      child2.push(parent1.guests[i]);
    }
  }

  return [new Arrangement(child1), new Arrangement(child2)];
};
