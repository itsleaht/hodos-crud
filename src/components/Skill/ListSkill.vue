<template>
  <div class="list-skill">
    <h2>Liste des compétences</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Type</th>
        <th class="actions">Actions</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="skill in skills" :key="skill.id">
        <th>{{skill.id}}</th>
        <td>{{skill.name}}</td>
        <td>{{skillsTypes[skill.type].name}}</td>
        <td>
          <router-link :to="{name: 'viewSkill', params: {id: skill.id} }" class="button is-info">
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
            <span>Voir</span>
          </router-link>
          <router-link :to="{ name: 'editSkill', params: { id: skill.id }}" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
            <span>Modifier</span>
          </router-link>
          <a class="button is-danger" @click="deleteAlert(skill.id)">
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
  name: 'list-skill',
  data () {
    return {
      skills: [],
      skillsTypes: []
    }
  },
  methods: {
    deleteAlert (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
        this.$http.delete(`${this.$API_URL}/skills/delete.php?id=${id}`).then((response) => {
          this.skills = JSON.parse(response.bodyText)
          this.$router.push({name: 'listSkill'})
        }).catch(err => {
          console.log('List Skill : load data error ', err)
        })
      }
    }
  },
  created () {
    this.$http.get(`${this.$API_URL}/skills/index.php`).then((response) => {
      this.skills = JSON.parse(response.bodyText)
      console.log(this.skills)

      this.$http.get(`${this.$API_URL}/skillTypes/index.php`).then((response) => {
        this.skillsTypes = JSON.parse(response.bodyText)
      })
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
