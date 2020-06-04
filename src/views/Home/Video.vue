<template>
  <div id="video">
    <video :src="mysrc" autoplay controls>不支持播放该视频！</video>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      
    }
  },
  props: {
    mysrc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
#video {
  width: 100%;
  height: 100%;

  video {
    width: 900px;
    height: 506px;
    display: block;
  }
}
</style>