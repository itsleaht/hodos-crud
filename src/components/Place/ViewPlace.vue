<template>
<div id="view-place">

  <h2>Vue du lieu avec l'id {{ $route.params.id }}</h2>

  <router-link :to="{ name: 'editPlace', params: { id: place.id }}" class="button is-warning editBtn">
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    <span>Modifier</span>
  </router-link>
  <div class="imagesFiles">
    <figure class="image">
      <a :href="src" target="_blank">
        <img :src="src">
      </a>
      <figcaption>Image du lieu</figcaption>
    </figure>
  </div>
    <div class="table-container">
      <div v-for="(value, key, index) in place" :key="index" class="table-line">
        <div class="table-header">{{ fields[index] }}</div>
        <div class="table-content" v-if="Array.isArray(value)">
          <p v-for="(val, index2) in value" :key="index2"> {{val}} </p>
        </div>
        <td v-else>{{ value }}</td>
      </div>
    </div>
  <toggle-data :data="place" />
  </div>
</template>

<script>
import ToggleData from './../ToggleData'

export default {
  name: 'view-personnage',
  components: {ToggleData},
  data () {
    return {
      place: {},
      placeId: this.$route.params.id,
      fields: [
        'ID',
        'Nom',
        'Description',
        'Chapitres concernés'
      ],
      src: ''
    }
  },
  methods: {
    loadImage () {
      this.$http.get(`${this.$API_URL}/api/uploads/places/${this.placeId}.png`).then(response => {
        if (response.body.length) {
          this.src = response.url
        } else {
          this.src = 'https://bulma.io/images/placeholders/1280x960.png'
        }
      }).catch(err => {
        console.log('View Place : load Image error ', err)
        this.src = 'https://bulma.io/images/placeholders/1280x960.png'
      })
    }
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/places/view.php?id=${this.placeId}`).then((response) => {
      this.place = JSON.parse(response.bodyText)

      this.$http.get(`${this.$API_URL}/api/chapters/index.php`).then((response) => {
        const chapterList = JSON.parse(response.bodyText)

        const chapterArray = this.place.chapters
        this.place.chapters = []
        chapterArray.map((chapter) => {
          for (let i = 0; i < chapterList.length; i++) {
            const item = chapterList[i]
            if (item.id === chapter) {
              this.place.chapters.push(`Chapitre ${item.numberInt} - ${item.title}`)
              break
            }
          }
        })
      }).catch(err => {
        console.log('View Place : load data error ', err)
      })
    }).catch(err => {
      console.log('View Place : load data error ', err)
    })
  },
  mounted () {
    this.loadImage()
  }
}
</script>

<style lang="scss" scoped>
  p {
    margin: 10px 0;
  }

</style>
