import path from 'path';
import fs from 'fs/promises';

import { createFilename } from '../utils/create-filename.js';
import { currentDirname } from '../utils/current-dirnname.js';

const removeUndefinedFromString = (str: string) => str.replaceAll('undefined', '');

export const writeResult = async (result: string, variables: string) => {
    const dirname = currentDirname(import.meta.url);
    const rootFolder = path.join(dirname, '../..');
    const resultFolder = path.join(rootFolder, 'result');
    const filename = await createFilename(resultFolder);
    const filepath = path.join(resultFolder, filename);
    const resultString = `Результат: ${result}`;

    console.log(resultString);

    const filteredVariables = removeUndefinedFromString(variables);

    try {
        await fs.writeFile(filepath, filteredVariables + '\n' + resultString, 'utf-8');

        console.log(`Результаты записаны в ${filepath}`);
    } catch {
        throw new Error('writeResult error');
    }

};