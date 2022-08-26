<template>
  <form @submit.prevent="handleSignup">
    <h3>Signup</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const handleSignup = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        console.log("User signed up");
      }
    };

    return { email, password, displayName, handleSignup, error, isPending };
  },
};
</script>

<style>
</style>