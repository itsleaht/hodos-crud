<template>
<div id="view-personnage">
  <h2>Vue du personnage avec l'id {{ $route.params.id }}</h2>

  <div class="images">
    <figure class="image">
      <img src="https://bulma.io/images/placeholders/256x256.png">
      <figcaption>Légende 1</figcaption>
    </figure>
    <figure class="image">
      <img src="https://bulma.io/images/placeholders/600x480.png">
      <figcaption>Légende 2</figcaption>
    </figure>

  </div>

  <table class="table">
    <tr v-for="(value, key, index) in personnage" :key="index">
      <th>{{ key }}</th>
      <td v-if="Array.isArray(value)">
        <span v-for="(val, index2) in value" :key="index2"> {{val}} /</span>
      </td>
      <td v-else>{{ value }}</td>
    </tr>
  </table>

</div>
</template>

<script>

export default {
  name: 'view-personnage',
  components: {},
  data () {
    return {
      personnage: {},
      personnageId: this.$route.params.id
    }
  },
  methods: {
  },
  created () {
    this.$http.get(`http://localhost:3000/api/personnages/${this.personnageId}`).then((response) => {
      this.personnage = JSON.parse(response.bodyText)
    })
  }
}
</script>

<style lang="scss" scoped>
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;

    > figure {
      margin: 15px;
      max-width: 350px;
    }
  }

  table {
    margin: 0 auto;
    width: 100%;
  }
</style>
