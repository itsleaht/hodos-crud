<template>
  <form @submit.prevent="addChapitre">
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
        <input class="input" type="text" name="name" placeholder="Un nom" v-model="chapitre.name">
      </div>
    </div>

    <div class="field">
      <label class="label">NumberInt</label>
      <div class="control">
        <input class="input" type="number" min="1" max="100" name="numberInt" placeholder="Entre 1 - 100" v-model="chapitre.numberInt">
      </div>
    </div>

    <div class="field">
      <label class="label">NumberRoman</label>
      <div class="control">
        <input class="input" type="text" name="numberRoman" placeholder="Ex: XVI" v-model="chapitre.numberRoman">
      </div>
    </div>

    <div class="field">
      <label class="label">Texte début de chapitre</label>
      <div class="control">
        <textarea class="textarea" name="beginText" placeholder="Texte du début lu à l'oral" v-model="chapitre.beginText"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Previously</label>
      <div class="control">
        <textarea class="textarea" name="previously" placeholder="Previously" v-model="chapitre.previously"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Blocs de texte</label>
      <div class="control">
        <textarea class="textarea" name="textBlocks" placeholder="Bloc de texte" v-model="chapitre.textBlocks"></textarea>
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
        beginText: null,
        previously: null,
        textBlocks: null
      },
      chapitreId: null,
      state: null,
      hasError: false
    }
  },
  methods: {
    addChapitre () {
      const chapitre = this.chapitre
      chapitre.textBlocks = chapitre.textBlocks.split('#')
      console.log(chapitre.textBlocks)

      /*if (this.isEdit) {
        this.$http.patch('http://localhost:3000/api/chapters/edit/' + this.lieuId, this.lieu).then((response) => {
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
      }*/
    }
  },
  mounted () {
    if (this.isEdit) {
      this.chapitreId = this.isEdit ? this.$route.params.id : null

      /*
      this.$http.get('http://localhost:3000/api/lieux/' + this.chapitreId).then((response) => {
              this.chapitre = JSON.parse(response.bodyText)
            }, (response) => {
              this.hasError = true
              this.state = 1
            })
            */
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
