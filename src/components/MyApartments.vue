<template>
  <div id="my-apartments">

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyApartments',
  data () {
    return {
      properties: {}
    }
  },
  created () {
    axios.get('http://localhost:3000/api/v1/my_properties')
      .then(response => {
        console.log(response)
        // this.properties = response.data.properties
      })
      .catch(error => console.log(error))
    // console.log(this.properties)
  }
}
</script>

<style>
</style>
