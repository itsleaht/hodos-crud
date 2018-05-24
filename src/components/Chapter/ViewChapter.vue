<template>
<div id="view-chapter">

  <h2>Vue du chapitre avec l'id {{ $route.params.id }}</h2>

  <router-link :to="{ name: 'editChapter', params: { id: chapter.id }}" class="button is-warning editBtn">
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
      <figcaption>Image du chapitre</figcaption>
    </figure>
  </div>

  <div class="table-container">
    <div v-for="(value, key, index) in chapter" :key="index" class="table-line">
      <div class="table-header">{{ fields[index] }}</div>
      <div class="table-content" v-if="Array.isArray(value)">
        <p v-for="(val, index2) in value" :key="index2" v-html="val.toString().replace('\n','<br>')"> /</p>
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
  name: 'view-chapter',
  components: {ToggleData},
  data () {
    return {
      chapters: [],
      chapter: {},
      src: null,
      datas: {},
      chapterId: this.$route.params.id,
      fields: [
        'ID',
        'Titre',
        'Numéro de chapitre (nombre)',
        'Numéro de chapitre (chiffres romains)',
        'Lieu associé',
        'Personnages découverts',
        'Personnages associés',
        'Compétence découverte',
        'Compétence utilisée',
        'Texte de début de chapitre',
        'Previously',
        'Blocs de textes'
      ]
    }
  },
  methods: {
    loadImage () {
      this.$http.get(`${this.$API_URL}/api/uploads/chapters/${this.chapterId}.png`).then(response => {
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
    this.$http.get(`${this.$API_URL}/chapters/view.php?id=${this.chapterId}`).then((response) => {
      this.datas = JSON.parse(response.bodyText)
      this.chapter = JSON.parse(response.bodyText)

      if (this.chapter.place >= 0 && this.chapter.place !== null) {
        this.$http.get(`${this.$API_URL}/places/view.php?id=${this.chapter.place}`).then((response) => {
          const place = JSON.parse(response.bodyText)
          const { name } = place
          this.chapter.place = name
        })
      }

      this.$http.get(`${this.$API_URL}/characters/index.php`).then((response) => {
        const characterList = JSON.parse(response.bodyText)

        const charactersDiscoveredArray = this.chapter.charactersDiscovered

        if (charactersDiscoveredArray && charactersDiscoveredArray.length) {
          this.chapter.charactersDiscovered = []
          charactersDiscoveredArray.map((character) => {
            for (let i = 0; i < characterList.length; i++) {
              const item = characterList[i]
              if (item.id === character) {
                this.chapter.charactersDiscovered.push(item.name)
              }
            }
          })
        }

        const charactersArray = this.chapter.characters

        if (charactersArray && charactersArray.length) {
          this.chapter.characters = []
          charactersArray.map((character) => {
            for (let i = 0; i < characterList.length; i++) {
              const item = characterList[i]
              if (item.id === character) {
                this.chapter.characters.push(item.name)
              }
            }
          })
        }
      })

      if (this.chapter.skillUsed >= 0 && this.chapter.skillUsed !== null) {
        this.$http.get(`${this.$API_URL}/skills/view.php?id=${this.chapter.skillUsed}`).then((response) => {
          this.chapter.skillUsed = JSON.parse(response.bodyText).name
        })
      }

      if (this.chapter.skillDiscovered.length) {
        this.$http.get(`${this.$API_URL}/skills/index.php`).then((response) => {
          const skillList = JSON.parse(response.bodyText)
          this.chapter.skillDiscovered = []
          skillList.map((skill) => {
            for (let i = 0; i < this.chapter.skillDiscovered.length; i++) {
              const item = this.chapter.skillDiscovered[i]
              if (item === skill.id) {
                this.chapter.skillDiscovered.push(skill.name)
              }
            }
          })
        })
      }
    })
    this.loadImage()
  }
}
</script>

<style lang="scss" scoped>

  .editBtn {
    position: absolute;
    right: 40px;
    top: 70px;
  }

  p {
    margin: 10px 0 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f8f7f7;
  }

</style>
