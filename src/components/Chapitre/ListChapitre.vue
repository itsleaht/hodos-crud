<template>
  <div class="list-chapitre">
    <h2>Liste de Chapitre</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>NumberInt</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>ID</th>
        <th>NumberInt</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="chapitre in chapitres" :key="chapitre.id">
        <th>{{chapitre.id}}</th>
        <td>{{chapitre.NumberInt}}</td>
        <td>{{chapitre.Name}}</td>
        <td>
          <router-link :to="{name: 'viewChapitre', params: {id: chapitre.id} }" class="button is-info">
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
            <span>Voir</span>
          </router-link>
          <router-link :to="{ name: 'editChapitre', params: { id: chapitre.id }}" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
            <span>Modifier</span>
          </router-link>
          <a class="button is-danger" @click="deleteAlert(chapitre.id)">
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
import Chapitres from './chapitres'
export default {
  name: 'list-chapitre',
  data () {
    return {
      chapitres: []
    }
  },
  methods: {
    /*
    deleteAlert (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
        this.$http.delete('http://localhost:3000/api/chapitres/delete/' + id).then((response) => {
          this.personnages = JSON.parse(response.bodyText)
        })
      }
    }
    */
  },
  created () {
    /*
   his.$http.get('http://localhost:3000/api/lieux').then((response) => {
      this.chapitres = JSON.parse(response.bodyText)
    })
    */
    this.chapitres = Chapitres
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
