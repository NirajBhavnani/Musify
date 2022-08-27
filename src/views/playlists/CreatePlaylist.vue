<template>
  <form @submit.prevent="handleCreate">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"
    ></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleFile" />
    <div class="error">{{ fileError }}</div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";

export default {
  setup() {
    const { url, filePath, uploadImage } = useStorage();

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);

    // allowed file types
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const handleCreate = async () => {
      if (file.value) {
        await uploadImage(file.value);
      }
    };

    // when we fire an event like this, we get access to an event object as an automatic argument
    // from this event object, we get information about the file that's selected
    const handleFile = (e) => {
      const selected = e.target.files[0]; //to access the selected file object

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file(png, jpeg/jpg)";
      }
    };

    return { title, description, handleCreate, handleFile, fileError };
  },
};
</script>

<style>
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>