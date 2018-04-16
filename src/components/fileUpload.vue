<template>
  <div class="field card column">
    <div class="card-image" v-if="preview">
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
    }
  },
  data () {
    return {
      src: 'https://bulma.io/images/placeholders/1280x960.png'
    }
  },
  methods: {
    loadFile (e) {
      const reader = new FileReader()
      const input = this.$refs.input

      reader.addEventListener('load', () => {
        this.src = reader.result
      })

      reader.readAsDataURL(input.files[0]);
      console.log(input.files)
      console.log(e)
      console.log(reader)
      // this.src = reader.result
      // console.log(this.$refs.filePersoImage)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
