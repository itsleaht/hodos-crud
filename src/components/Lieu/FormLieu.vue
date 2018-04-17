<template>
   <form @submit.prevent="addLieu">
     <h2 v-if="isEdit">Modifier un lieu avec l'ID {{$route.params.id}}</h2>
     <h2 v-else>Créer un lieu</h2>
     <div class="columns">
       <button :class="'column notification-'+state" v-if="hasError">Les modifications n'ont pas été sauvegardées.
         Veuillez ré-essayer plus tard.
       </button>
     </div>

     <div class="field">
       <label class="label">Nom </label>
       <div class="control">
         <input class="input" type="text" placeholder="Ex : Mont Parnasse" v-model="lieu.name">
       </div>
     </div>

     <div class="field">
       <label class="label">Chapitres concernés</label>
       <div class="control">
         <div class="select">
           <select multiple v-model="lieu.chapters">
             <option v-for="chapter in 100" :key="'lieu_'+chapter" :value="chapter"> Chapitre {{chapter}}</option>
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
  </form>
</template>

<script>

export default {
  name: 'form-lieu',
  data () {
    return {
      isEdit: this.$route.name === 'editLieu',
      lieu: {
        id: null,
        name: null,
        chapters: []
      },
      lieuId: null,
      state: null,
      hasError: false
    }
  },
  methods: {
    addLieu () {
      if (this.isEdit) {
        this.$http.patch('http://localhost:3000/api/places/edit/' + this.lieuId, this.lieu).then((response) => {
          this.$router.push({path: `/lieux/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        }
        )
      } else {
        this.$http.post('http://localhost:3000/api/places/create', this.lieu).then((response) => {
          this.$router.push({path: '/lieux/list'})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        })
      }
    }
  },
  mounted () {
    if (this.isEdit) {
      this.lieuId = this.isEdit ? this.$route.params.id : null
      this.$http.get('http://localhost:3000/api/places/' + this.lieuId).then((response) => {
        this.lieu = JSON.parse(response.bodyText)
      }, (response) => {
        this.hasError = true
        this.state = 1
      })
    }
  }
}
</script>

<style lang="scss">
  form {
      width: 500px;
      margin: 50px auto;
      text-align: left;

      .column {
        border: none;
        box-shadow: none;
      }

      .select {
        margin-bottom: 100px;
      }
    }
</style>
