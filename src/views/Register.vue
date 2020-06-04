<template>
  <div id="register" @keydown.enter="joinUsHandler">
    <div class="head">
      <img src="../assets/head.jpg" alt="">
    </div>
    <div class="welcome">Adventure awaits you.</div>
    <div class="input">
      <input class="input-item" autofocus :class="{'yes': isname}" type="text" placeholder="Please enter 0 to 20 words or numbers" v-model="username" @input="enterNameHandler">
    </div>
    <div class="input">
      <input class="input-item" :class="{'yes': ispwd}" type="text" placeholder="Password" v-model="password" @input="enterPwdHandler">
    </div>
    <div class="input">
      <input class="input-item" :class="{'yes': isrepwd}" type="text" placeholder="Repeat password" v-model="repassword" @input="enterRePwdHandler">
    </div>
    <div class="joinus" @click="joinUsHandler">Join Us</div>
    <div class="footer">Already have an account? 
      <router-link to="/login" tag="a">Sign in</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      isname: false,
      password: '',
      ispwd: false,
      repassword: '',
      isrepwd: false
    }
  },
  methods: {
    joinUsHandler() {
      if (this.isname && this.ispwd && this.isrepwd) {
        axios.get(`/api/user/register?username=${this.username}&password=${this.password}`)
        .then(res => {
          if (res.data.errno === 0) {
            alert('注册成功')
          } else if (res.data.message === '用户名已被注册') {
            alert('用户名已被注册')
          }
        })
        .catch(() => {
          alert('注册失败，请联系小博美!')
        })
      }
    },
    enterNameHandler() {
      if (this.username.trim().length > 0 && this.username.trim().length <= 20) {
        this.isname = true;
      } else {
        this.isname = false;
      }
    },
    enterPwdHandler() {
      if (this.password.trim().length > 0 && this.password.trim().length <= 20) {
        this.ispwd = true;
      } else {
        this.ispwd = false;
      }
    },
    enterRePwdHandler() {
      if (this.repassword.trim() === this.password.trim() && this.ispwd) {
        this.isrepwd = true;
      } else {
        this.isrepwd = false;
      }
    }
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

#register {
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
    -webkit-app-region: no-drag;
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

  .yes {
    border: 1px solid green;
  }
}

.joinus {
  @height: 52px;
  font-size: 12px;
  background-color: #70be6b;
  height: @height;
  line-height: @height;
  text-align: center;
  color: #fff;
  margin: 6px 0 12px;
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