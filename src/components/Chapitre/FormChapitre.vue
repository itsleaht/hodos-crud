<template>
  <form @submit.prevent="addLieu">
    <h2 v-if="isEdit">Modifier le chapitre avec l'ID {{$route.params.id}}</h2>
    <h2 v-else>Créer un chapitre</h2>

  <!--  <div class="columns">
      <button :class="'column notification-'+state" v-if="hasError">Les modifications n'ont pas été sauvegardées.
        Veuillez ré-essayer plus tard.
      </button>
    </div>-->

    <div class="field">
      <label class="label">Nom</label>
      <div class="control">
        <input class="input" type="text" placeholder="Un nom" v-model="chapitre.name">
      </div>
    </div>
    <div class="field">
      <label class="label">NumberInt</label>
      <div class="control">
        <input class="input" type="text" placeholder="Entre 1 - 100" v-model="chapitre.numberInt">
      </div>
    </div>
    <div class="field">
      <label class="label">NumberRoman</label>
      <div class="control">
        <input class="input" type="text" placeholder="Ex: XVI" v-model="chapitre.numberRoman">
      </div>
    </div>

    <!--
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
    -->

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
  name: 'form-chapitre',
  data () {
    return {
      isEdit: this.$route.name === 'editChapitre',
      chapitre: {
        id: null,
        name: null,
        numberInt: null,
        numberRoman: null,
      },
      chapitreId: null,
      state: null,
      hasError: false
    }
  },
  methods: {
    /*
   addLieu () {
      if (this.isEdit) {
        this.$http.patch('http://localhost:3000/api/lieux/edit/' + this.lieuId, this.lieu).then((response) => {
          this.$router.push({path: `/lieux/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        }
        )
      } else {
        this.$http.post('http://localhost:3000/api/lieux/create', this.lieu).then((response) => {
          this.$router.push({path: '/lieux/list'})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        })
      }
    } */
  },
  mounted () {
    if (this.isEdit) {
      this.chapitreId = this.isEdit ? this.$route.params.id : null

      /*      this.$http.get('http://localhost:3000/api/lieux/' + this.chapitreId).then((response) => {
              this.chapitre = JSON.parse(response.bodyText)
            }, (response) => {
              this.hasError = true
              this.state = 1
            })*/

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
