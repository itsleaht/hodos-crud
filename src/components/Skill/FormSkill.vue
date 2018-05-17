<template>
  <form @submit.prevent="addSkill">
    <h2 v-if="isEdit">Modifier la compétence avec l'ID {{$route.params.id}}</h2>
    <h2 v-else>Créer unE COMPÉTENCE</h2>

    <div class="columns">
      <button :class="'column notification-'+state" v-if="hasError">Les modifications n'ont pas été sauvegardées.
        Veuillez ré-essayer plus tard.
      </button>
    </div>

    <div class="field">
      <label class="label">Nom</label>
      <div class="control">
        <input class="input" type="text" name="name" placeholder="Un nom" v-model="skill.name">
      </div>
    </div>

    <div class="field">
      <label class="label">Type de compétence</label>
      <div class="control">
        <div class="select">
          <select v-model="skill.type" name="type">
            <option v-for="(type, index) in skillTypes" :key="'lieu_'+index" :value="type.id">{{type.id}} - {{type.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Personnage associé</label>
      <div class="control">
        <div class="select">
          <select v-model="skill.character" name="character">
            <option v-for="(character, index) in characters" :key="'lieu_'+index" :value="character.id">{{character.id}} - {{character.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Sauvegarder</button>
      </div>
      <div class="control">
        <a @click="$router.go(-1)" class="button is-text">Annuler</a>
      </div>
    </div>
    <button :class="'column notification-1'" v-if="errors.hasLoadingError" >Veuillez attendre la fin du chargement de l'image et recommencer l'envoi.</button>
  </form>
</template>

<script>

export default {
  name: 'form-skill',
  components: {},
  data () {
    return {
      isEdit: this.$route.name === 'editSkill',
      skill: {},
      skillId: null,
      skillTypes: [],
      errors: {
        submitError: false,
        hasLoadingError: false
      },
      state: null,
      characters: [],
      hasError: false
    }
  },
  methods: {
    addSkill () {
      const form = document.querySelector('form')
      const formData = new FormData(form)

      if (this.isEdit) {
        this.$http.post(`${this.$API_URL}/api/skills/edit.php?id=${this.skillId}`, formData, {emulateJSON: true}).then((response) => {
          this.$router.push({name: 'viewSkill', params: {id: this.skillId}})
        }).catch(err => {
          console.log('Form Skill Edit : error', err)
          this.hasError = true
          this.state = 1
        })
      } else {
        this.$http.post(`${this.$API_URL}/api/skills/create.php`, formData, {emulateJSON: true}).then((response) => {
          const newSkill = JSON.parse(response.bodyText)
          this.$router.push({name: 'viewSkill', params: {id: newSkill.id}})
        }).catch(err => {
          console.log('Form Skill Create : error', err)
          this.hasError = true
          this.state = 1
        })
      }
    }
  },
  mounted () {
    this.$http.get(`${this.$API_URL}/api/characters/index.php`).then((response) => {
      this.characters = JSON.parse(response.bodyText)
    }).catch(err => {
      console.log('Form Skill : load characters data error ', err)
    })

    this.$http.get(`${this.$API_URL}/api/skillTypes/index.php`).then((response) => {
      this.skillTypes = JSON.parse(response.bodyText)
    }).catch(err => {
      console.log('Form Skill : load skillTypes data error ', err)
    })

    if (this.isEdit) {
      this.skillId = this.isEdit ? this.$route.params.id : null

      this.$http.get(`${this.$API_URL}/api/skills/view.php?id=${this.skillId}`).then((response) => {
        this.skill = JSON.parse(response.bodyText)
      }).catch(err => {
        console.log('Form Skill : load data error ', err)
        this.hasError = true
        this.state = 1
      })
    }
  }
}
</script>

<style lang="scss">
  form {
    width: 600px;
    margin: 50px auto;
    text-align: left;

    .column {
      border: none;
      box-shadow: none;
    }

    .select {
      margin-bottom: 100px;
    }

    .info {
      font-size: 14px;
      color: #717171;
      margin: 15px 0 35px 0;
    }
  }
</style>
