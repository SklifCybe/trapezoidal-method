import { mathQuestions } from '../data/math-questions.js';
import { mathAnswerKeys } from '../data/math-answer-keys.js';
import { mapArrayToNumber } from '../utils/map-array-to-number.js';
import { getVariablesFromFile } from '../utils/get-variables-from-file.js';

import type { Interface } from 'readline/promises';

import type { IntegralVariables } from '../types/integral-variables.js';
import type { QuestionsAndAnswers } from '../types/questions-and-answers.js';

type Parameters =
    | {
          from: 'console';
          commandLineInterface: Interface;
      }
    | {
          from: 'file';
          filepath: string;
      };

export const enterVariables = async (params: Parameters): Promise<QuestionsAndAnswers> => {
    const answers: string[] = [];

    if (params.from === 'console') {
        const { commandLineInterface } = params;

        for (const question of mathQuestions) {
            try {
                const answer = await commandLineInterface.question(question);

                answers.push(answer);
            } catch {
                throw new Error('enterVariables error');
            }
        }
    }
    if (params.from === 'file') {
        const { filepath } = params;

        const variables = await getVariablesFromFile(filepath);

        answers.push(...variables);
    }

    const transformedAnswers = mapArrayToNumber(answers);
    const variables = transformedAnswers.reduce(
        (previous, current, index) => ({ ...previous, [mathAnswerKeys[index]]: current }),
        {} as IntegralVariables,
    );
    const allExample = mathQuestions.map((question, index) => question + transformedAnswers[index]).join('\n');

    return {
        variables,
        allExample,
    };
};
