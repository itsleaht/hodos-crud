<template>
<div id="view-place">

  <h2>Vue du lieu avec l'id {{ $route.params.id }}</h2>

  <router-link :to="{ name: 'editPlace', params: { id: place.id }}" class="button is-warning">
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    <span>Modifier</span>
  </router-link>
    <div class="table-container">
      <div v-for="(value, key, index) in place" :key="index" class="table-line">
        <div class="table-header">{{ fields[index] }}</div>
        <div class="table-content" v-if="Array.isArray(value)">
          <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
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
      ]
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
  a {
    position: absolute;
    right: 40px;
    top: 70px;
  }

  table {
    margin: 50px auto 0;
    width: 800px;

    th {
      width: 200px;
    }
  }

</style>
