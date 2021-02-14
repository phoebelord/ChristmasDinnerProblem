import { Arrangement } from '../../model/Arrangement';
import { Event } from '../../model/Event';
import { Guest } from '../../model/Guest';
import { shuffle } from './helpers/shuffle';
import { getElite } from './helpers/getElite';
import { performTournamentSelection } from './selection/performTournamentSelection';
import { getRandomSelection } from './helpers/getRandomSelection';
import { performOnePointCrossover } from './crossover/performOnePointCrossover';
import { removeWeakest } from './helpers/removeWeakest';
import { performMutation } from './mutation/performMutation';

export const GENERATION_SIZE = 100;
export const MAX_ITERATIONS = 1000;

export const deps = {
  shuffle,
  performTournamentSelection,
  getElite,
  getRandomSelection,
  performOnePointCrossover,
  removeWeakest,
  performMutation,
};

export const createArrangement = (event: Event): Arrangement => {
  let population = initialisePopulation(event.guests);
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    let nextGeneration: Arrangement[] = [];
    const selection = deps.performTournamentSelection(population);
    nextGeneration.push(deps.getElite(selection)); // elitism
    while (nextGeneration.length < GENERATION_SIZE) {
      const parents = deps.getRandomSelection(population, 2);
      const children = deps.performOnePointCrossover(parents);
      nextGeneration = nextGeneration.concat(children);
    }
    nextGeneration = deps.removeWeakest(nextGeneration);
    deps.performMutation(nextGeneration);
    population = nextGeneration;
  }

  const bestArrangement = deps.getElite(population);
  return bestArrangement;
};

const initialisePopulation = (guests: Guest[]) => {
  const initialPopulation: Arrangement[] = [];
  for (let i = 0; i < GENERATION_SIZE; i++) {
    const newGuests = [...guests];
    deps.shuffle(newGuests);
    initialPopulation.push(new Arrangement(newGuests));
  }
  return initialPopulation;
};
