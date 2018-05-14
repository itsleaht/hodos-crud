<template>
<div id="view-character">
  <h2>Vue du personnage avec l'id {{ $route.params.id }}</h2>

  <div class="images">
    <figure class="image">
      <a :href="src.profile" target="_blank">
        <img :src="src.profile">
      </a>
      <figcaption>Image de profil</figcaption>
    </figure>
    <figure class="image">
      <a :href="src.map" target="_blank">
        <img :src="src.map">
      </a>
      <figcaption>Image sur la map</figcaption>
    </figure>

  </div>

  <table class="table">
    <tr v-for="(value, key, index) in character" :key="index">
      <th>{{ key }}</th>
      <td v-if="Array.isArray(value)">
        <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
      </td>
      <td v-else>{{ value }}</td>
    </tr>
  </table>
  <toggle-data :data="character"/>
</div>
</template>

<script>
import ToggleData from './../ToggleData'

export default {
  name: 'view-character',
  components: {ToggleData},
  data () {
    return {
      src: {
        'profile': '',
        'map': ''
      },
      character: {},
      characterId: this.$route.params.id
    }
  },
  methods: {
    loadImages (imagePath) {
      this.$http.get(`${this.$API_URL}/api/images/${imagePath}/${this.characterId}/jpg`).then(response => {
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
    this.$http.get(`${this.$API_URL}/api/characters/view.php?id=${this.characterId}`).then((response) => {
      this.character = JSON.parse(response.bodyText)
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

  #view-character {
    margin-bottom: 50px;

    .images {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-end;

      > figure {
        margin: 15px;
        width: 300px;

        img {
          width: auto;
          height: 300px;
          margin: 0 auto;
        }

        figcaption {
          color: grey;
          font-size: 12px;
          padding: 5px;
        }
      }
    }

    table {
      margin: 0 auto;
      min-width: 800px;
    }
  }
</style>
