import fs from 'fs/promises';

export const getVariablesFromFile = async (filepath: string) => {
    try {
        const textFile = await fs.readFile(filepath, 'utf-8');
        const textLines = textFile.split('\n');

        return textLines.map((line) => {
            const colonIndex = line.indexOf(':');

            const answer = line.slice(colonIndex + 1);

            return answer.trim();
        });
    } catch {
        throw new Error('getVariablesFromFile error');
    }
}