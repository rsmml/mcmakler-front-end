<template>
  <div id="home">
    <div class="row container banner">
      <div class="d-none d-sm-block col-lg-7 banner-image">
        <img src="../assets/banner.jpg">
      </div>
      <div class="col-12 col-lg-5 banner-info">
        <h1>Real estate is sold with McMakler </h1>
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
input[type=search] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  height: 60px;
}

input[type=search]:focus {
  -webkit-box-shadow: unset;
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
  }
  .serach-100 {

  }
  .input-group {
    width: 100%
  }
}
</style>
