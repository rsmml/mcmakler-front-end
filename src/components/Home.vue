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
.search {
  position: absolute;
  bottom: 0;
}

@media (max-width: 767px){
  h1 {
    white-space: normal;
    position: unset;
    padding: 0;
  }
}
</style>
