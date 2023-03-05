import { createInterface } from 'readline/promises';

import { trapezoidalIntegral } from './utils/trapezoidal-integral.js';
import { enterVariables } from './service/enter-variables.js';
import { chooseMethod } from './service/choose-method.js';
import { createExampleFile } from './service/create-example-file.js';

import type { IntegralVariables } from './types/integral-variables.js';
import type { QuestionsAndAnswers } from './types/questions-and-answers.js';

// todo: добавить вывод результатов вычисления в файл. также нужно добавить allExample, там содержится и ответы и вопросы
// todo: выделить заголовок другим цветом. может возникнуть проблема с тем что, в файлы будет записываться цвет
// todo: придумать как можно сгенерить exe file под винду и исполняемый файл под мак
// todo: написать класс ошибок, аргументы будут следующие: файл, имя функции, ?.дополнительное сообщение и переписать все throw new Error на этот класс

// Задача:
// Ввод данных из файла и с клавиатуры и вывод результата в файл и на экран
async function main() {
    console.log('Решение определённых интегралов, методом трапеций.');

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

        console.log(`Результат: ${mathResult}`);
        console.log(questionsAndAnswers.allExample);

        commandLineInterface.close();
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

main();
