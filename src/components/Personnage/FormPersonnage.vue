<template>
  <form enctype="multipart/form-data" ref="formAddPersonnage" id="formAddPersonnage" method="post" @submit.prevent="addPersonnage">
    <h2 v-if="isEdit">Modifier le personnage avec l'id {{$route.params.id}}</h2>
    <h2 v-else>Créer un personnage</h2>

    <div class="columns">
       <button :class="'column notification-'+state" v-if="errors.hasError" >Les modifications n'ont pas été sauvegardées. Veuillez ré-essayer plus tard.</button>
    </div>

    <div class="field">
      <label class="label">Nom </label>
      <div class="control">
        <input class="input" type="text" name="name" v-model="personnage.name" placeholder="Ex : Hermès" required>
      </div>
    </div>

    <div class="columns">
      <file-upload class="file-input" :preview="true" :name="'profile'" :accept="'image/*'" :titlePreview="'Image de fiche personnage'" :index="0" @isLoaded="handleFile"/>
      <file-upload class="file-input" :preview="true" :name="'map'" :accept="'image/*'" :titlePreview="'Image personnage sur lieux'" :index="1" @isLoaded="handleFile"/>
    </div>

    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <input class="input" type="text" name="type" v-model="personnage.type" placeholder="Ex : Dieu">
      </div>
    </div>

    <div class="field">
      <label class="label">Rôle</label>
      <div class="control">
        <input class="input" type="text" name="role" v-model="personnage.role" placeholder="Ex : Guide les âmes perdus / Dieu de la mer ">
      </div>
    </div>

    <div class="field">
      <label class="label">Lieu de rencontre</label>
      <div class="control">
        <div class="select">
          <select v-model="personnage.place" name="place">
            <option v-for="(lieu, index) in lieux" :key="'lieu_'+index" :value="lieu.id">{{lieu.id}} - {{lieu.name}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" name="description" placeholder="Hermès est le personnage principal de l'histoire." v-model="personnage.description"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Liens de parenté</label>
      <div class="control">
        <textarea class="textarea" name="family" placeholder="Hermès est le fils de Maia et Zeus." v-model="personnage.family"></textarea>
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
  name: 'form-personnage',
  components: {fileUpload},
  data () {
    return {
      personnage: {
        files: []
      },
      isEdit: this.$route.name === 'editPersonnage',
      personnageId: null,
      lieux: [],
      state: null,
      errors: {
        submitError: false,
        hasLoadingError: false
      }
    }
  },
  methods: {
    addPersonnage () {
      const form = document.querySelector('form')
      const formData = new FormData(form)

      if (this.isEdit) {
        this.$http.patch(`${this.$API_URL}/api/characters/edit/${this.personnageId}`, formData).then((response) => {
          this.$router.push({path: `/personnages/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        })
      } else {
        this.$http.post(`${this.$API_URL}/api/characters/create`, formData).then((response) => {
          this.$router.push({path: `/personnages/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        })
      }
    },
    handleFile (obj) {
      this.personnage.files[obj.index] = obj.file
    }
  },
  mounted () {
    this.$http.get(`${this.$API_URL}/api/places`).then((response) => {
      this.lieux = JSON.parse(response.bodyText)
    })

    if (this.isEdit) {
      this.personnageId = this.isEdit ? this.$route.params.id : null
      this.$http.get('http://localhost:3000/api/characters/' + this.personnageId).then((response) => {
        this.personnage = JSON.parse(response.bodyText)
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
