<!--4.3 видео.  -->
<!-- шаблон -->
<template>
  <!-- скопир из html -->
  <section id="main">
    <div class="container">
      <h1>WP. 4 видео. + 4.13. mes: {{ 4.13 }}</h1>
    </div>
  </section>
</template>

<!-- скрипт -->
  <!-- 4.12 видео. указ data -->
  <!-- 4.14 видео. объяв mess по defaul = null -->
  <!-- 4.15 видео.созд created  -->
<script>
export default {
  data() {
    return {
      message: "Example Vue component",
    };
  },
  created () {
    this.message = 'helloy 4.15'
  }
};
</script>

<!-- стили scss -->
<style lang="scss" scoped>
h1 {
  color: green;
}

</style>
<!--
.container {
  text-align: center;
}
img {
  max-width: 200px;
}
-->