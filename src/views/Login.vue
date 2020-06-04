<template>
  <div id="login" @keydown.enter="signInHandler">
    <div class="head">
      <img src="../assets/head.jpg" alt="">
    </div>
    <div class="welcome">Welcome bare mortal.</div>
    <div class="input">
      <input class="input-item" autofocus type="text" placeholder="Email or Phone" v-model="username">
    </div>
    <div class="input">
      <input class="input-item" type="text" placeholder="Password" v-model="password">
    </div>
    <div class="choose">
      <input class="remember" type="checkbox">
      <span class="remember-text">Keep me signed in</span>
      <strong class="reset">Reset Password</strong>
    </div>
    <div class="signin" @click="signInHandler">Open Sesame</div>
    <div class="footer">New to our website? 
      <router-link to="/register" tag="a">Sign up</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
const ipcRenderer = window.electron.ipcRenderer;

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      signInStatus: -1, // -1 代表登录失败; 0 代表登录成功
    }
  },
  methods: {
    ...mapMutations(['login', 'noLogin', 'setRealname']),
    signInHandler() {
      axios.get(`/api/user/login?username=${this.username}&password=${this.password}`)
      .then(res => {
        if (res.data.errno === 0) {
          this.signInStatus = res.data.errno
          alert(`Hello, ${res.data.data.realname}`)
          // 登录成功后修改 vuex 的 isLogined 和 realname 值
          this.login()
          this.setRealname(res.data.data.realname)
          // 进入 Home 个人首页, 并且修改程序窗口大小
          this.$router.push('/home')
          ipcRenderer.send('loginInfo', 'logined')
        } else {
          alert('登录失败，请先注册或请联系小博美');
          this.noLogin()
        }
      })
      .catch(() => {
        alert('登录失败，请联系小博美'); 
      })
    }
  },
  computed: {
    ...mapState(['isLogined'])
  }
}
</script>

<style lang="less" scoped>
@border-color: #e9eaec;
@font-color: #aab1bb;
@width: 100%;

* {
  box-sizing: border-box;
}

#login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 30px 22px 0 22px;
  width: @width;
  -webkit-app-region: drag;
}

.head {
  @size: 92px;
  height: @size;
  width: @size;
  border: 1px solid @border-color;
  border-radius: 50%;
  text-align: center;
  line-height: @size;
  cursor: pointer;
  -webkit-app-region: no-drag;
  
  img {
    display: block;
    width: @size - 2;
    height: @size - 2;
    border-radius: 50%;
  }
}

.welcome {
  @height: 14px;
  font-size: @height;
  line-height: 14px;
  height: 14px;
  color: #666;
  width: @width;
  margin: 28px 0 26px;
  text-align: center;
  font-weight: 600;
}

.input {
  @height: 48px;
  height: @height;
  width: @width;
  margin-bottom: 14px;

  .input-item {
    height: @height;
    border: 1px solid @border-color;
    padding: 18px 15px;
    font-size: 12px;
    width: @width;
    -webkit-app-region: no-drag;
  }
}

.choose {
  width: @width;
  display: flex;
  align-items: center;
  margin: 8px 0 4px;

  .remember {
    @size: 20px;
    width: @size;
    height: @size;
    border: 1px solid @border-color;
    outline-color: @border-color;
    border-radius: 3px;
    -webkit-app-region: no-drag;
  }

  .remember-text {
    font-size: 10px;
    color: @font-color;
    margin-left: 10px;
    flex: 1;
  }

  .reset {
    font-size: 10px;
    color: #567ff3;
    cursor: pointer;
    -webkit-app-region: no-drag;

    &:active {
      color: red;
    }
  }
}

.signin {
  @height: 52px;
  font-size: 12px;
  background-color: #567ff3;
  height: @height;
  line-height: @height;
  text-align: center;
  color: #fff;
  margin: 36px 0 12px;
  width: @width;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

.footer {
  font-size: 10px;
  color: @font-color;
  width: @width;
  text-align: center;

  a {
    color: #567ff3;
    -webkit-app-region: no-drag;

    &:active {
      color: red;
    }
  }
}
</style>