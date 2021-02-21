<template>
  <div id="home" class="my-3">
    <div class="row container banner">
      <div class="d-none d-sm-block col-lg-7 banner-image">
        <img src="../assets/banner.jpg" id="banner">
      </div>
      <div class="col-12 col-lg-5 banner-info">
        <h1>Find your home today with McMakler </h1>
        <p class="subtitle">When you’re ready for a change, we’re ready to help.</p>
        <router-link  active-class="active"
          :to="{ name: 'Add'}"
          @click="refresh()">
          <button class="btn btn-outline-secondary" @click="refresh()">Add a Property</button>
        </router-link>
      </div>
    </div>
        <!-- SEARCH -->
    <div id="search" class="d-flex justify-content-center search-100">
      <select v-model="searchType" @change="queryType" class="custom-select search-type" id="exampleFormControlSelect1">
        <option selected>Market</option>
        <option >Address</option>
        <option >State</option>
      </select>
      <div class="input-group rounded">
        <input @focus="searchActive" @blur="searchNoActive" type="text" v-model="search" class="form-control rounded border-0" placeholder="Premium | Normal | Simple" aria-label="Search"
          aria-describedby="search-addon" />
      </div>
    </div>

    <!-- SEAR RESULTS -->
    <div v-if="searching" class="smooth-search">
      <div v-if="search === null" class="d-none d-sm-block img-search m-3">
        <img src="../assets/search-01.png" alt="">
      </div>
      <div v-if="search != null" class="img-search m-3">
        <ul id="list-properties">
          <li v-for="property in filterProperties" :key="property.id">
            <!-- Property Card -->
            <div class="card-trip">
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
                  <h2 class="card-trip-pricing">{{ property.market === 'Rent' ? property.price : property.price * 100 }}</h2>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '../main'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      search: null,
      searchType: null,
      properties: null,
      searching: false,
      notFound: false,
      query: null
    }
  },
  created () {
    axios.get('http://localhost:3000/api/v1/properties', { withCredentials: true })
      .then(response => {
        this.properties = response.data['properties']
      })
      .catch(error => console.log(error))
  },
  methods: {
    refresh () {
      bus.$emit('refresh', 1)
    },
    searchActive () {
      this.searching = true
    },
    searchNoActive () {
      if (!this.search) {
        this.searching = false
      }
    },
    getPhotoId (id) {
      return require('../assets/Properties/' + id + '.jpg')
    },
    queryType () {
      if (this.searchType === 'State') {
        this.query = 'state_property'
      } else if (this.searchType === 'Address') {
        this.query = 'address'
      } else if (this.searchType === 'Market') {
        this.query = 'market'
      }
    }
  },
  computed: {
    filterProperties () {
      return this.properties.filter((property) => {
        if (property[this.query].match(this.search)) {
          return property[this.query].match(this.search)
        }
      })
    }
  }
}
</script>

<style scoped>
  img {
    width: 100%;
  }
  h1 {
    position: relative;
    height: max-content;
    white-space: nowrap;
    top: 40px;
    right: 100px;
    background-color: white;
    padding: 36px 0px;
  }
  p.subtitle {
    font-size: 24px;
    width: 150%;
    text-align: initial;
  }
  .banner-info{
    height: 70vh;
  }
  .banner {
    height: 54vh;
  }
  .search {
    position: absolute;
    bottom: 0;
  }
  .search-type {
    width: 16%;
    z-index: 1;
    height: 60px;
  }
  .input-group {
    width: 50%
  }
  img.png{
    height: 70%;
    width: 70%;
  }
  input[type=text] {
    background-color: #004b56;
    border: none;
    color: white;
    height: 60px;
  }
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: white;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: white;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: white;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: white;
  }
  p.card-title {
    font-size: 20px;
  }

  input[type=text]:focus {
    -webkit-box-shadow: unset;
  }
  .simple-card{
    height: 209px;
    width: 209px;
    background-color: white;
    transition: 0.3s ease;
  }
  .simple-card:hover {
    background-color: #ffe300;
    transform: scale(1.1);
  }
  .btn-outline-secondary {
    padding: 12px 56px;
  }
  .btn-outline-secondary:hover {
    background-color: #ffe300;
    color: #2c3e52;
    border-color: #ffe300;
  }
  .img-search img{
    transition: 1s ease;

  }

  @media (max-width: 767px){
    h1 {
      white-space: normal;
      position: unset;
      padding: 0;
    }
    .banner {
      height: max-content;
    }
    .banner-info{
      height: max-content;
      margin-bottom: 24px;
    }
    .serach-100 {

    }
    .input-group {
      width: 100%
    }
    #search {
      flex-direction: column;
      width: 90%;
      margin: auto;
    }
    #exampleFormControlSelect1{
      width: 100%;
      margin-bottom: 12px;
    }
    p.subtitle {
      width: 100%;
    }
  }

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
    li.navbar-text {
      padding: 0;
    }
    a.nav-link {
      padding: 0px;
    }
    img#banner{
      /*display: none;*/
    }
    #home {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1{
      top: 0;
      right: 0;
      white-space: unset;
    }
    p.subtitle {
      width: auto;
      margin: 12px 0 !important;
    }
    #search {
      width: 100%;
    }
  }
  @media (min-width: 1400px) {
    #home {
      width: 1400px;
      margin: auto
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
