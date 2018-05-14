<template>
<div id="view-chapter">

  <h2>Vue du chapitre avec l'id {{ $route.params.id }}</h2>

  <table class="table">
    <tbody>
    <tr v-for="(value, key, index) in chapter" :key="index">
      <th>{{ key }}</th>
      <td v-if="Array.isArray(value)">
        <p v-for="(val, index2) in value" :key="index2" v-html="val.replace('\n','<br>')"></p>
      </td>
      <td v-else>{{ value }}</td>
    </tr>
    </tbody>
  </table>
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
      chapterId: this.$route.params.id
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

  table {
    margin: 0 auto;
    min-width: 800px;
    tr {
      td {
        min-width: 700px;
        p {
          margin: 15px 0;
        }
      }
    }
  }

</style>
