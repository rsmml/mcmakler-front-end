<template>
  <div id="app">
    <Navbar :key="componentKey" />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { bus } from './main'

export default {
  name: 'App',
  data () {
    return {
      componentKey: 0
    }
  },
  create () {
    bus.$on('refresh', (data) => {
      this.componentKey += data
    })
  },
  updated () {
    bus.$on('refresh', (data) => {
      this.componentKey += data
    })
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
