import { getElite } from '../../../../src/functions/createArrangement/helpers/getElite';
import { Arrangement } from '../../../../src/model/Arrangement';
import { A, B } from '../../../mockGuests';

test('Returns the item with the highest happiness', () => {
  const population: Arrangement[] = [
    { guests: [], happiness: 1 },
    { guests: [], happiness: 2 },
  ];

  const elite = getElite(population);
  expect(elite).toEqual({ guests: [], happiness: 2 });
});

test('Returns the first item with the highest happiness', () => {
  const population: Arrangement[] = [
    { guests: [A], happiness: 1 },
    { guests: [B], happiness: 1 },
  ];

  const elite = getElite(population);
  expect(elite).toEqual({ guests: [A], happiness: 1 });
});
