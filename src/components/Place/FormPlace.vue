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
         <input class="input" type="text" placeholder="Ex : Mont Parnasse" v-model="place.name" name="name">
       </div>
     </div>

     <div class="columns fileUploadWrapper">
      <file-upload class="file-input is-half column" :preview="true" :name="'place'" :accept="'image/*'" :label="'Image du lieu'" :index="0" @isLoaded="handleFile" :src="src" />
    </div>

     <div class="field">
       <label class="label">Description </label>
       <div class="control">
         <input class="input" type="text" placeholder="Ex : Maison des Dieux" v-model="place.description" name="description">
       </div>
     </div>

     <div class="field">
       <label class="label">Chapitres concernés</label>
       <div class="control">
         <div class="select">
           <select multiple v-model="place.chapters" name="chapters">
             <option v-for="chapter in chapterList" :key="'place_'+chapter.id" :value="chapter.id"> Chapitre {{chapter.numberInt}} - {{chapter.title}} </option>
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
import fileUpload from '@/components/fileUpload'

export default {
  name: 'form-place',
  components: {fileUpload},
  data () {
    return {
      isEdit: this.$route.name === 'editPlace',
      place: {
        id: null,
        name: null,
        description: null,
        files: null,
        chapters: []
      },
      placeId: null,
      state: null,
      chapterList: [],
      src: null,
      hasError: false
    }
  },
  methods: {
    addPlace () {
      const form = document.querySelector('form')
      const formData = new FormData(form)

      if (this.place.chapters && this.place.chapters.length) {
        formData.append('chapters', JSON.stringify(this.place.chapters))
      }
      if (this.isEdit) {
        this.$http.post(`${this.$API_URL}/places/edit.php?id=${this.placeId}`, formData, {emulateJSON: true}).then((response) => {
          this.$router.push({name: 'viewPlace', params: {id: this.placeId}})
        }).catch(err => {
          console.log('Form place Edit : error', err)
          this.hasError = true
          this.state = 1
        })
      } else {
        this.$http.post(`${this.$API_URL}/places/create.php`, formData, {emulateJSON: true}).then((response) => {
          const newPlace = JSON.parse(response.bodyText)
          this.$router.push({name: 'viewPlace', params: {id: newPlace.id}})
        }).catch(err => {
          console.log('Form Place Create : error', err)
          this.hasError = true
          this.state = 1
        })
      }
    },
    handleFile (obj) {
      this.place.files = obj.file
    },
    loadImage () {
      this.$http.get(`${this.$API_URL}/uploads/places/${this.placeId}.png`).then(response => {
        if (response.body.length) {
          this.src = response.url
        }
      })
    }
  },
  mounted () {
    if (this.isEdit) {
      this.placeId = this.isEdit ? this.$route.params.id : null
      this.$http.get(`${this.$API_URL}/places/view.php?id=${this.placeId}`).then((response) => {
        this.place = JSON.parse(response.bodyText)
        this.loadImage()
      }).catch(err => {
        console.log('Form Place Load Data : error', err)
        this.hasError = true
        this.state = 1
      })
    }

    this.$http.get(`${this.$API_URL}/chapters/index.php`).then((response) => {
      this.chapterList = JSON.parse(response.bodyText)
    }).catch(err => {
      console.log('Form Place Load Chapters : error', err)
      this.hasError = true
      this.state = 1
    })
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
