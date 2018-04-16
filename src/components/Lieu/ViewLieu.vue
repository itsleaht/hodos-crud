<template>
<div id="view-lieu">

  <h2>Vue du lieu avec l'id {{ $route.params.id }}</h2>

  <table class="table">
    <tbody>
    <tr v-for="(value, key, index) in lieu" :key="index">
      <th>{{ key }}</th>
      <td v-if="Array.isArray(value)">
        <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
      </td>
      <td v-else>{{ value }}</td>
    </tr>
    </tbody>
  </table>
  <pre>
    {{lieu}}
  </pre>

</div>
</template>

<script>

export default {
  name: 'view-personnage',
  components: {},
  data () {
    return {
      lieu: {},
      lieuId: this.$route.params.id
    }
  },
  methods: {
  },
  created () {
    this.$http.get(`http://localhost:3000/api/lieux/${this.lieuId}`).then((response) => {
      this.lieu = JSON.parse(response.bodyText)
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
