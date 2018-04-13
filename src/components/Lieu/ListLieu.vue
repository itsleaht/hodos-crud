<template>
  <div class="list-lieu">
    <h2>Liste de lieux</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="lieu in lieux" :key="lieu.id">
        <th>{{lieu.id}}</th>
        <td>{{lieu.name}}</td>
        <td>
          <a class="button is-info">
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
            <span>Voir</span>
          </a>
          <router-link :to="{ name: 'editLieu', params: { id: lieu.id }}" class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
            <span>Modifier</span>
          </router-link>
          <a class="button is-danger">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            <span>Supprimer</span>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import lieux from '../../data/lieux'

export default {
  name: 'list-lieu',
  data () {
    return {
      lieux
    }
  }
}
</script>
