<template>
   <form @submit.prevent="addPlace">
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
         <input class="input" type="text" placeholder="Ex : Mont Parnasse" v-model="place.name">
       </div>
     </div>

     <div class="field">
       <label class="label">Description </label>
       <div class="control">
         <input class="input" type="text" placeholder="Ex : Maison des Dieux" v-model="place.description">
       </div>
     </div>

     <div class="field">
       <label class="label">Chapitres concernés</label>
       <div class="control">
         <div class="select">
           <select multiple v-model="place.chapters">
             <option v-for="chapter in 100" :key="'place_'+chapter" :value="chapter - 1"> Chapitre {{chapter}}</option>
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
  name: 'form-place',
  data () {
    return {
      isEdit: this.$route.name === 'editPlace',
      place: {
        id: null,
        name: null,
        description: null,
        chapters: []
      },
      placeId: null,
      state: null,
      hasError: false
    }
  },
  methods: {
    addPlace () {
      if (this.isEdit) {
        this.$http.post(`${this.$API_URL}/api/places/edit.php?id=${this.placeId}`, this.place, {emulateJSON: true}).then((response) => {
          console.log(response)
          this.$router.push({path: `/lieux/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        }
        )
      } else {
        console.log(this.place)
        this.$http.post(`${this.$API_URL}/api/places/create.php`, this.place, {emulateJSON: true}).then((response) => {
          console.log(response)
          this.$router.push({name: 'listPlace'})
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
      this.placeId = this.isEdit ? this.$route.params.id : null
      this.$http.get(`${this.$API_URL}/api/places/view.php?id=${this.placeId}`).then((response) => {
        console.log('edit', response)
        console.log(JSON.parse(response.bodyText))
        this.place = JSON.parse(response.bodyText)
        this.place.chapters = this.place.chapters.split()
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
