import { deps, performMutation } from '../../../../src/functions/createArrangement/mutation/performMutation';
import { Arrangement } from '../../../../src/model/Arrangement';
import { A, B, C } from '../../../mockGuests';

const getEliteMock = jest.fn();
const mutateMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  deps.getElite = getEliteMock;
  deps.mutate = mutateMock;
});

test("Doesn't call mutate on the elite", () => {
  const population = [new Arrangement([A, B, C]), new Arrangement([C, B, A])];

  getEliteMock.mockReturnValueOnce(population[0]);
  mutateMock.mockImplementationOnce((a: Arrangement) => {
    [a.guests[1], a.guests[2]] = [a.guests[2], a.guests[1]];
  });

  performMutation(population);

  const expectedPopulation = [new Arrangement([A, B, C]), new Arrangement([C, A, B])];
  expect(population).toEqual(expectedPopulation);
  expect(mutateMock).toBeCalledTimes(1);
  expect(mutateMock).toBeCalledWith(population[1]);
});

test('Only skips the first instance of the elite', () => {
  const population = [new Arrangement([A, B, C]), new Arrangement([C, B, A]), new Arrangement([A, B, C])];

  getEliteMock.mockReturnValueOnce(population[0]);
  mutateMock.mockImplementation((a: Arrangement) => {
    [a.guests[1], a.guests[2]] = [a.guests[2], a.guests[1]];
  });

  performMutation(population);

  const expectedPopulation = [new Arrangement([A, B, C]), new Arrangement([C, A, B]), new Arrangement([A, C, B])];
  expect(population).toEqual(expectedPopulation);
  expect(mutateMock).toBeCalledTimes(2);
});
