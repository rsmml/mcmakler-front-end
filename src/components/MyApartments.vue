<template>
  <div id="my-apartments" class="mb-5" :key="componentKey">
    <ul id="list-properties" class="mt-2">
      <li v-for="property in properties" :key="property.id" class="m-3">
        <!-- Property Card -->
        <b-button @click="$bvModal.show(`modal-center-${property.id}`)">
          <div class="card-trip scale">
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
            <div class="btns-card">
              <button v-if="!editing" @click.prevent="editProperty(property)" class="m-3 btn btn-light">Edit</button>
              <button v-if="editing" @click.prevent="cancelProperty(property)" class="m-3 btn btn-warning">Cancel</button>
              <button @click.prevent="deleteProperty(property)" class="m-3 btn btn-dark">Delete</button>
            </div>
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

          <div v-if="property === editedProperty" style="background-color: white;">
            <form class="container" @submit.prevent="updateProperty(property)">
              <div class="row">
                <!-- ONE -->
                <div class="col-12 col-lg-12 px-3 text-left" v-bind:class="{ one: columOne }">
                  <div class="form-group">
                    <label for="text" class="">Address*</label>
                    <input v-model="newAddress" class="form-control" id="name" aria-describedby="emailHelp" :placeholder="property.address">
                  </div>
                  <div class="form-group">
                    <label for="text" class="">Size* /m²</label>
                    <input v-model="newRooms" class="form-control" id="name" aria-describedby="emailHelp" :placeholder="property.size">
                  </div>
                  <!-- Next -->
                  <div class="mb-1">
                    <button  @click.prevent="secondColumn" type="submit" class="btn btn-dark w-100 my-1">Next Step</button>
                  </div>
                </div>
                <!-- TWO -->
                <div class="col-12 col-lg-12 px-3 text-left" v-bind:class="{ two: columTwo }">
                  <div class="form-group">
                    <label for="text" class="">Rooms*</label>
                    <input v-model="newRooms" class="form-control" id="name" aria-describedby="emailHelp" :placeholder="property.rooms">
                  </div>
                  <div class="form-group">
                    <label for="text" class="">Construction Year*</label>
                    <input v-model="newConstructionYear" class="form-control" id="name" aria-describedby="emailHelp" :placeholder="property.construction_year">
                  </div>
                  <div class="mb-1">
                    <button  @click.prevent="thirdColumn" type="submit" class="btn btn-dark w-100">Next Step</button>
                  </div>
                </div>
                <!-- THREE -->
                <div class="col-12 col-lg-12 text-left" v-bind:class="{ three: columThree }">
                  <div class="form-group">
                    <label for="text" class="">Type*</label>
                    <select v-model="newPropertyType" class="custom-select my-1 mr-sm-2" id="exampleFormControlSelect1">
                      <option selected>Apartmet</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="text" class="">State*</label>
                    <select v-model="newStateProperty" class="custom-select my-1 mr-sm-2" id="exampleFormControlSelect1">
                      <option selected>Premium</option>
                      <option>Normal</option>
                      <option>Simple</option>
                    </select>
                  </div>
                  <div class="mb-1">
                    <button  @click.prevent="fourColumn" type="submit" class="btn btn-dark w-100">Next Step</button>
                  </div>
                </div>
                <!-- FOUR -->
                <div class="col-12 col-lg-12 text-left" v-bind:class="{ four: columFour }">
                  <div class="form-group">
                    <label for="text" class="">Market*</label>
                    <div class="d-flex mt-1">
                      <div class="form-check mr-5">
                        <input v-model="newMarket" class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="sell" checked>
                        <label class="form-check-label" for="gridRadios1">
                          Sell
                        </label>
                      </div>
                      <div class="form-check">
                        <input v-model="newMarket" class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="rent" checked>
                        <label class="form-check-label" for="gridRadios1">
                          Rent
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="text" class="">Price*</label>
                    <input v-model="newPrice" class="form-control" id="name" aria-describedby="emailHelp" :placeholder="property.price">
                  </div>
                  <!-- SUBMIT -->
                  <div class="mb-1">
                    <button type="submit" class="btn btn-dark w-100">Update Apartment</button>
                  </div>
                </div>
              </div>
            </form>
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
      componentKey: 0,
      editing: false,
      columOne: false,
      columTwo: true,
      columThree: true,
      columFour: true,
      properties: null,
      editedProperty: '',
      newAddress: '',
      newSize: '',
      newRooms: '',
      newConstructionYear: '',
      newPropertyType: '',
      newStateProperty: '',
      newMarket: '',
      newPrice: ''
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
    },
    editProperty (property) {
      this.editedProperty = property
      this.editing = true
    },
    cancelProperty () {
      this.editing = false
      this.editedProperty = ''
    },
    secondColumn () {
      this.columOne = true
      this.columTwo = false
    },
    thirdColumn () {
      this.columTwo = true
      this.columThree = false
    },
    fourColumn () {
      this.columThree = true
      this.columFour = false
    },
    updateProperty (property) {
      axios.patch(`http://localhost:3000/api/v1/properties/${property.id}`, {
        address: this.newAddress,
        size: this.newSize,
        construction_year: this.newConstructionYear,
        rooms: this.newRooms,
        price: this.newPrice,
        property_type: this.newPropertyType,
        state_property: this.newStateProperty,
        market: this.newMarket,
        user_id: localStorage.userId
      },
      { withCredentials: true }
      )
        .then(response => this.edited(response))
        .catch(error => error)
    },
    edited (response) {
      if (response.data.status === 401) {
        this.$alert('We cannot edit your apartment at the moment', 'Something went wrong...', 'warning')
      } else {
        this.$alert('Apartment Edited!', 'success')
        // setTimeout(window.location.href = 'myappartments', 3000)
      }
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
  .btns-card {
    position: absolute;
    display: flex;
    flex-direction: column;
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
    height: 470px;
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

  .scale:hover {
    transform: scale(1.05);
  }
  .form-group {
    margin-bottom: 0;
  }

  .card-trip-infos .card-trip-user {
    position: absolute;
    right: 16px;
    top: -20px;
    width: 40px;
  }
  .one {
    display: none;
  }
  .two {
    display: none;
  }
  .three {
    display: none;
  }
  .four {
    display: none;
  }
</style>
