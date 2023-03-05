import path from 'path';
import fs from 'fs/promises';

import { mathQuestions } from '../data/math-questions.js';
import { createFilename } from '../utils/create-filename.js';
import { currentDirname } from '../utils/current-dirnname.js';

import type { Interface } from 'readline/promises';

const textAfterWriteFile = (filepath: string, filename: string) =>
    [`Заполните значения переменных в файле ${filename}`, `Файл находится тут ${filepath}`].join('\n');

export const createExampleFile = async (commandLineInterface: Interface) => {
    const dirname = currentDirname(import.meta.url);
    const rootFolder = path.join(dirname, '../..');
    const examplesFolder = path.join(rootFolder, 'examples');
    const filename = await createFilename(examplesFolder);
    const filepath = path.join(examplesFolder, filename);

    try {
        await fs.writeFile(filepath, mathQuestions.join('\n'), 'utf-8');

        const text = textAfterWriteFile(filepath, filename);

        console.log(text);

        while (true) {
            const answer = await commandLineInterface.question('Введите ok, когда закончите заполнять файл: ');

            if (answer !== 'ok') {
                console.log('Некорректный ответ.');
                continue;
            }
            
            return filepath;
        }
    } catch {
        throw new Error('createExampleFile error');
    }
};
