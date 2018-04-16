<template>
  <div id="app">

    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <!-- navbar start, navbar end -->
        <div class="navbar-start">
          <!-- navbar items -->
          <router-link :to="{name:'listPersonnage'}" class="navbar-item">
            Personnages
          </router-link>
          <router-link :to="{name:'listLieu'}" class="navbar-item">
            Lieux
          </router-link>
        </div>
        <div class="navbar-end">
          <!-- navbar items -->
          <router-link :to="{name:'createPersonnage'}" class="navbar-item">
            Ajouter Personnages
          </router-link>
          <router-link :to="{name:'createLieu'}" class="navbar-item">
            Ajouter Lieux
          </router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

  .router-link-active {
    background-color: #00b89c;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    > div {
      padding-top: 30px;
    }

    h1 {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }

     .notification {
       border-radius: 5px;

       &-1 {
        background: hsl(348, 100%, 61%);
        color: #fff;
       }

       &-2 {
        background: hsl(141, 71%, 48%);
        color: #fff;
       }
      }
  }

</style>
