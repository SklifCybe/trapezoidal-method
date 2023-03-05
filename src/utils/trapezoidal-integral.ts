import { evaluate } from 'mathjs';

import type { IntegralVariables } from '../types/integral-variables.js';

const calcFunction = (calculations: string, x: number) => {
    const changedByX = calculations.replaceAll('x', x.toString());

    return evaluate(changedByX);
};

// todo: write unit test
// Начальная граница: 0
// Конечная граница: 1
// Число частичных интегралов: 5
// Функция: 2*2^x
// Знаков после запятой (опционально): 3
// Результат: 2.890
// calculator - https://planetcalc.ru/5494/#calculator6472
// habr - https://habr.com/ru/post/479202/
export const trapezoidalIntegral = ({
    startBorder,
    endBorder,
    countOfIntegral,
    functionByX,
    rounding = 2,
}: IntegralVariables) => {
    const width = (endBorder - startBorder) / countOfIntegral;

    let integral = 0;

    for (let step = 0; step < countOfIntegral; step++) {
        const x1 = startBorder + step * width;
        const x2 = startBorder + (step + 1) * width;

        integral += 0.5 * (x2 - x1) * (calcFunction(functionByX, x1) + calcFunction(functionByX, x2));
    }

    return integral.toFixed(rounding);
};
