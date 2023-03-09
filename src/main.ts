import { createInterface } from 'readline/promises';

import { trapezoidalIntegral } from './utils/trapezoidal-integral.js';
import { enterVariables } from './service/enter-variables.js';
import { chooseMethod } from './service/choose-method.js';
import { createExampleFile } from './service/create-example-file.js';
import { writeResult } from './service/write-result.js';

import type { IntegralVariables } from './types/integral-variables.js';
import type { QuestionsAndAnswers } from './types/questions-and-answers.js';

async function main() {
    console.log('\x1b[34mРешение определённых интегралов, методом трапеций.', '\x1b[0m');

    const commandLineInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    try {
        const method = await chooseMethod(commandLineInterface);

        let questionsAndAnswers: QuestionsAndAnswers = {
            variables: {},
            allExample: '',
        };

        if (method === 1) {
            questionsAndAnswers = await enterVariables({ from: 'console', commandLineInterface });
        }
        if (method === 2) {
            const filepath = await createExampleFile(commandLineInterface);

            questionsAndAnswers = await enterVariables({ from: 'file', filepath });
        }

        const mathResult = trapezoidalIntegral(questionsAndAnswers.variables as NonNullable<IntegralVariables>);

        await writeResult(mathResult, questionsAndAnswers.allExample);

        commandLineInterface.close();
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

main();
