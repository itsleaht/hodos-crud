<template>
  <form enctype="multipart/form-data" ref="formAddPersonnage" id="formAddPersonnage" method="post" @submit.prevent="addCharacter">
    <h2 v-if="isEdit">Modifier le personnage avec l'id {{$route.params.id}}</h2>
    <h2 v-else>Créer un personnage</h2>

    <div class="columns">
       <button :class="'column notification-'+state" v-if="errors.hasError" >Les modifications n'ont pas été sauvegardées. Veuillez ré-essayer plus tard.</button>
    </div>

    <div class="field">
      <label class="label">Nom</label>
      <div class="control">
        <input class="input" type="text" name="name" v-model="character.name" placeholder="Ex : Hermès" required>
      </div>
    </div>

    <div class="columns">
      <file-upload class="file-input" :preview="true" :name="'profile'" :accept="'image/*'" :label="'Image du profil'" :index="0" :src="src.profile" @isLoaded="handleFile"/>
      <file-upload class="file-input" :preview="true" :name="'map'" :accept="'image/*'" :label="'Image sur la map'" :index="1" :src="src.map"  @isLoaded="handleFile"/>
    </div>

    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <input class="input" type="text" name="type" v-model="character.type" placeholder="Ex : Dieu, Cyclope, Sorcière...">
      </div>
    </div>

    <div class="field">
      <label class="label">Rôle</label>
      <div class="control">
        <input class="input" type="text" name="role" v-model="character.role" placeholder="Ex : Guide les âmes perdus / Dieu de la mer ">
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" name="description" placeholder="Hermès est le personnage principal de l'histoire." v-model="character.description"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Liens de parenté</label>
      <div class="control">
        <textarea class="textarea" name="family" placeholder="Hermès est le fils de Maia et Zeus." v-model="character.family"></textarea>
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
import fileUpload from '@/components/fileUpload'
export default {
  name: 'form-character',
  components: {fileUpload},
  data () {
    return {
      character: {
        files: []
      },
      isEdit: this.$route.name === 'editCharacter',
      characterId: null,
      state: null,
      errors: {
        submitError: false,
        hasLoadingError: false
      },
      src: {
        'profile': '',
        'map': ''
      },
      skillTypes: [
        'Physique',
        'Psychique'
      ]
    }
  },
  methods: {
    addCharacter () {
      const form = document.querySelector('form')
      const formData = new FormData(form)

      if (this.isEdit) {
        this.$http.post(`${this.$API_URL}/api/characters/edit.php?id=${this.characterId}`, formData, {emulateJSON: true}).then((response) => {
          this.$router.push({name: 'viewCharacter', params: {id: this.characterId}})
        }).catch(err => {
          console.log('Form Character edit error : ', err)
          this.hasError = true
          this.state = 1
        })
      } else {
        this.$http.post(`${this.$API_URL}/api/characters/create.php`, formData, {emulateJSON: true}).then((response) => {
          const newCharacter = JSON.parse(response.bodyText)
          this.$router.push({name: 'viewCharacter', params: {id: newCharacter.id}})
        }).catch(err => {
          console.log('Form Character add error : ', err)
          this.hasError = true
          this.state = 1
        })
      }
    },
    handleFile (obj) {
      this.character.files[obj.index] = obj.file
    },
    loadImages (imagePath) {
      this.$http.get(`${this.$API_URL}/api/uploads/characters/${imagePath}/${this.characterId}.png`).then(response => {
        if (response.body.length) {
          this.src[imagePath] = response.url
        }
      })
    }
  },
  mounted () {
    if (this.isEdit) {
      this.characterId = this.isEdit ? this.$route.params.id : null
      this.$http.get(`${this.$API_URL}/api/characters/view.php?id=${this.characterId}`).then((response) => {
        this.character = JSON.parse(response.bodyText)
        this.character.files = []
        const imageSrcArrays = Object.keys(this.src)
        for (let i = 0; i < imageSrcArrays.length; i++) {
          this.loadImages(imageSrcArrays[i])
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  form {
    width: 500px;
    margin: 50px auto;
    text-align: left;

    .column {
      border: none;
      box-shadow: none;
      height: 235px;
    }
  }
</style>
