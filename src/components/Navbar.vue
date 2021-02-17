<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light flex-column">
      <div class="w-100 d-flex justify-content-center mt-2">
        <!-- LEFT -->
        <h1>McMackler</h1>
        <!-- CENTER -->
        <div class="collapse navbar-collapse justify-content-center align-items-center" id="navbarSupportedContent">
          <ul class="navbar-nav align-items-center">
            <div class="d-flex align-items-center">
              <router-link to="/apartments" class="nav-link">
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
              <router-link to="/myappartments" class="nav-link" v-if="loggedIn()">
                <li class="nav-item">My Properties</li>
              </router-link>
            </div>
            <li><router-link  active-class="active"
              :to="{ name: 'Add' }"
              v-if="loggedIn()">
              <a href="#" class="nav-link btn-yellow">Add Property</a>
            </router-link></li>

            <!-- <router-link :to="{ name: 'add' }" class="nav-link" v-if="loggedIn()">
              <li class="nav-item btn-yellow"><a href="#" class="nav-link">Add Apartment</a></li>
            </router-link> -->
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
import { bus } from '../main'

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
      bus.$emit('refresh', 1)
      window.location.href = 'home'
    }
  }
}
</script>

<style scoped>
.btn-yellow {
  background-color: #ffe300;
  padding: 4px 12px;
  border-radius: 4px;
}
a:hover {
  text-decoration: none;
  color: #39393a;
}
h1 {
  font-weight: 700;
}
</style>
