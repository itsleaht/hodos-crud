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
      <div v-for="(value, key, index) in place" :key="index" class="table-line" :class="{'unEditable': fields[index].unEditable }">
        <div class="table-header">{{ fields[index].name }}</div>
        <div class="table-content" v-if="Array.isArray(value)">
          <p v-for="(val, index2) in value" :key="index2"> {{val}} </p>
        </div>
        <td v-else>{{ value }}</td>
      </div>
    </div>
  <toggle-data :data="datas" />
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
      datas: {},
      fields: [
        {name: 'ID'},
        {name: 'Nom'},
        {name: 'Description'},
        {name: 'Chapitres concernés'},
        {name: 'Personnages associés', unEditable: true}
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
      this.datas = JSON.parse(response.bodyText)

      this.place.characters = []

      this.$http.get(`${this.$API_URL}/api/chapters/index.php`).then((response) => {
        const chapterList = JSON.parse(response.bodyText)
        var chaptersListObj = []

        // Get all matching chapters
        const chapterArray = this.place.chapters
        this.place.chapters = []
        chapterArray.map((chapter) => {
          for (let i = 0; i < chapterList.length; i++) {
            const item = chapterList[i]
            if (item.id === chapter) {
              chaptersListObj.push(item)
              this.place.chapters.push(`Chapitre ${item.numberInt} - ${item.title}`)
              break
            }
          }
        })

        // Get all matching characters
        var charactersIds = []
        var uniqueIds = []
        chaptersListObj.map((chapter) => {
          const chapterCharacters = chapter.characters

          if (chapterCharacters && chapterCharacters.length) {
            chapter.characters.map(characters => charactersIds.push(characters))

            uniqueIds = [ ...new Set(charactersIds) ]
          }
        })

        this.$http.get(`${this.$API_URL}/api/characters/index.php`).then((response) => {
          const characterList = JSON.parse(response.bodyText)
          var newCharactersArray = []
          uniqueIds.map(id => {
            for (let i = 0; i < characterList.length; i++) {
              if (characterList[i].id === id) {
                newCharactersArray.push(characterList[i].name)
              }
            }
          })
          this.place = {...this.place, 'characters': newCharactersArray}
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
