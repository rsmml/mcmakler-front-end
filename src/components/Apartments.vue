<template>
  <div id="apartments" class="mb-5">
    <!-- SEARCH -->
    <div id="search" class="d-flex justify-content-center search-100">
      <select v-model="searchType" @change="queryType" class="m-3 custom-select search-type" id="exampleFormControlSelect1">
        <option selected>Market</option>
        <option >Address</option>
        <option >State</option>
      </select>
      <div class="input-group rounded">
        <input @focus="searchActive" @blur="searchNoActive" type="text" v-model="search" class="form-control rounded border-0 m-3" placeholder="Berlin - Premium - Sell" aria-label="Search"
          aria-describedby="search-addon" />
      </div>
    </div>

    <ul id="list-properties" class="mt-2">
      <div v-if="search === null || search === '' ">
        <li v-for="property in properties" :key="property.id" class="m-3">
          <!-- Property Card -->
          <div class="card-trip">
            <h1 v-if="userId(property)" class="delete-btn" @click.prevent="deleteProperty(property)">+</h1>
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
      </div>
      <div v-else>
        <li v-for="property in filterProperties" :key="property.id" class="m-3">
          <!-- Property Card -->
          <div class="card-trip">
            <h1 v-if="userId(property)" class="delete-btn" @click.prevent="deleteProperty(property)">+</h1>
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
      </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Apartments',
  data () {
    return {
      properties: null,
      user_id: localStorage.userId,
      search: null,
      searchType: null,
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
    getPhotoId (id) {
      return require('../assets/Properties/' + id + '.jpg')
    },
    userId (property) {
      if (property.user_id === this.user_id) {
        console.log('yes')
      } else {
        return false
      }
    },
    searchActive () {
      this.searching = true
    },
    searchNoActive () {
      if (!this.search) {
        this.searching = false
      }
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
  .search-100 {
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
  .search-100 {
    width: 90%;
    margin: auto;
  }
}

@media (min-width: 1480px) {
  ul{
    width: 1400px;
    margin: auto;
    column-count: 3;
  }
  .search-100 {
    width: 1400px;
    margin: auto;
  }
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
input[type=text]:focus {
  -webkit-box-shadow: unset;
}
.search-type {
  height: 60px;
}
</style>
