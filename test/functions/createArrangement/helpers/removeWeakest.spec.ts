import { removeWeakest } from '../../../../src/functions/createArrangement/helpers/removeWeakest';
import { Arrangement } from '../../../../src/model/Arrangement';

test('Removes weakest item', () => {
  const population: Arrangement[] = [
    { guests: [], happiness: 0 },
    { guests: [], happiness: 1 },
    { guests: [], happiness: 2 },
  ];

  const result = removeWeakest(population);

  expect(result).toEqual([
    { guests: [], happiness: 1 },
    { guests: [], happiness: 2 },
  ]);
});

test('Removes only the first instance of the weakest item', () => {
  const population: Arrangement[] = [
    { guests: [], happiness: 0 },
    { guests: [], happiness: 0 },
    { guests: [], happiness: 0 },
  ];

  const result = removeWeakest(population);

  expect(result).toEqual([
    { guests: [], happiness: 0 },
    { guests: [], happiness: 0 },
  ]);
});
