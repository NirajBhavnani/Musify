<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/music-logo.png" alt="Logo" />
      <h1><router-link :to="{ name: 'home' }">Musify!</router-link></h1>
      <div class="links">
        <div v-if="user">
          <button @click="handleLogout" v-if="!isPending">Log out</button>
          <button v-if="isPending" disabled>Loading</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'signup' }"
            >Sign up</router-link
          >
          <router-link class="btn" :to="{ name: 'login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { user } = getUser();
    const { error, logout, isPending } = useLogout();
    const router = useRouter();

    const handleLogout = async () => {
      const res = await logout();
      if (!error.value) {
        console.log("User logged out");
        router.push({ name: "login" });
      }
    };

    return { error, handleLogout, isPending, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
</style>