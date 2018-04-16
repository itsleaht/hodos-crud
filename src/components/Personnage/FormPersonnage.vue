<template>
  <form @submit.prevent="addPersonnage">
    <h2 v-if="isEdit">Modifier le personnage avec l'id {{$route.params.id}}</h2>
    <h2 v-else>Créer un personnage</h2>
    <div class="columns">
       <button :class="'column notification-'+state" v-if="hasError" >Les modifications n'ont pas été sauvegardées. Veuillez ré-essayer plus tard.</button>
    </div>

    <div class="columns">
      <file-upload class="file-input" :preview="true" :name="'perso-image'" :accept="'image/*'" :titlePreview="'Image de fiche personnage'"></file-upload>
      <file-upload class="file-input" :preview="true" :name="'lieu-image'" :accept="'image/*'" :titlePreview="'Image personnage sur lieux'"></file-upload>
    </div>

    <div class="field">
      <label class="label">Nom </label>
      <div class="control">
        <input class="input" type="text" name="name" v-model="personnage.name" placeholder="Ex : Hermès">
      </div>
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
          <select v-model="personnage.place">
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
  </form>
</template>

<script>
import fileUpload from '@/components/fileUpload'
export default {
  name: 'form-personnage',
  components: {fileUpload},
  data () {
    return {
      personnage: {},
      isEdit: this.$route.name === 'editPersonnage',
      personnageId: null,
      lieux: [],
      state: null,
      hasError: false
    }
  },
  methods: {
    addPersonnage () {
      if (this.isEdit) {
        this.$http.patch('http://localhost:3000/api/personnages/edit/' + this.personnageId, this.personnage).then((response) => {
          this.$router.push({path: `/personnages/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        }
        )
      } else {
        this.$http.post('http://localhost:3000/api/personnages/create', this.personnage).then((response) => {
          this.$router.push({path: `/personnages/list`})
        }, (response) => {
          console.log('error', response)
          this.hasError = true
          this.state = 1
        }
        )
      }
    }
  },
  mounted () {
    this.$http.get('http://localhost:3000/api/lieux').then((response) => {
      this.lieux = JSON.parse(response.bodyText)
    })

    if (this.isEdit) {
      this.personnageId = this.isEdit ? this.$route.params.id : null
      this.$http.get('http://localhost:3000/api/personnages/' + this.personnageId).then((response) => {
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
