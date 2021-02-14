import { Arrangement } from '../../../model/Arrangement';
import { getElite } from '../helpers/getElite';
import { shuffle } from '../helpers/shuffle';

export const TOURNAMENT_SIZE = 20;

export const deps = {
  getElite,
  shuffle,
};

export const performTournamentSelection = (population: Arrangement[]): Arrangement[] => {
  const selection = [];
  selection.push(deps.getElite(population)); // elitism
  for (let i = 1; i < TOURNAMENT_SIZE; i++) {
    selection.push(tournamentWinner(population));
  }
  return selection;
};

// The tournament winner is the best arrangement in a random selection
const tournamentWinner = (population: Arrangement[]): Arrangement => {
  const tournamentSelection = getTournamentSelection(population);
  return deps.getElite(tournamentSelection);
};

// Get n random arrangements (n = TOURNAMENT_SIZE)
const getTournamentSelection = (population: Arrangement[]) => {
  const populationCopy = [...population];
  deps.shuffle(populationCopy);
  return populationCopy.splice(0, TOURNAMENT_SIZE);
};
