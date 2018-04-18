<template>
  <form @submit.prevent="addChapter">
    <h2 v-if="isEdit">Modifier le chapitre avec l'ID {{$route.params.id}}</h2>
    <h2 v-else>Créer un chapitre</h2>

    <div class="columns">
      <button :class="'column notification-'+state" v-if="hasError">Les modifications n'ont pas été sauvegardées.
        Veuillez ré-essayer plus tard.
      </button>
    </div>

    <div class="field">
      <label class="label">Nom</label>
      <div class="control">
        <input class="input" type="text" name="title" placeholder="Un nom" v-model="chapter.title">
      </div>
    </div>

    <div class="field">
      <label class="label">NumberInt</label>
      <div class="control">
        <input class="input" type="number" min="1" max="100" name="numberInt" placeholder="Entre 1 - 100" v-model="chapter.numberInt">
      </div>
    </div>

    <div class="field">
      <label class="label">NumberRoman</label>
      <div class="control">
        <input class="input" type="text" name="numberRoman" placeholder="Ex: XVI" v-model="chapter.numberRoman">
      </div>
    </div>

    <div class="field">
      <label class="label">Texte début de chapitre</label>
      <div class="control">
        <textarea class="textarea" name="beginText" placeholder="Texte du début lu à l'oral" v-model="chapter.beginText"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Previously</label>
      <div class="control">
        <textarea class="textarea" name="previously" placeholder="Previously" v-model="chapter.previously"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Blocs de texte</label>
      <div class="control">
        <textarea class="textarea" name="textBlocks" placeholder="Bloc de texte" rows="15" v-model="chapter.textBlocks"></textarea>
      </div>
      <p class="info">Pour créer un noueau bloc de texte faire 2 sauts de lignes, et pour créer un paragraphe à l'intérireur d'un bloc de texte, faire un seul retour à la ligne</p>
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
  name: 'form-chapter',
  data () {
    return {
      isEdit: this.$route.name === 'editChapter',
      chapter: {
        id: null,
        title: null,
        numberInt: null,
        numberRoman: null,
        beginText: null,
        previously: null,
        textBlocks: null
      },
      chapterId: null,
      state: null,
      hasError: false
    }
  },
  methods: {
    addChapter () {
      const chapter = this.chapter
      chapter.textBlocks = chapter.textBlocks.split('\n\n')
      console.log(chapter.textBlocks)

      if (this.isEdit) {
        this.$http.patch(`${this.$API_URL}/api/chapters/edit/${this.chapterId}`, chapter).then((response) => {
          this.$router.push({name: 'listChapter'})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        })
      } else {
        this.$http.post(`${this.$API_URL}/api/chapters/create`, chapter).then((response) => {
          this.$router.push({name: 'listChapter'})
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
      this.chapterId = this.isEdit ? this.$route.params.id : null

      this.$http.get('http://localhost:3000/api/chapters/' + this.chapterId).then((response) => {
        this.chapter = JSON.parse(response.bodyText)
        this.chapter.textBlocks = this.arrayToString(this.chapter.textBlocks, '\n\n')
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
