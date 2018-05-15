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
        <p v-for="(val, index2) in value" :key="index2" v-html="val.replace('\n','<br>')"> /</p>
      </div>
      <td v-else>{{ value }}</td>
    </div>
  </div>
  <toggle-data :data="chapter" />
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
      chapterId: this.$route.params.id,
      fields: [
        'ID',
        'Titre',
        'Numéro de chapitre (nombre)',
        'Numéro de chapitre (chiffres romains)',
        'Lieu associé',
        'Personnage découvert',
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
    this.$http.get(`${this.$API_URL}/api/chapters/view.php?id=${this.chapterId}`).then((response) => {
      this.chapter = JSON.parse(response.bodyText)

      this.$http.get(`${this.$API_URL}/api/places/view.php?id=${this.chapter.place}`).then((response) => {
        const place = JSON.parse(response.bodyText)
        const { name } = place
        this.chapter.place = name
      })
      this.$http.get(`${this.$API_URL}/api/characters/view.php?id=${this.chapter.character}`).then((response) => {
        const character = JSON.parse(response.bodyText)
        const { name } = character
        this.chapter.character = name
        console.log(JSON.parse(character.textBlocks))
      })
    })
  },
  mounted () {
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
