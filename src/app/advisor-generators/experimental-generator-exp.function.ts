import { IAdvisor } from "../interfaces/advisor.interface";
import { generateAdvisors as defaultGenerator } from './default-generator.function';
import { getPlaythroughNo } from "./utilities/experiment-playthrough.utils";

/**
 * Generated intervention advisors taken from `../notebooks/Generate NPCS.md`
 */
const interventionAdvisors = [
  {'cherishes': [8, 7, 0], 'despises': [4, 3, 5]},
  {'cherishes': [6, 5, 7], 'despises': [2, 1, 3]},
  {'cherishes': [1, 0, 2], 'despises': [6, 5, 7]}
];

/**
 * Generates `advisorCount` advisors such that they have two values they cherish, and two they despise.
 * The advisors are also generated such that they do not overlap on values.
 * @returns
 */
export function generateAdvisors(opts: {
  playerCharacterKey: string,
  maxAffinity: number,
  minAffinity: number,
}): IAdvisor[] {
  const newAdvisor = defaultGenerator({...opts, advisorCount: 1})[0];
  newAdvisor.name = 'Your Advisor';

  const playthroughNo = getPlaythroughNo();

  newAdvisor.cherishes = interventionAdvisors[playthroughNo - 1].cherishes;
  newAdvisor.despises = interventionAdvisors[playthroughNo - 1].despises;

  return [newAdvisor];
}
