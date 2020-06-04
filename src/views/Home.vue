<template>
  <div class="home">
    <div class="home-video">
      <Video :mysrc="src" />
    </div>
    <div class="home-mine">
      <Mine @getSrc="mySrc" />
    </div>
  </div>
</template>

<script>
import Mine from './Home/Mine'
import Video from './Home/Video'

export default {
  name: 'Home',
  data() {
    return {
      src: ''
    }
  },
  methods: {
    mySrc(src) {
      this.src = src;
    }
  },
  components: {
    Mine,
    Video
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  min-height: 506px;
  
  .home-video {
    width: 900px;
    min-height: 506px;
    background-color: antiquewhite;
    flex-grow: 0;
  }

  .home-mine {
    min-height: 506px;
    flex: 1;
    background-color: aqua;
    -webkit-app-region: drag;
  }
}
</style>
