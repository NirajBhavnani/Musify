import { storage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = storage.ref(filePath.value); //creating storage reference

    try {
      const res = await storageRef.put(file); //uploading the file wrt reference
      url.value = await res.ref.getDownloadURL(); //fetching the public URL of the uploaded file
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = storage.ref(path);

    try {
      await storageRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { error, url, filePath, uploadImage, deleteImage };
};

export default useStorage;
