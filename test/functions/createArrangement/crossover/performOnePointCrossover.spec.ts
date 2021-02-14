import {
  performOnePointCrossover,
  deps,
} from '../../../../src/functions/createArrangement/crossover/performOnePointCrossover';
import { Arrangement } from '../../../../src/model/Arrangement';
import { A, B, C, D, E } from '../../../mockGuests';

const getRandomIntMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  deps.getRandomInt = getRandomIntMock;
});

test('Correctly performs One Point Crossover - Crossover Point = 2', () => {
  const parents = [new Arrangement([A, B, C, D, E]), new Arrangement([C, B, A, E, D])];
  getRandomIntMock.mockReturnValueOnce(2);

  const children = performOnePointCrossover(parents);
  expect(children.length).toEqual(2);
  expect(children[0]).toEqual(new Arrangement([A, B, C, E, D]));
  expect(children[1]).toEqual(new Arrangement([C, B, A, D, E]));
});

test('Correctly performs One Point Crossover - Crossover Point = 0', () => {
  const parents = [new Arrangement([A, B, C, D, E]), new Arrangement([C, B, A, E, D])];
  getRandomIntMock.mockReturnValueOnce(0);

  const children = performOnePointCrossover(parents);
  expect(children.length).toEqual(2);
  expect(children[0]).toEqual(new Arrangement([A, C, B, E, D]));
  expect(children[1]).toEqual(new Arrangement([C, A, B, D, E]));
});

test('Correctly performs One Point Crossover - Crossover Point = 4', () => {
  const parents = [new Arrangement([A, B, C, D, E]), new Arrangement([C, B, A, E, D])];
  getRandomIntMock.mockReturnValueOnce(4);

  const children = performOnePointCrossover(parents);
  expect(children.length).toEqual(2);
  expect(children[0]).toEqual(new Arrangement([A, B, C, D, E]));
  expect(children[1]).toEqual(new Arrangement([C, B, A, E, D]));
});

test('Throws an error if one parent is supplied', () => {
  const parents = [new Arrangement([A, B, C, D, E])];

  expect(() => performOnePointCrossover(parents)).toThrow('Must supply exactly 2 parents');
  expect(getRandomIntMock).toHaveBeenCalledTimes(0);
});

test('Throws an error if three parents are supplied', () => {
  const parents = [
    new Arrangement([A, B, C, D, E]),
    new Arrangement([A, B, C, D, E]),
    new Arrangement([A, B, C, D, E]),
  ];

  expect(() => performOnePointCrossover(parents)).toThrow('Must supply exactly 2 parents');
  expect(getRandomIntMock).toHaveBeenCalledTimes(0);
});
