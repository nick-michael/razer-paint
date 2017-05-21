const {dialog} = require('electron').remote;
var fs = require('fs');

export const saveFile = (content) => {
    dialog.showSaveDialog((fileName) => {
        if (fileName === undefined){
            return;
        }
        fileName += '.rzp';
        // fileName is a string that contains the path and filename created in the save file dialog.  
        fs.writeFile(fileName, content, (err) => {
            if(err){
                alert("An error ocurred creating the file "+ err.message)
            }
                        
            alert("The file has been succesfully saved");
        });
    }); 
};

export const loadFile = (loadToState) => {
    dialog.showOpenDialog((fileNames) => {
        if(fileNames === undefined){
            console.log("No file selected");
            return;
        }
        const filePath = fileNames[0];

        if (filePath.substr(-4) !== '.rzp') {
            alert('Invalid file selected');
        }

        fs.readFile(fileNames[0], 'utf-8', (err, data) => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }

            // Change how to handle the file content
            loadToState(JSON.parse(data));
        });
    }); 
};