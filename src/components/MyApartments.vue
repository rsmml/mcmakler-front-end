<template>
  <div id="my-apartments">
    <ul id="list-properties">
      <li v-for="property in properties" :key="property.id">
        <!-- Property Card -->
        <div class="card-trip">
          <h1 class="delete-btn" @click.prevent="deleteProperty(property)">+</h1>
          <img :src="getPhotoId(property.photo_id)" />
          <div class="card-trip-infos text-left">
            <div>
              <h2>{{ property.address }}</h2>
              <p>Size: {{ property.size}}m2</p>
              <p>Rooms: {{ property.rooms}}</p>
              <p>Construction year: {{ property.construction_year}}</p>
              <p>Type: {{ property.property_type}}</p>
              <p>State: {{ property.state_property}}</p>
            </div>
            <div class="text-right">
              <p class="market-text text-center">{{ property.market}}</p>
              <h2>EUR</h2>
              <h2 class="card-trip-pricing">{{ property.market.toLowerCase() === 'rent' ? property.price : property.price * 100 }}</h2>
            </div>
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
  },
  methods: {
    getPhotoId (id) {
      return require('../assets/Properties/' + id + '.jpg')
    },
    deleteProperty (property) {
      this.$confirm('You are about to delete this property', 'Are you sure?', 'question', 'reverse-button').then(() => {
        axios.delete(`http://localhost:3000/api/v1/properties/${property.id}`)
          .then(response => {
            this.properties.splice(this.properties.indexOf(property), 1)
          })
          .catch(error => error)
      })
    }
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
  transition: 0.2s ease;
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
.delete-btn {
  rotate: 45deg;
  position: absolute;
  top: auto;
  left: unset;
  color: black;
  -webkit-text-stroke: 1px white;
  background-color: rgba(0,0,0,0.2);
  border-radius: 50%;
  padding: 0px 13px 4px 13px;
  margin: 0;
  cursor: pointer;
}

p.market-text{
  background-color: #ffe400;
  padding: 4px 12px;
  font-size: 16px;
  font-weight: bolder;
  color: black;
}
.card-trip .card-trip-infos {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
}

.card-trip:hover {
  transform: scale(1.05);
}

.card-trip-infos .card-trip-user {
  position: absolute;
  right: 16px;
  top: -20px;
  width: 40px;
}
</style>
