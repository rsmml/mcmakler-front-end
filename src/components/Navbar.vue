<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light flex-column">
      <div class="w-100 d-flex justify-content-center mt-4">
        <!-- LEFT -->
        <h1>McMackler</h1>
        <!-- CENTER -->
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <router-link to="/appartments" class="nav-link">
              <li class="nav-item">
                <p class="mb-0">Appartments</p>
              </li>
            </router-link>
            <router-link to="/" class="nav-link">
              <li class="nav-item">
                <p class="mb-0">What's New</p>
              </li>
            </router-link>
            <router-link to="/" class="nav-link">
              <li class="nav-item">Premium Appartments</li>
            </router-link>
            <router-link to="/" class="nav-link">
              <li class="nav-item d-flex justify-content-between align-items-center" style="color: #5bb4e0;">
                <p class="mb-0 mr-1">On Sale</p>
              </li>
            </router-link>
            <router-link to="/newappartment" class="nav-link" v-if="loggedIn()">
              <li class="nav-item">Add Appartment</li>
            </router-link>
          </ul>
        </div>
        <!-- RIGHT -->
        <div class="d-flex justify-content-end align-items-center pr-5">
          <!-- eslint-disable-next-line -->
          <router-link to="/signin" class="nav-link btn nav-link" v-if="!loggedIn()">Sign In</router-link>
          <button to="/" class="btn nav-link" @click.prevent="logout()" v-if="loggedIn()">Log Out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Navbar',
  methods: {
    loggedIn () {
      if (localStorage.signedIn) {
        return true
      } else {
        return false
      }
    },
    logout () {
      axios.delete('http://localhost:3000/logout', { withCredentials: true })
        .then(response => this.logoutSuccesful(response))
        .catch(error => console.log(error))
    },
    logoutSuccesful (response) {
      delete localStorage.sessionId
      delete localStorage.signedIn
      delete localStorage.userId
    }
  }
}
</script>

<style>
</style>
