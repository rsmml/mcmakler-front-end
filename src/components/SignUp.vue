<template>
  <div id="signup" class="wrapper fadeInDown w-100">
    <div id="formContent">
      <!-- Logo -->
      <div class="fadeIn first p-3">
        <img src="../assets/logo.png" id="icon" alt="Logo" style="height: 100px; width: 100px;" />
      </div>

      <!-- Login Form -->
      <form @submit.prevent="signup">
        <!-- eslint-disable-next-line -->
        <input v-model="email" type="text" id="login" class="fadeIn second" name="login" placeholder="E-mail">
        <!-- eslint-disable-next-line -->
        <input v-model="password" type="password" id="password" class="fadeIn third" name="login" placeholder="Password">
        <!-- eslint-disable-next-line -->
        <input v-model="password_confirmation" type="password" id="password" class="fadeIn third" name="login" placeholder="Repeat Password">
        <input type="submit" class="fadeIn fourth" value="Register">
      </form>

      <!-- Remind Passoword -->
      <div id="formFooter" class="d-flex flex-column">
        <router-link to="/signin" class="hover-dark-blue mt-2">Log In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { bus } from '../main'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
    // console.log(localStorage.signedIn)
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signup () {
      axios.post('http://localhost:3000/registrations', {
        user: {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
      },
      { withCredentials: true }
      )
        .then(response => this.signupSuccesful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccesful (response) {
      if (!response.data) {
        this.signunFailed(response)
      }
      localStorage.setItem('sessionId', response.data['session'].session_id)
      localStorage.setItem('signedIn', response.data.logged_in)
      localStorage.setItem('userId', response.data['session'].user_id)
      this.error = ''
      bus.$emit('refresh', 1)
      window.location.href = 'home'
    },
    signupFailed (error) {
      this.$alert('Something went wrong', 'Oops', 'error')
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.sessionId
      delete localStorage.signedIn
      delete localStorage.userId
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style scoped>
  /* BASIC */
  html {
    background-color: #56baed;
  }

  body {
    font-family: "Poppins", sans-serif;
    height: 100vh;
  }

  a {
    color: #92badd;
    display:inline-block;
    text-decoration: none;
    font-weight: 400;
  }

  h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display:inline-block;
    margin: 40px 8px 10px 8px;
    color: #cccccc;
  }

  /* STRUCTURE */

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 80vh;
    padding: 20px;
  }

  #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 95%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    text-align: center;
  }

  #formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
  }

  /* TABS */

  h2.inactive {
    color: #cccccc;
  }

  h2.active {
    color: #0d0d0d;
    border-bottom: 2px solid #5fbae9;
  }

  /* FORM TYPOGRAPHY*/

  input[type=button], input[type=submit], input[type=reset]  {
    background-color: #ffe300;
    border: none;
    color: #094951;
    font-weight: bolder;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
    background-color: #dbc407;
  }

  input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }

  input[type=text] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }

  input[type=text]:focus {
    background-color: #fff;
    border-bottom: 2px solid #ffe300;
  }

  input[type=text]:placeholder {
    color: #cccccc;
  }
  input[type=password] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }

  input[type=password]:focus {
    background-color: #fff;
    border-bottom: 2px solid #ffe300;
  }

  input[type=password]:placeholder {
    color: #cccccc;
  }
  /* ANIMATIONS */

  /* Simple CSS3 Fade-in-down Animation */
  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  /* Simple CSS3 Fade-in Animation */
  @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  .fadeIn {
    opacity:0;
    -webkit-animation:fadeIn ease-in 1;
    -moz-animation:fadeIn ease-in 1;
    animation:fadeIn ease-in 1;

    -webkit-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    animation-fill-mode:forwards;

    -webkit-animation-duration:0.3s;
    -moz-animation-duration:0.3s;
    animation-duration:0.3s;
  }

  .fadeIn.first {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .fadeIn.second {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .fadeIn.third {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .fadeIn.fourth {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  /* Simple CSS3 Fade-in Animation */
  .underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
  }

  .underlineHover:hover {
    color: #0d0d0d;
  }

  .underlineHover:hover:after{
    width: 100%;
  }
  /* OTHERS */

  *:focus {
    outline: none;
  }

  #icon {
    width:60%;
  }
  .hover-dark-blue:hover {
    color: rgba(0,0,0,0.7);
  }
</style>
