<template>
<div id="view-skill">

  <h2>Vue de la compétence avec l'id {{ $route.params.id }}</h2>

  <router-link :to="{ name: 'editSkill', params: { id: skill.id }}" class="button is-warning editBtn">
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    <span>Modifier</span>
  </router-link>
    <div class="table-container">
      <div v-for="(value, key, index) in skill" :key="index" class="table-line">
        <div class="table-header">{{ fields[index] }}</div>
        <div class="table-content" v-if="Array.isArray(value)">
          <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
        </div>
        <td v-else>{{ value }}</td>
      </div>
    </div>
  <toggle-data :data="datas" />
  </div>
</template>

<script>
import ToggleData from './../ToggleData'

export default {
  name: 'view-personnage',
  components: {ToggleData},
  data () {
    return {
      skill: {},
      skillId: this.$route.params.id,
      fields: [
        'ID',
        'Nom',
        'Type',
        'Personnage associé'
      ],
      src: '',
      datas: {}
    }
  },
  methods: {
  },
  created () {
    this.$http.get(`${this.$API_URL}/api/skills/view.php?id=${this.skillId}`).then((response) => {
      this.skill = JSON.parse(response.bodyText)
      this.datas = JSON.parse(response.bodyText)

      this.$http.get(`${this.$API_URL}/api/characters/view.php?id=${this.skill.character}`).then((response) => {
        const character = JSON.parse(response.bodyText)
        this.skill.character = character.name
      }).catch(err => {
        console.log('View Skill : load character error ', err)
      })

      this.$http.get(`${this.$API_URL}/api/skillTypes/index.php`).then((response) => {
        const skillTypes = JSON.parse(response.bodyText)
        this.skill.type = skillTypes[this.skill.type].name
      }).catch(err => {
        console.log('View Skill : load character error ', err)
      })
    }).catch(err => {
      console.log('View skill : load data error ', err)
    })
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  table {
    margin: 50px auto 0;
    width: 800px;

    th {
      width: 200px;
    }
  }

</style>
