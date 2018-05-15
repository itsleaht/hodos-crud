<template>
  <div id="app">

    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{name:'listCharacter'}" class="navbar-item">
           <span>Personnages</span>
            <span class="icon is-small">
                <i class="fas fa-user"></i>
            </span>
          </router-link>
          <router-link :to="{name:'listPlace'}" class="navbar-item">
            <span>Lieux</span>
            <span class="icon is-small">
                <i class="fas fa-map-marker"></i>
            </span>
          </router-link>
          <router-link :to="{name:'listChapter'}" class="navbar-item">
            <span>Chapitre</span>
            <span class="icon is-small">
                <i class="fas fa-bookmark"></i>
            </span>
          </router-link>
        </div>
        <div class="navbar-end">
          <router-link :to="{name:'createCharacter'}" class="navbar-item">
            <span>Ajouter Personnage</span>
            <span class="icon is-small">
                <i class="fas fa-plus-circle"></i>
            </span>
          </router-link>
          <router-link :to="{name:'createPlace'}" class="navbar-item">
            <span>Ajouter Lieux</span>
            <span class="icon is-small">
                <i class="fas fa-plus-circle"></i>
            </span>
          </router-link>
          <router-link :to="{name:'createChapter'}" class="navbar-item">
            <span>Ajouter Chapitre</span>
            <span class="icon is-small">
                <i class="fas fa-plus-circle"></i>
            </span>
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
  #app {
    font-family: 'Work Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    > div {
      padding-top: 30px;
      width: 80%;
      max-width: 1200px;
      margin: 0 auto;
    }

    nav {
      box-shadow: 1Px 1px 8px rgba(128, 128, 128, 0.2);
      z-index: 100;
      a {
        &.router-link-active {
          background-color: #00b89c;
        }
        span {
          &:nth-child(2) {
            margin-left: 10px;
          }
        }
      }
    }
    h1 {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 25px;
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
