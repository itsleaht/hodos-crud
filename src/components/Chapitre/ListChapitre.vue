<template>
  <div class="list-chapitre">
    <h2>Liste de Chapitre</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>N° Chapitre</th>
        <th>Titre</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>ID</th>
        <th>N° Chapitre</th>
        <th>Titre</th>
        <th>Actions</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="chapitre in chapitres" :key="chapitre.id">
        <th>{{chapitre.id}}</th>
        <td>Chapitre {{chapitre.numberInt}}</td>
        <td>{{chapitre.title}}</td>
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
export default {
  name: 'list-chapitre',
  data () {
    return {
      chapitres: []
    }
  },
  methods: {
    deleteAlert (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce chapitre ?')) {
        this.$http.delete('http://localhost:3000/api/chapters/delete/' + id).then((response) => {
          this.chapitres = JSON.parse(response.bodyText)
        })
      }
    }
  },
  created () {
    this.$http.get('http://localhost:3000/api/chapters').then((response) => {
      this.chapitres = JSON.parse(response.bodyText)
    })
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
