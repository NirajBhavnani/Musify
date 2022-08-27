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
    <input type="file" />
    <div class="error"></div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const title = ref("");
    const description = ref("");

    const handleCreate = () => {};

    return { title, description, handleCreate };
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