<template>
  <div id="home">
    <div class="row container banner">
      <div class="d-none d-sm-block col-lg-7 banner-image">
        <img src="../assets/banner.jpg">
      </div>
      <div class="col-12 col-lg-5 banner-info">
        <h1>Find your home today with McMakler </h1>
        <p class="subtitle">Search homes and keep track of the ones you like. View our exclusive listings.</p>
        <button class="btn btn-outline-secondary">Add a Property</button>
      </div>
    </div>
    <div class="d-flex justify-content-center search-100">
      <div class="input-group rounded">
        <input type="search" class="form-control rounded border-0" placeholder="Search by city" aria-label="Search"
          aria-describedby="search-addon" />
        <span class="input-group-text border-0" id="search-addon">
          <font-awesome-icon icon="search" />
        </span>
      </div>
    </div>
    <div class="row container m-5 align-items-start">
      <div class="col-xs-12 simple-card d-flex flex-column align-items-center justify-content-around m-3">
        <img class="png" src="../assets/1.png">
        <p class="card-title">Properties</p>
      </div>
      <div class="col-xs-12 simple-card d-flex flex-column align-items-center justify-content-around m-3">
        <img class="png" src="../assets/2.png">
        <p class="card-title">Design</p>
      </div>
      <div class="col-xs-12 simple-card d-flex flex-column align-items-center justify-content-around m-3">
        <img class="png" src="../assets/3.png">
        <p class="card-title">Eco</p>
      </div>
      <div class="col-xs-12 d-flex flex-column align-items-start">
        <h2>Take a look</h2>
        <h2>on our <strong>premium</strong> list</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
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
  padding: 36px 52px;
}
p.subtitle {
  margin-top: 40px;
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
.input-group {
  width: 50%
}
img.png{
  height: 70%;
  width: 70%;
}
input[type=search] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  height: 60px;
}
p.card-title {
  font-size: 20px;
}

input[type=search]:focus {
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
}
</style>
