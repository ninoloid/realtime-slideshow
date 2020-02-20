<template>
  <div>
  <v-carousel v-model="carouselIndex"
    height="100vh"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide) in slides"
      :key=slide.id
    >
      <v-sheet
        :color="slide.color"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">{{ slide.title }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  <span>Current Index: {{carouselIndex}}</span>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('https://polar-anchorage-84963.herokuapp.com')

export default {
  name: 'Home',
  data () {
    return {
      slides: [
        { title: 'Pada hari minggu', color: 'indigo' },
        { title: 'Ku turut ayah ke kota', color: 'warning' },
        { title: 'Naik delman istimewa', color: 'pink darken-2' },
        { title: 'Ku duduk di muka', color: 'red lighten-1' },
        { title: 'Mukanya kusir', color: 'deep-purple accent-4' }
      ],
      carouselIndex: null
    }
  },
  methods: {
    setIndex (index) {
      socket.emit('newIndex', index)
    }
  },
  watch: {
    carouselIndex (value) {
      this.setIndex(value)
    }
  },
  created () {
    socket.on('sliderIndex', (index) => {
      this.carouselIndex = index
    })
  }
}
</script>
