<template>
  <form @submit.prevent="handleLogin">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const { error, login } = useLogin();

    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      const res = await login(email.value, password.value);
      if (!error) {
        console.log("User logged in");
      }
    };

    return { email, password, handleLogin, error };
  },
};
</script>

<style>
</style>