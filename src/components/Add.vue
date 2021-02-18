<template>
  <div v-if="signedIn()">
    <div id="add" class="row">
      <!-- Banner -->
      <div class="vertical-banner p-4 col-12 col-lg-3">
        <img src="../assets/add.png" alt="" class="d-none d-lg-block">
        <p class="my-3 title-banner"><strong>Ready to list your apartment?</strong></p>
        <p>No need to answer any question, give us the apartment information and we will do the rest.</p>
      </div>
      <div class="col-12 col-lg-9">
        <!-- Form -->
        <form class="container pt-5">
          <div class="row">
            <!-- Left Column -->
            <div class="col-12 col-lg-6 w-50 p-3 text-left">
              <div class="pl-3">
                <h3>Time to list some <strong>Apartments</strong> 🎉</h3>
                <p>In order to update an <strong>apartment</strong> please provide us with some information:</p>
              </div>
              <hr>
              <div class="form-group">
                <label for="text" class="my-3">Address*</label>
                <input v-model="address" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Kollwitzstraße 66, 10435 Berlin">
                <!-- <div class="invalid-feedback">Name is required.</div> -->
                <!-- <small class="text-success">Please provide a name</small> -->
              </div>
              <div class="form-group">
                <label for="text" class="my-3">Size*</label>
                <input v-model="size" class="form-control" id="name" aria-describedby="emailHelp" placeholder="110 m²">
              </div>
              <div class="form-group">
                <label for="text" class="my-3">Construction year*</label>
                <input v-model="year" class="form-control" id="name" aria-describedby="emailHelp" placeholder="2020">
              </div>
              <div class="form-group">
                <label for="text" class="my-3">Rooms*</label>
                <input v-model="rooms" class="form-control" id="name" aria-describedby="emailHelp" placeholder="4">
              </div>
            </div>
            <!-- Right Column -->
            <div class="col-12 col-lg-6 w-50 p-3 grey-background">
              <div class="text-left">
                <h3>Price your property 💰 </h3>
              </div>
              <div class="text-left mt-3">
                <p>What do you want to do with your apartment?*</p>
                <div class="d-flex mt-1">
                  <div class="form-check mr-5">
                    <input v-model="market" class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="sell" checked>
                    <label class="form-check-label" for="gridRadios1">
                      Sell
                    </label>
                  </div>
                  <div class="form-check">
                    <input v-model="market" class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="rent" checked>
                    <label class="form-check-label" for="gridRadios1">
                      Rent
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="text" class="mt-1">Price in <strong>EUR</strong>*</label>
                  <input v-model="price" class="form-control" id="name" aria-describedby="emailHelp" placeholder="680.000">
                </div>
                <div class="form-group">
                  <label for="text" class="mt-1">Property Type* (select a type)</label>
                  <select v-model="type" class="custom-select my-1 mr-sm-2" id="exampleFormControlSelect1">
                    <option selected>Apartmet</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="text" class="my-1 mr-2">Property State* (select a type)</label>
                  <select v-model="state" class="custom-select my-1 mr-sm-2" id="exampleFormControlSelect1">
                    <option selected>Premium</option>
                    <option>Normal</option>
                    <option>Simple</option>
                  </select>
                </div>
              </div>
              <!-- Image Uploader -->
              <form>
                <h4 class="text-left">Upload images</h4>
                <div class="custom-file">
                  <input type="file" multiple="multiple" class="custom-file-input" id="customFile" @change="onFileSelected">
                  <label class="custom-file-label text-left" for="customFile">Choose file</label>
                </div>
              </form>
            </div>
          </div>
        </form>
        <!-- Button -->
        <div class="mb-5">
          <button  @click.prevent="addApartment" type="submit" class="btn btn-dark w-100 mt-5">Upload Apartment</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Add',
  created () {
    this.signedIn()
  },
  data () {
    return {
      address: '',
      size: '',
      year: '',
      rooms: '',
      price: '',
      type: '',
      state: '',
      market: '',
      photo: null
    }
  },
  methods: {
    signedIn () {
      return localStorage.signedIn
    },
    addApartment () {
      const fd = new FormData()
      fd.append('image', this.photo, this.photo.name)

      axios.post('http://localhost:3000/api/v1/properties', {
        address: this.address,
        size: this.size,
        construction_year: this.year,
        rooms: this.rooms,
        price: this.price,
        property_type: this.type,
        state_property: this.state,
        market: this.market,
        user_id: localStorage.userId
      },
      { withCredentials: true }
      )
        .then(response => this.created(response))
        .catch(error => this.error(error))
    },
    created (response) {
      if (response.data.status === 'created') {
        this.$alert('Apartment added', 'Thank you!', 'success')
        console.log(response)
      } else {
        this.$alert('We cannot add your apartment at the moment', 'Something went wrong...', 'error')
      }
    },
    error (error) {
      if (error) {
        this.$alert('We cannot add your apartment at the moment', 'Something went wrong...', 'error')
      }
    },
    onFileSelected (event) {
      this.photo = event.target.files[0]
    }
  }
}
</script>

<style scoped>
#add {
  /*height: 80vh;*/
}

.vertical-banner{
  /*height: 80vh;*/
  background-color: #f2f2f2;
  width: 300px;
  padding-bottom: 36px;
}

.row {
  margin:0;
}

img {
  width: 100%;
}

hr {
  width: 15%;
  border: 5px solid #004b56;
  margin-left: 0;
}

.grey-background{
  background-color: rgba(0,0,0, 0.1);
  width: max-content;
  height: max-content;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2)
}
@media (max-width: 767px) {
  .vertical-banner {
    display: none;
  }
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: #ffe400;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #d5bf05; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
