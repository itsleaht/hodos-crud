<template>
  <form action="">
    <h2 v-if="isEdit">Modifier le personnage avec l'id {{$route.params.id}}</h2>
    <h2 v-else>Créer un personnage</h2>

    <div class="columns">
      <div class="field card column">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="file is-primary">
          <label class="file-label">
            <input class="file-input" type="file" name="perso-image">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Image de fiche personnage
              </span>
            </span>
          </label>
        </div>
      </div>
      <div class="field card column">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="file is-primary">
          <label class="file-label">
            <input class="file-input" type="file" name="perso-image">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Image personnage sur lieux
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Nom </label>
      <div class="control">
        <input class="input" type="text" placeholder="Ex : Hermès">
      </div>
    </div>

    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <input class="input" type="text" placeholder="Ex : Dieu">
      </div>
    </div>

    <div class="field">
      <label class="label">Rôle</label>
      <div class="control">
        <input class="input" type="text" placeholder="Ex : Guide les âmes perdus / Dieu de la mer ">
      </div>
    </div>

    <div class="field">
      <label class="label">Lieu de rencontre</label>
      <div class="control">
        <div class="select">
          <select>
            <option v-for="(lieu, index) in lieux" :key="'lieu_'+index">{{lieu}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" placeholder="Hermès est le personnage principal de l'histoire."></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Liens de parenté</label>
      <div class="control">
        <textarea class="textarea" placeholder="Hermès est le fils de Maia et Zeus."></textarea>
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
  name: 'form-personnage',
  data () {
    return {
      'lieux': [],
      isEdit: this.$route.name === 'editPersonnage'
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
    }
  }
</style>
