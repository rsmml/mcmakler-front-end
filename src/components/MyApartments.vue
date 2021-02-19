<template>
  <div id="my-apartments" class="mb-5">

    <ul id="list-properties" class="mt-2">
      <li v-for="property in properties" :key="property.id" class="m-3">
        <!-- Property Card -->
        <b-button @click="$bvModal.show(`modal-center-${property.id}`)">
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
        </b-button>

        <b-modal :id="`modal-center-${property.id}`"
          centered
          header-class="modal-header-property"
          content-class="modal-content-property"
          footer-class="modal-footer-property"
          >
          <div class="card-trip card-trip-modal" style="box-shadow: none">
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
        </b-modal>

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
    column-count: 2; /* For when the standard gets fully supported */
    width: 100%;
    margin: auto;
  }
}

@media (min-width: 1000px) {
  ul {
    width: 90%;
    margin: auto;
    column-count: 3;
  }
}

@media (min-width: 1480px) {
  ul{
    width: 1400px;
    margin: auto;
    column-count: 3;
  }
}
.delete-btn {
  rotate: 45deg;
  position: absolute;
  top: auto;
  left: unset;
  color: black;
  -webkit-text-stroke: 1px white;
  margin: 0;
  cursor: pointer;
  margin-left: 12px;
}
.btn-secondary {
  background-color: transparent;
  border: transparent;
}
.btn-secondary:active {
  background-color: transparent;
  border: transparent;
}
.btn-secondary:not(:disabled):not(.disabled):active{
  background-color: transparent;
  border: transparent;
}

/deep/ .modal-header-property {
  display: none !important;
  border: none !important;
}
/deep/ .modal-content-property {
  /*display: none !important;*/
  background-color: transparent;
  border: none !important;
}

/deep/ .modal-footer-property {
  display: none !important;
  border: none !important;
}
/deep/ .modal {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
/deep/ .modal-dialog {
  max-width: none !important;
  max-height: none !important;
  margin: 30px 30px !important;
  width: 800px !important;
  height: 400px !important;
}
.card-trip-modal {
  height: 500px;
}
.card-trip-modal img {
  height: 325px;
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
  color: #26475b;
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
