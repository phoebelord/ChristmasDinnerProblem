import { deps, getRandomSelection } from '../../../../src/functions/createArrangement/helpers/getRandomSelection';
import { Arrangement } from '../../../../src/model/Arrangement';

const shuffleMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  deps.shuffle = shuffleMock;
});

test('Returns 2 items and original population is unchanged', () => {
  const population: Arrangement[] = [
    { guests: [], happiness: 0 },
    { guests: [], happiness: 1 },
    { guests: [], happiness: 2 },
  ];

  shuffleMock.mockImplementationOnce((a: Arrangement[]) => {
    [a[0], a[2]] = [a[2], a[0]];
  });

  const selection = getRandomSelection(population, 2);

  expect(selection).toEqual([
    { guests: [], happiness: 2 },
    { guests: [], happiness: 1 },
  ]);

  expect(population).toEqual([
    { guests: [], happiness: 0 },
    { guests: [], happiness: 1 },
    { guests: [], happiness: 2 },
  ]);

  expect(shuffleMock).toHaveBeenCalled();
});
