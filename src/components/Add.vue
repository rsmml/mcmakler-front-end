<template>
  <div v-if="signedIn()">
    <div id="add" class="row">
      <!-- Banner -->
      <div class="vertical-banner p-4 col-12 col-lg-3">
        <img src="../assets/add.png" alt="" class="d-none d-sm-block">
        <p class="my-3"><strong>Ready to list your apartment?</strong></p>
        <p>No need to answer any question, give us the apartment information and we will do the rest.</p>
      </div>
      <div class="col-12 col-lg-9">
        <!-- Form -->
        <div class="d-flex">
          <!-- Left Column -->
          <div class="w-50 p-3 text-left">
            <div class="pl-3">
              <h3>Time to list some <strong>Apartments</strong> 🎉</h3>
              <p>In order to update an <strong>apartment</strong> please provide us with some information:</p>
            </div>
            <hr>
            <div class="form-group">
              <label for="text" class="my-3">Address*</label>
              <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="Kollwitzstraße 66, 10435 Berlin">
              <!-- <div class="invalid-feedback">Name is required.</div> -->
              <!-- <small class="text-success">Please provide a name</small> -->
            </div>
            <div class="form-group">
              <label for="text" class="my-3">Size*</label>
              <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="110 m²">
            </div>
            <div class="form-group">
              <label for="text" class="my-3">Construction year*</label>
              <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="2020">
            </div>
            <div class="form-group">
              <label for="text" class="my-3">Rooms*</label>
              <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="4">
            </div>
          </div>
          <!-- Right Column -->
          <div class="w-50 p-3 language-rules">
            <div class="text-left">
              <h3>Price your property 💰 </h3>
              <p>Please give us a <strong>price</strong>, and we will come back to you:</p>
              <p class="pt-2">(prices are in euros)</p>
            </div>
            <div class="text-left mt-3">
              <div class="form-group">
                <label for="text" class="my-3">Rent Price*</label>
                <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="1200">
              </div>
              <div class="form-group">
                <label for="text" class="my-3">Selling Price*</label>
                <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="680.000">
              </div>
              <div class="form-group">
                <label for="text" class="my-3">Property Type* (select a type)</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>Apartmet</option>
                </select>
              </div>
              <div class="form-group">
                <label for="text" class="my-3">Property State* (select a type)</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>Premium</option>
                  <option>Normal</option>
                  <option>Simple</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
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
  methods: {
    signedIn () {
      return localStorage.signedIn
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

.language-rules{
  background-color: rgba(0,0,0, 0.1);
  width: max-content;
  height: max-content;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2)
}
</style>
