<template>
   <form action="">
    <h2 v-if="isEdit">Modifier un lieu</h2>
    <h2 v-else>Créer un lieu</h2>
      <div class="field">
        <label class="label">Nom </label>
        <div class="control">
          <input class="input" type="text" placeholder="Ex : Mont Parnasse">
        </div>
      </div>

      <div class="field">
        <label class="label">Chapitres concernés</label>
        <div class="control">
          <div class="select">
            <select multiple>
              <option v-for="chapter in 100" :key="'lieu_'+index"> Chapitre {{ chapter }} </option>
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
export default {
  name: 'form-lieu',
  data () {
    return {
      isEdit: this.$route.name === 'editLieu' ? true : false
    }
  }
}
</script>

<style lang="scss">
  form {
      width: 500px;
      margin: 0 auto 50px;
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

