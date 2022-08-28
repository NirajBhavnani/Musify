<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="cover" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete playlist</button>
    </div>

    <div class="song-list">
      <p>Song list</p>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  props: ["pid"],
  // in order to use pid inside setup, accept props as a parameter
  setup(props) {
    // we are referring document as playlist
    const { error, document: playlist } = getDocument("playlists", props.pid);
    const { user } = getUser();
    const { deleteDoc } = useDocument("playlists", props.pid);
    const { deleteImage } = useStorage();

    const router = useRouter();

    // making a computed property, since user value can change and ownership is dependent on user
    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath); //deleting the image from storage associated with the doc
      await deleteDoc();

      router.push({ name: "home" });
    };

    return { error, playlist, ownership, deleteDoc, handleDelete };
  },
};
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>