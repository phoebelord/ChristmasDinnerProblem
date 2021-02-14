import { getRandomInt, deps } from '../../../../src/functions/createArrangement/helpers/getRandomInt';

const randomMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  deps.random = randomMock;
});

test('Returns 4', () => {
  randomMock.mockReturnValueOnce(0.9);
  const result = getRandomInt(5);

  expect(result).toEqual(4);
});

test('Returns 0', () => {
  randomMock.mockReturnValueOnce(1);
  const result = getRandomInt(0);

  expect(result).toEqual(0);
});
