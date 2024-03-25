/*
Function to copy non-permanent .bin sensor files from one directory to another
Uses the File System API: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

param: destinationHandle:  an input FileSystemDirectoryHandle object. Will be the destination of copied files
returns: -1 if an error occurred, 1 if the files were copied without errors
*/
const copySensorData = async (destinationHandle) => {
    try {
        //user enters sensor directory
        const sensorHandle = await window.showDirectoryPicker();

        //validate successfully returned a directory
        const sensorDirName = sensorHandle.name;
        if (sensorDirName === null) {
            console.err("Input Sensor Directory Is Null");
        }

        //iterate through files and directories
        for await (const [key, value] of sensorHandle.entries()) {  
            //key is the name of the file/directory, value is either a FileSystemFilehandle or a FileSystemDirectoryHandle
            if (key == "DEF_CONF.BIN" || key == "LOG" || key == "LOST.DIR" || key == ".fseventsd" || key == "CONF.BIN" || key == "System Volume Information" || key == ".TemporaryItems") {
                //don't copy permanent files
                continue;
            }
            if (value.kind === "directory" && /^(\d{2}_){2}\d{2}$/.test(key)) {   //enter the dated session folder
                
                //create or retrieve copy of directory with the same name at the destination
                const dated_folder_dir = await destinationHandle.getDirectoryHandle(key, { create: true });

                for await (const entry of value.values()) { //iterate through files in the folder

                    //get the File object
                    const sourceFile = await entry.getFile();
                    let fileName = entry.name;
                    
                    //distinguish between the L and R sensor meta data bin files
                    if (fileName == "MET_DAT.BIN") {
                        fileName = `Met_DAT_${sensorDirName}.BIN`
                    }

                    //create a file in the destination location with the same name
                    const newFileHandle =  await dated_folder_dir.getFileHandle(fileName, { create: true });

                    //copy contents from old file to new file

                    //prepare the data from the source file for writing to the new one
                    const sourceArrayBuffer = await sourceFile.arrayBuffer();
                    const sourceBlob = new Blob([sourceArrayBuffer]);
                    //open stream to new file and write data
                    const writableStream = await newFileHandle.createWritable();
                    await writableStream.write(sourceBlob);
                    await writableStream.close();
                }
            }
        }
        return 1;
    }
    catch (err) {
        console.log(err);
        return -1;
    }
}

export default copySensorData;