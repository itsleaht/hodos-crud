<template>
  <div id="list-personnage">
    <h2>Liste personnage</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="personnage in personnages" :key="personnage.id">
          <th>{{personnage.id}}</th>
          <td>{{personnage.name}}</td>
          <td>{{personnage.role}}</td>
          <td>
            <router-link :to="{name: 'viewCharacter', params: {id: personnage.id} }" class="button is-info">
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
              <span>Voir</span>
            </router-link>
            <router-link :to="{ name: 'editCharacter', params: { id: personnage.id }}" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
              <span>Modifier</span>
            </router-link>
            <a class="button is-danger" @click="deleteAlert(personnage.id)">
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
  name: 'list-personnage',
  data () {
    return {
      personnages: []
    }
  },
  methods: {
    deleteAlert (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
        this.$http.delete(`${this.$API_URL}/api/characters/delete/${id}`).then((response) => {
          this.personnages = JSON.parse(response.bodyText)
        })
      }
    }
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/characters`).then((response) => {
      this.personnages = JSON.parse(response.bodyText)
    })
  }
}
</script>

<style lang="scss" scoped>
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
