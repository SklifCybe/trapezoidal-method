import fs from 'fs/promises';

const getNumberInFilename = (filename: string) => {
    const lastDashIndex = filename.lastIndexOf('-') + 1;
    const dotIndex = filename.indexOf('.');

    return Number(filename.slice(lastDashIndex, dotIndex));
};

const getFilenameWithIndex = (index: number) => `task-${index}.txt`;

export const createFilename = async (folderPath: string) => {
    try {
        const files = await fs.readdir(folderPath);

        files.sort((leftFile, rightFile) => getNumberInFilename(rightFile) - getNumberInFilename(leftFile));

        const lastFile = files.length >= 1 ? files[0] : getFilenameWithIndex(0);
        
        const numberLastFile = getNumberInFilename(lastFile);

        const newIndex = numberLastFile + 1;

        return getFilenameWithIndex(newIndex);
    } catch {
        throw new Error('createFilename error');
    }
};
