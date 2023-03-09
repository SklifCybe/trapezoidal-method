import { evaluate } from 'mathjs';

import type { IntegralVariables } from '../types/integral-variables.js';

const calcFunction = (calculations: string, x: number) => {
    const changedByX = calculations.replaceAll('x', x.toString());

    return evaluate(changedByX);
};

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
