import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebaseConfig";

export const deleteImagesFromFirebase = async(imagesUrl) => {
    const imageRef = ref(storage, imagesUrl);
    try {
        await deleteObject(imageRef);
        console.log("success delete images from firestorage")
    } catch (error) {
        console.error("Error deleting image:", error);
    }
}