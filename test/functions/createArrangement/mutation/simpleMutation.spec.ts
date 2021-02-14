import { deps, mutate, MUTATION_RATE } from '../../../../src/functions/createArrangement/mutation/simpleMutation';
import { Arrangement } from '../../../../src/model/Arrangement';
import { A, B, C } from '../../../mockGuests';

const getRandomMock = jest.fn();
const getRandomIntMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  deps.getRandom = getRandomMock;
  deps.getRandomInt = getRandomIntMock;
});

test('Correctly mutates when rand < MUTATION_RATE', () => {
  const arrangement = new Arrangement([A, B, C]);

  getRandomMock.mockReturnValue(0);
  getRandomIntMock.mockReturnValueOnce(0);
  getRandomIntMock.mockReturnValueOnce(1);

  mutate(arrangement);

  const expectedArrangement = new Arrangement([B, A, C]);

  expect(getRandomMock).toBeCalledTimes(1);
  expect(getRandomIntMock).toBeCalledWith(3);
  expect(getRandomIntMock).toBeCalledTimes(2);
  expect(arrangement).toEqual(expectedArrangement);
});

test("Doesn't mutate when rand = MUTATION_RATE", () => {
  const arrangement = new Arrangement([A, B, C]);

  getRandomMock.mockReturnValue(MUTATION_RATE);

  mutate(arrangement);

  const expectedArrangement = new Arrangement([A, B, C]);
  expect(arrangement).toEqual(expectedArrangement);

  expect(getRandomMock).toBeCalledTimes(1);
  expect(getRandomIntMock).toBeCalledTimes(0);
});

test("Doesn't mutate when rand > MUTATION_RATE", () => {
  const arrangement = new Arrangement([A, B, C]);

  getRandomMock.mockReturnValue(MUTATION_RATE + 1);

  mutate(arrangement);

  const expectedArrangement = new Arrangement([A, B, C]);
  expect(arrangement).toEqual(expectedArrangement);

  expect(getRandomMock).toBeCalledTimes(1);
  expect(getRandomIntMock).toBeCalledTimes(0);
});
