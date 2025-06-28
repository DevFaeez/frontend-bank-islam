import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";


export const uploadImagesToFirebase = (file, location) => {
    return new Promise((resolve, reject) => {

        const metadata = {
            contentType: file.type || 'application/octet-stream'
}       ;


        if (!file) {
            console.error("No file selected");
            reject("No file selected");
            return;
        }

        const storageRef = ref(storage, location + "/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload to ${location}: ${progress.toFixed(2)}% done`);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default: 
                        console.log("default")
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.error('Unauthorized access');
                        break;
                    case 'storage/canceled':
                        console.warn('Upload canceled');
                        break;
                    case 'storage/unknown':
                        console.error('Unknown error:', error.serverResponse);
                        break;
                    default:
                    console.error(error.message);
                    break;
                }
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((err) => reject(err));
            }
        );
    });
};
