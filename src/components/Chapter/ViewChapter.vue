<template>
<div id="view-chapter">

  <h2>Vue du chapitre avec l'id {{ $route.params.id }}</h2>

  <router-link :to="{ name: 'editChapter', params: { id: chapter.id }}" class="button is-warning">
    <span class="icon is-small">
      <i class="fas fa-edit"></i>
    </span>
    <span>Modifier</span>
  </router-link>

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
      chapterId: this.$route.params.id,
      fields: [
        'ID',
        'Titre',
        'Numéro de chapitre (nombre)',
        'Numéro de chapitre (chiffres romains)',
        'Lieu associé',
        'Personnge découvert',
        'Texte de début de chapitre',
        'Previously',
        'Blocs de textes'
      ]
    }
  },
  methods: {
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/chapters/view.php?id=${this.chapterId}`).then((response) => {
      this.chapter = JSON.parse(response.bodyText)
    })
  }
}
</script>

<style lang="scss" scoped>

  a {
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
