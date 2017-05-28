import { compressAnimation, decompressAnimation } from './frame';

const { dialog } = require('electron').remote;
const fs = require('fs');

export const saveFile = (content) => {
    dialog.showSaveDialog((fileName) => {
        if (fileName === undefined) {
            return;
        }

        const compressedAnimation = compressAnimation(content.animate);

        const saveData = JSON.stringify({
            ...content,
            frame: content.frame,
            animate: compressedAnimation,
        });

        const suffexedFileName = fileName.substr(-4) === '.rzp' ? fileName : `${fileName}.rzp`;        
        fs.writeFile(suffexedFileName, saveData, (err) => {
            if (err) {
                alert(`An error ocurred creating the file ${err.message}`);
            }

            alert('The file has been succesfully saved');
        });
    });
};

export const openFile = (loadToState) => {
    dialog.showOpenDialog((fileNames) => {
        if (fileNames === undefined) {
            console.log('No file selected');
            return;
        }
        const filePath = fileNames[0];

        if (filePath.substr(-4) !== '.rzp') {
            alert('Invalid file selected');
        }

        fs.readFile(fileNames[0], 'utf-8', (err, data) => {
            if (err) {
                alert(`An error ocurred reading the file :${err.message}`);
                return;
            }

            const saveData = JSON.parse(data);
            const decompressedAnimation = decompressAnimation(saveData.animate);

            const decompressedData = {
                ...saveData,
                frame: saveData.frame,
                animate: decompressedAnimation,
            };

            // Change how to handle the file content
            loadToState(decompressedData);
        });
    });
};
