import { environment } from './../../../../environments/environment';
import { IAdvisor } from 'src/app/functions/generate-advisors';
import { GameResources } from './../resources/resources';
import { IAction, ActionValueEffects } from './../../../functions/generate-actions';

export function executeActionEffects(action: IAction) {
  console.log(action);
  const clamp = (value: number, min: number, max: number) => {
    return Math.floor(Math.max(min, Math.min(value, max)));
  }

  const maxAffinity = environment.maxAffinity;
  const minAffinity = environment.minAffinity;

  GameResources.advisorList.forEach(advisor => {
    const promotedValues = action.promotes;
    const harmedValues = action.harms;

    let affinity = advisor.affinityMap.get(environment.playerCharacterKey)?.affinity as number;

    promotedValues.forEach(val => {
      affinity += determineEffect(ActionValueEffects.PROMOTE, val, advisor);
      affinity = clamp(affinity, minAffinity, maxAffinity);
      // console.log(affinity);
    });

    harmedValues.forEach(val => {
      affinity += determineEffect(ActionValueEffects.HARM, val, advisor);
      affinity = clamp(affinity, minAffinity, maxAffinity);
      console.log(affinity);
    });

    const newAffinity = {
      name: environment.playerCharacterKey,
      affinity,
    }
    advisor.affinityMap.set(environment.playerCharacterKey, newAffinity);
  });
}

function determineEffect(actionEffect: ActionValueEffects, valueIdx: number, onAdvisor: IAdvisor): number {
  const cherishesValue = onAdvisor.cherishes.includes(valueIdx);
  const despisesValue = onAdvisor.despises.includes(valueIdx);

  if (!cherishesValue && !despisesValue) {
    return 0;
  }

  if (cherishesValue) {
    return actionEffect === ActionValueEffects.HARM ? -1 : 1;
  } else {
    return actionEffect === ActionValueEffects.PROMOTE ? -1 : 1;
  }
}