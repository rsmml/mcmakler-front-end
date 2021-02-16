<template>
  <div id="signin" class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <img src="" id="icon" alt="Logo" />
      </div>

      <!-- Login Form -->
      <form @submit.prevent="signin">
        <!-- eslint-disable-next-line -->
        <input v-model="email" type="text" id="login" class="fadeIn second" name="login" placeholder="E-mail">
        <!-- eslint-disable-next-line -->
        <input v-model="password" type="password" id="password" class="fadeIn third" name="login" placeholder="Password">
        <input type="submit" class="fadeIn fourth" value="Log In">
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter" class="d-flex flex-column">
        <router-link to="/" class="hover-dark-blue">Forgot Password?</router-link>
        <router-link to="/signup" class="hover-dark-blue mt-2">New Here?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn'
}
</script>

<style>
</style>
