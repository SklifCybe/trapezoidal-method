import { text } from '../data/text-for-choose-method.js';

import type { Interface } from 'readline/promises';

export const chooseMethod = async (commandLineInterface: Interface): Promise<1 | 2> => {
    text.beforeChoose.forEach((text) => console.log(text));

    try {
        while (true) {
            const result = await commandLineInterface.question(text.question);
            const answerNumber = Number(result);

            if (answerNumber !== 1 && answerNumber !== 2) {
                console.log(text.incorrectAnswer);
                continue;
            }
            
            return answerNumber;
        }
    } catch {
        throw new Error('chooseLogic error');
    }
};
