<template>
  <div class="list-place">
    <h2>Liste des lieux</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="place in places" :key="place.id">
        <th>{{place.id}}</th>
        <td>{{place.name}}</td>
        <td>
          <router-link :to="{name: 'viewPlace', params: {id: place.id} }" class="button is-info">
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
            <span>Voir</span>
          </router-link>
          <router-link :to="{ name: 'editPlace', params: { id: place.id }}" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
            <span>Modifier</span>
          </router-link>
          <a class="button is-danger" @click="deleteAlert(place.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            <span>Supprimer</span>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'list-place',
  data () {
    return {
      places: []
    }
  },
  methods: {
    deleteAlert (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
        this.$http.delete(`${this.$API_URL}/api/places/delete/${id}`).then((response) => {
          this.personnages = JSON.parse(response.bodyText)
        })
      }
    }
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/places`).then((response) => {
      this.places = JSON.parse(response.bodyText)
    })
  }
}
</script>

<style scoped lang="scss">
  table {
    margin: 0 auto;
    tbody {
      tr {
        td {
          a:not(:first-child):not(:last-child) {
            margin: 0 12px;
          }
        }
      }
    }
  }
</style>
