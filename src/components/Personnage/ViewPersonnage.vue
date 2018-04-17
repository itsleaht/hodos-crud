<template>
<div id="view-personnage">
  <h2>Vue du personnage avec l'id {{ $route.params.id }}</h2>

  <div class="images">
    <figure class="image">
      <img :src="src.profile">
      <figcaption>Image de profil</figcaption>
    </figure>
    <figure class="image">
      <img :src="src.map">
      <figcaption>Image sur la map</figcaption>
    </figure>

  </div>

  <table class="table">
    <tr v-for="(value, key, index) in personnage" :key="index">
      <th>{{ key }}</th>
      <td v-if="Array.isArray(value)">
        <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
      </td>
      <td v-else>{{ value }}</td>
    </tr>
  </table>

</div>
</template>

<script>

export default {
  name: 'view-personnage',
  components: {},
  data () {
    return {
      src: {
        'profile': '',
        'map': ''
      },
      personnage: {},
      personnageId: this.$route.params.id
    }
  },
  methods: {
    loadImages (imagePath) {
      this.$http.get(`http://localhost:3000/api/images/${imagePath}/${this.personnageId}/jpg`).then(response => {
        if (response.body.length) {
          console.log(imagePath)
          this.src[imagePath] = response.url
        } else {
          this.src[imagePath] = 'https://bulma.io/images/placeholders/1280x960.png'
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.$http.get(`http://localhost:3000/api/characters/${this.personnageId}`).then((response) => {
      this.personnage = JSON.parse(response.bodyText)
    })
  },
  mounted () {
    const imageSrcArrays = Object.keys(this.src)
    console.log(imageSrcArrays)
    for (let i = 0; i < imageSrcArrays.length; i++) {
      this.loadImages(imageSrcArrays[i])
    }
  }
}
</script>

<style lang="scss" scoped>
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;

    > figure {
      margin: 15px;
      max-width: 350px;
    }
  }

  table {
    margin: 0 auto;
    width: 100%;
  }
</style>
