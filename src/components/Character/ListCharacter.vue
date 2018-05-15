<template>
  <div id="list-character">
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
          <th class="actions">Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="character in characters" :key="character.id">
          <th>{{character.id}}</th>
          <td>{{character.name}}</td>
          <td>{{character.role}}</td>
          <td>
            <router-link :to="{name: 'viewCharacter', params: {id: character.id} }" class="button is-info">
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
              <span>Voir</span>
            </router-link>
            <router-link :to="{ name: 'editCharacter', params: { id: character.id }}" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
              <span>Modifier</span>
            </router-link>
            <a class="button is-danger" @click="deleteAlert(character.id)">
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
  name: 'list-character',
  data () {
    return {
      characters: []
    }
  },
  methods: {
    deleteAlert (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
        this.$http.delete(`${this.$API_URL}/api/characters/delete.php?id=${id}`).then((response) => {
          this.characters = JSON.parse(response.bodyText)
          this.$router.push({name: 'listCharacter'})
        }).catch(err => {
          console.log('List Character delete error : ', err)
        })
      }
    }
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/characters`).then((response) => {
      this.characters = JSON.parse(response.bodyText)
    }).catch(err => {
      console.log('List Character data error : ', err)
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
