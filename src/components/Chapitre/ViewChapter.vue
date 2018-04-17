<template>
<div id="view-chapter">

  <h2>Vue du chapitre avec l'id {{ $route.params.id }}</h2>

  <table class="table">
    <tbody>
    <tr v-for="(value, key, index) in chapter" :key="index">
      <th>{{ key }}</th>
      <td v-if="Array.isArray(value)">
        <p v-for="(val, index2) in value" :key="index2"> {{val}} /</p>
      </td>
      <td v-else>{{ value }}</td>
    </tr>
    </tbody>
  </table>

</div>
</template>

<script>
import chapters from './chapitres'
export default {
  name: 'view-chapter',
  components: {},
  data () {
    return {
      chapters,
      chapter: {},
      chapterId: this.$route.params.id
    }
  },
  methods: {
  },
  created () {
    this.chapter = this.chapters[0]
    this.$http.get(`http://localhost:3000/api/chapters/${this.chapterId}`).then((response) => {
      this.chapter = JSON.parse(response.bodyText)
    })
  }
}
</script>

<style lang="scss" scoped>

  table {
    margin: 0 auto;
    min-width: 800px;
  }

</style>
