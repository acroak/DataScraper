/*
Function to have the user select and return a FileSystemDirectoryHandle object. 
Uses the File System API: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

returns: -1 if an error occurred, else returns the FileSystemDirectoryHandle object 
*/
const getDestinationDir = async () => {
    try {
        const destDirHandle = await window.showDirectoryPicker();

        return destDirHandle;
    }
    catch (err) {
        console.log(err);
        return -1;
    }
}

export default getDestinationDir;