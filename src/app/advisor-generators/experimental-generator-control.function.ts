import { IAdvisor } from "../interfaces/advisor.interface";
import { selectRandom } from '../shared/utilities/random.utility';
import { VALUE_LIST } from '../shared/utilities/values.utility';
import { generateAdvisors as defaultGenerator } from './default-generator.function';
import { getPlaythroughNo } from './utilities/experiment-playthrough.utils';


/**
 * Generated control advisors taken from `../notebooks/Generate NPCS.md`
 */
const controlAdvisors = [
  {'cherishes': [3, 7, 2], 'despises': [0, 6, 5]},
  {'cherishes': [0, 3, 5], 'despises': [6, 4, 2]},
  {'cherishes': [0, 4, 6], 'despises': [3, 1, 5]}
]

const remainingValueIndices = VALUE_LIST.map((_, idx) => idx);
/**
 * Generates exactly one advisor with completely random attitudes towards values and starts
 * with 0 affinity toward the player.
 * @returns
 */
export function generateAdvisors(opts: {
  playerCharacterKey: string,
  maxAffinity: number,
  minAffinity: number,
}): IAdvisor[] {
  const playthroughNo = getPlaythroughNo();

  const newAdvisor = defaultGenerator({...opts, advisorCount: 1})[0];
  newAdvisor.name = 'Your Advisor';

  newAdvisor.cherishes = controlAdvisors[playthroughNo - 1].cherishes;
  newAdvisor.despises = controlAdvisors[playthroughNo - 1].despises;

  return [newAdvisor];
}

function selectValueWithoutReplacement(valueIdx: number) {
  remainingValueIndices.splice(remainingValueIndices.findIndex(idx => idx === valueIdx), 1);
  return valueIdx;
}

