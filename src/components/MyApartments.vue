<template>
  <div id="my-apartments">
    <ul id="list-properties">
      <li v-for="property in properties" :key="property.id">

        <div class="card-trip">
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
          <div class="card-trip-infos">
            <div>
              <h2>{{ property.address }}</h2>
              <p>Size: {{ property.size}}m2</p>
              <p>Rooms: {{ property.rooms}}</p>
              <p>Construction year: {{ property.construction_year}}</p>
              <p>Type: {{ property.property_type}}</p>
              <p>State: {{ property.state_property}}</p>
            </div>
            <p>{{ property.market}}</p>
            <h2 class="card-trip-pricing">{{ property.price }}</h2>
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyApartments',
  data () {
    return {
      properties: null
    }
  },
  created () {
    axios.get('http://localhost:3000/api/v1/my_properties', { withCredentials: true })
      .then(response => {
        this.properties = response.data['properties']
      })
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.card-trip {
  overflow: hidden;
  background: white;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  /*width: 400px;*/
}

.card-trip > img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.card-trip h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.card-trip p {
  font-size: 12px;
  opacity: .7;
  margin: 0;
}

.list {
  column-count: 2;
  column-gap: 5px;
  padding: 5px;
}
@media (min-width: 767px){
  ul {
    -moz-column-count: 2; /* For FireFox */
    -webkit-column-count: 2; /* For Safari/Chrome */
    column-count: 3; /* For when the standard gets fully supported */
  }
}

.card-trip .card-trip-infos {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
}

.card-trip-infos .card-trip-user {
  position: absolute;
  right: 16px;
  top: -20px;
  width: 40px;
}
</style>
