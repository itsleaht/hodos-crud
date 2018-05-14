<template>
  <div class="list-chapter">
    <h2>Liste des Chapitres</h2>
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
        <th class="actions">Actions</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="chapter in chapters" :key="chapter.id">
        <th>{{chapter.id}}</th>
        <td>Chapitre {{chapter.numberInt}}</td>
        <td>{{chapter.title}}</td>
        <td>
          <router-link :to="{name: 'viewChapter', params: {id: chapter.id} }" class="button is-info">
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
            <span>Voir</span>
          </router-link>
          <router-link :to="{ name: 'editChapter', params: { id: chapter.id }}" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
            <span>Modifier</span>
          </router-link>
          <a class="button is-danger" @click="deleteAlert(chapter.id)">
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
  name: 'list-chapter',
  data () {
    return {
      chapters: []
    }
  },
  methods: {
    deleteAlert (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce chapitre ?')) {
        this.$http.delete(`${this.$API_URL}/api/chapters/delete.php?id=${id}`).then((response) => {
          this.chapters = JSON.parse(response.bodyText)
          this.$router.push({name: 'listChapter'})
        })
      }
    }
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/chapters`).then((response) => {
      this.chapters = JSON.parse(response.bodyText)
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
