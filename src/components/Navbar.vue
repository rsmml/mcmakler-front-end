<template>
  <div id="navbar">
    <div>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        <!-- <div class="w-100 d-flex justify-content-center mt-2"> -->
          <!-- Title Left -->
          <b-navbar-brand>
            <router-link to="/">
              <h1 style="color: #2c3e52">McMackler</h1>
            </router-link>
          </b-navbar-brand>
          <!-- Links Center -->
          <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav class="d-flex align-items-center justify-content-center w-100">
              <div class="flex-grow-1">
                <b-nav-text>
                  <router-link to="/apartments" class="nav-link">
                    <p class="mb-0">Appartments</p>
                  </router-link>
                </b-nav-text>
                <b-nav-text>
                  <router-link to="/" class="nav-link">
                    <p class="mb-0">What's New</p>
                  </router-link>
                </b-nav-text>
                <b-nav-text>
                  <router-link to="/" class="nav-link">
                    <p class="mb-0">Premium Appartments</p>
                  </router-link>
                </b-nav-text>
                <b-nav-text>
                  <router-link  active-class="active"
                    :to="{ name: 'Add' }"
                    v-if="loggedIn()">
                    <a href="#" class="nav-link btn-yellow">Add Property</a>
                  </router-link>
                </b-nav-text>
                <b-nav-text>
                  <router-link to="/myappartments" class="nav-link" v-if="loggedIn()">
                    <p class="mb-0">My Properties</p>
                  </router-link>
                </b-nav-text>
              </div>

              <b-nav-text>
                <router-link to="/signin" class="nav-link btn nav-link" v-if="!loggedIn()">Sign In</router-link>
              </b-nav-text>
              <b-nav-text>
                <button to="/" class="btn nav-link" @click.prevent="logout()" v-if="loggedIn()">Log Out</button>
              </b-nav-text>
            </b-navbar-nav>
          </b-collapse>
        <!-- </div> -->
      </b-navbar>
    </div>
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
  .navbar-expand-lg .navbar-nav {
    flex-direction: column-reverse !important;
  }
</style>
