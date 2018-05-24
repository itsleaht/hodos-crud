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
      <label class="label">Titre</label>
      <div class="control">
        <input class="input" type="text" name="title" placeholder="Un nom" v-model="chapter.title">
      </div>
    </div>

     <div class="columns fileUploadWrapper">
      <file-upload class="file-input is-half column" :preview="true" :name="'chapterImage'" :accept="'image/*'" :src="src" :label="'Image du chapitre'" :index="0" @isLoaded="handleFile"/>
    </div>

    <div class="field">
      <label class="label">Numéro de chapitre (nombre)</label>
      <div class="control">
        <input class="input" type="number" min="1" max="100" name="numberInt" placeholder="Entre 1 - 100" v-model="chapter.numberInt">
      </div>
    </div>

    <div class="field">
      <label class="label">Numéro de chapitre (chiffres romains)</label>
      <div class="control">
        <input class="input" type="text" name="numberRoman" placeholder="Ex: XVI" v-model="chapter.numberRoman">
      </div>
    </div>

    <div class="field">
      <label class="label">Lieu associé</label>
      <div class="control">
        <div class="select">
          <select v-model="chapter.place" name="place">
            <option v-for="(place, index) in places" :key="'lieu_'+index" :value="place.id">{{place.id}} - {{place.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Personnages découverts dans ce chapitre</label>
      <div class="control">
        <div class="select">
          <select v-model="chapter.charactersDiscovered" name="charactersDiscovered" multiple>
            <option v-for="(character, index) in characters" :key="'charactersDiscovered_'+index" :value="character.id">{{character.id}} - {{character.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Personnages associés à ce chapitre</label>
      <div class="control">
        <div class="select">
          <select v-model="chapter.characters" name="characters" multiple>
            <option v-for="(character, index) in characters" :key="'characters_'+index" :value="character.id">{{character.id}} - {{character.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Compétence découverte</label>
      <div class="control">
        <div class="select">
          <select v-model="chapter.skillDiscovered" name="skillDiscovered" multiple>
            <option v-for="(skill, index) in skills" :key="'skillDiscovered_'+index" :value="skill.id">{{skill.id}} - {{skill.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Compétence utilisée</label>
      <div class="control">
        <div class="select">
          <select v-model="chapter.skillUsed" name="skillUsed">
            <option v-for="(skill, index) in skills" :key="'skillUsed_'+index" :value="skill.id">{{skill.id}} - {{skill.name}}</option>
          </select>
        </div>
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
        <textarea class="textarea" name="textBlocks" placeholder="Bloc de texte" rows="15" v-model="chapter.textBlocks" :v-html="chapter.textBlocks"></textarea>
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

import fileUpload from '@/components/fileUpload'

export default {
  name: 'form-chapter',
  components: {fileUpload},
  data () {
    return {
      isEdit: this.$route.name === 'editChapter',
      chapter: {
        id: null,
        title: null,
        numberInt: null,
        numberRoman: null,
        place: null,
        character: null,
        beginText: null,
        previously: null,
        textBlocks: null,
        files: null,
        charactersDiscovered: [],
        characters: [],
        skillUsed: [],
        skillDiscovered: []
      },
      skills: [],
      src: null,
      chapterId: null,
      state: null,
      places: [],
      characters: [],
      hasError: false
    }
  },
  methods: {
    addChapter () {
      const chapter = this.chapter
      const form = document.querySelector('form')
      const formData = new FormData(form)

      if (chapter.textBlocks && chapter.textBlocks.length) {
        chapter.textBlocks = chapter.textBlocks.split('\n\n')
        formData.append('textBlocks', JSON.stringify(chapter.textBlocks))
      }

      if (chapter.beginText && chapter.beginText.length) {
        chapter.beginText = chapter.beginText.split('\n')
        formData.append('beginText', JSON.stringify(chapter.beginText))
      }

      if (chapter.charactersDiscovered && chapter.charactersDiscovered.length) {
        formData.append('charactersDiscovered', JSON.stringify(chapter.charactersDiscovered))
      }

      if (chapter.skillDiscovered && chapter.skillDiscovered.length) {
        formData.append('skillDiscovered', JSON.stringify(chapter.skillDiscovered))
      }

      if (chapter.characters && chapter.characters.length) {
        formData.append('characters', JSON.stringify(chapter.characters))
      }

      if (this.isEdit) {
        this.$http.post(`${this.$API_URL}/chapters/edit.php?id=${this.chapterId}`, formData, {emulateJSON: true}).then((response) => {
          this.$router.push({name: 'viewChapter', params: {id: this.chapterId}})
        }).catch(err => {
          console.log('Form Chapter Edit : error', err)
          this.hasError = true
          this.state = 1
        })
      } else {
        this.$http.post(`${this.$API_URL}/chapters/create.php`, formData, {emulateJSON: true}).then((response) => {
          console.log(response)
          const newChapter = JSON.parse(response.bodyText)
          this.$router.push({name: 'viewChapter', params: {id: newChapter.id}})
        }).catch(err => {
          console.log('Form Chapter Create : error', err)
          this.hasError = true
          this.state = 1
        })
      }
    },
    handleFile (obj) {
      this.chapter.files = obj.file
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
    },
    loadImage () {
      this.$http.get(`${this.$API_URL}/uploads/chapters/${this.chapterId}.png`).then(response => {
        if (response.body.length) {
          this.src = response.url
        } else {
          this.src = 'https://bulma.io/images/placeholders/1280x960.png'
        }
      }).catch(err => {
        console.log('View Place : load Image error ', err)
        this.src = 'https://bulma.io/images/placeholders/1280x960.png'
      })
    }
  },
  mounted () {
    this.$http.get(`${this.$API_URL}/places/index.php`).then((response) => {
      this.places = JSON.parse(response.bodyText)
    }).catch(err => {
      console.log('Form Chapter : load places data error ', err)
    })

    this.$http.get(`${this.$API_URL}/characters/index.php`).then((response) => {
      this.characters = JSON.parse(response.bodyText)
    }).catch(err => {
      console.log('Form Chapter : load characters error ', err)
    })

    this.$http.get(`${this.$API_URL}/skills/index.php`).then((response) => {
      this.skills = JSON.parse(response.bodyText)
    }).catch(err => {
      console.log('Form Chapter : load skills error ', err)
    })

    if (this.isEdit) {
      this.chapterId = this.isEdit ? this.$route.params.id : null

      this.$http.get(`${this.$API_URL}/chapters/view.php?id=${this.chapterId}`).then((response) => {
        this.chapter = JSON.parse(response.bodyText)
        this.chapter.textBlocks = this.chapter.textBlocks && this.chapter.textBlocks.length > 0 ? this.arrayToString(this.chapter.textBlocks, '\n\n') : ''
        this.loadImage()
      }).catch(err => {
        console.log('Form Chapter : load data error ', err)
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
