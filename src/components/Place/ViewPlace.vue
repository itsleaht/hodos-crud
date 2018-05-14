<template>
<div id="view-place">

  <h2>Vue du lieu avec l'id {{ $route.params.id }}</h2>

  <table class="table">
    <tbody>
    <tr v-for="(value, key, index) in place" :key="index">
      <th>{{ key }}</th>
      <td v-if="Array.isArray(value)">
        <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
      </td>
      <td v-else>{{ value }}</td>
    </tr>
    </tbody>
  </table>
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
      placeId: this.$route.params.id
    }
  },
  methods: {
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/places/view.php?id=${this.placeId}`).then((response) => {
      this.place = JSON.parse(response.bodyText)
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
