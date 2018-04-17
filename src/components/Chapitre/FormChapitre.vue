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
        <input class="input" type="text" name="title" placeholder="Un nom" v-model="chapitre.title">
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
        <textarea class="textarea" name="textBlocks" placeholder="Bloc de texte" rows="15" v-model="chapitre.textBlocks"></textarea>
      </div>
      <p class="info">Pour créer un noueau bloc de texte faire 2 sauts de lignes, et pour créer un paragraphe à l'intérireur d'un bloc de texte, faire un seul retour à la ligne</p>
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
        title: null,
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
      chapitre.textBlocks = chapitre.textBlocks.split('\n\n')
      console.log(chapitre.textBlocks)

      if (this.isEdit) {
        this.$http.patch('http://localhost:3000/api/chapters/edit/' + this.chapitreId, chapitre).then((response) => {
          this.$router.push({path: `/chapitre/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        })
      } else {
        this.$http.post('http://localhost:3000/api/chapters/create', chapitre).then((response) => {
          this.$router.push({path: '/chapitre/list'})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        })
      }
    },
    arrayToString (arr, separator) {
      let str = ''
      arr.forEach(function (i, index) {
        str += i
        if (index !== (arr.length - 1)) {
          str += separator
        }
      })
      return str
    }
  },
  mounted () {
    if (this.isEdit) {
      this.chapitreId = this.isEdit ? this.$route.params.id : null

      this.$http.get('http://localhost:3000/api/chapters/' + this.chapitreId).then((response) => {
        this.chapitre = JSON.parse(response.bodyText)
        this.chapitre.textBlocks = this.arrayToString(this.chapitre.textBlocks, '\n\n')
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
