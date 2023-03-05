import path from 'path';
import { fileURLToPath } from 'url';

export const currentDirname = (filePath: string) => {
    const filename = fileURLToPath(filePath);

    return path.dirname(filename);
}