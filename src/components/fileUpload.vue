<template>
  <div class="field card column">
    <div class="card-image" v-if="preview">
      <button class="button loadingState" :class="{'is-danger is-loading' : isLoading === 1, 'is-success': isLoading === 2}">
        <i :class="{'fas fa-check': isLoading === 2}"></i>
      </button>
      <figure class="image is-4by3">
        <img :src="src" alt="Placeholder image">
      </figure>
    </div>
    <div class="file is-primary">
      <label class="file-label">
        <input class="file-input" type="file" :name="name" :accept="accept" @change="loadFile" ref="input">
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
</template>
<script>
export default {
  name: 'file-upload',
  props: {
    preview: {
      type: Boolean,
      default: true
    },
    name: {
      type: String
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    titlePreview: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      src: 'https://bulma.io/images/placeholders/1280x960.png',
      isLoading: 0
    }
  },
  methods: {
    loadFile (e) {
      this.isLoading = 1
      const reader = new FileReader()
      const input = this.$refs.input
      const file = input.files[0]
      
      reader.addEventListener('load', () => {
        this.src = reader.result
        this.isLoading = 2
        this.$emit('isLoaded', {
          index: this.index,
          file: file
        })
      })

      reader.readAsDataURL(file)
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-image {
    position: relative;

    .loadingState {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 500;
      width: 20px;
      height: 26px;
      cursor: not-allowed;
      border: none;

      &:hover {
        border: none;
      }
    }
  }

</style>
