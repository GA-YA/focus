import fs from 'fs';
import { FileCouldNotSaved } from './errors/errors.js';

export const saveFileToDisk = (oldPath, dir, fileName) => {
    try {
        const newPath = dir + '/' + fileName;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
        });
    } catch (e) {
        throw new FileCouldNotSaved();
    }
};
