<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="userName" placeholder="请输入姓名">
    <input v-model="age" placeholder="请输入年龄">
    <button v-on:click="addUser">提交</button>
  </div>
</template>

<script>
  export default {
    name: 'Hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        userName: '',
        age: ''
      }
    },
    methods: {
      addUser() {
        var name = this.userName;
        var age = this.age;
        this.$http.post('http://localhost:3000/api/user/addUser', {
          username: name,
          age: age
        }, {}).then((response) => { console.log(response); })
      }
    }
  }
</script>

<style>

</style>