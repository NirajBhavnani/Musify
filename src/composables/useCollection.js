import { ref } from "vue";
import { firestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  // add a new document
  const addDoc = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await firestore.collection(collection).add(doc);
      isPending.value = false;
      return res; //storing the response object to fetch the id of doc
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
