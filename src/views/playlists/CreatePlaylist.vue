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
    <button v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Creating...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    // allowed file types
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const router = useRouter();

    const handleCreate = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid, //it will be used to identify which user created that playlist
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value, //it will be used to delete the image in future
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({ name: "playlistDetails", params: { pid: res.id } });
        }
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

    return {
      title,
      description,
      handleCreate,
      handleFile,
      fileError,
      isPending,
    };
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