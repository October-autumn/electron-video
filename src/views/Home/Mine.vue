<template>
  <div id="mine">
    <label class="mine-1">
      <p>方式一：网络路径</p>
      <input class="srcText" type="text" autofocuss placeholder="Please enter the source" v-model="textSrc">
    </label>
    <label for="my-file" class="mine-2">
      <p>方式二：本地文件</p>
      <div class="choose-file">choose file</div>
      <input id="my-file" class="my-file" type="file" accept="video/*" ref="fileSrc">
    </label>
    <button class="begin-btn" @click="begin">begin</button>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data() {
    return {
      textSrc: '',
      fileSrc: '',
      playSrc: ''
    }
  },
  methods: {
    begin() {
      this.fileSrc = this.$refs.fileSrc.value;
      this.playSrc = this.textSrc || '../../assets/' + this.fileSrc.split('\\')[2];
      if (!this.playSrc) {
        alert('choose your method');
        return
      }
      this.$emit('getSrc', this.playSrc)
    }
  }
}
</script>

<style lang="less" scoped>
#mine {
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  // -webkit-app-region: no-drag;
  flex-wrap: wrap;
  text-align: center;

  .srcText {
    width: 200px;
    display: block;
    height: 30px;
    padding: 0 10px;
    border: 0px;
    color: #fff;
    background-color: rgb(76, 74, 72);
    overflow: hidden;
  }

  .my-file {
    width: 50%;
    opacity: 0;
    // display: none;
    // filter: alpha(opacity=0);
  }

  .begin-btn {
    -webkit-app-region: no-drag;
    width: 50%;
    height: 40px;
    background-color: rgb(76, 74, 72);
    border: 1px solid #fff;

    &:active {
      border: 1px solid red;
      outline: 1px solid red;
    }
  }

  .mine-1 {
    -webkit-app-region: no-drag;
    cursor: pointer;
  }

  .mine-2 {
    -webkit-app-region: no-drag;
    margin: 20px 0 40px 0;
    cursor: pointer;

    .choose-file {
      background-color: rgb(76, 74, 72);
      color: #fff;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>