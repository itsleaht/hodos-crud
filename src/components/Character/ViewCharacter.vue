<template>
<div id="view-character">
  <h2>Vue du personnage avec l'id {{ $route.params.id }}</h2>

  <router-link :to="{ name: 'editCharacter', params: { id: character.id }}" class="button is-warning">
    <span class="icon is-small">
      <i class="fas fa-edit"></i>
    </span>
    <span>Modifier</span>
  </router-link>

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

  <div class="table-container">
    <div v-for="(value, key, index) in character" :key="index" class="table-line">
      <div class="table-header">{{ fields[index] }}</div>
      <div class="table-content" v-if="Array.isArray(value)">
        <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
      </div>
      <td v-else>{{ value }}</td>
    </div>
  </div>
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
      fields: [
        'ID',
        'Nom',
        'Type',
        'Rôle',
        'Lieu de Rencontre',
        'Description',
        'Liens de parenté'
      ],
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

  a {
    position: absolute;
    right: 40px;
    top: 70px;
  }

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
      width: 800px;

      th {
        width: 200px;
      }
    }
  }
</style>
