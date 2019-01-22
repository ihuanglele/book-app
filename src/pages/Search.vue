<template>
  <div class="app-content">
    <mu-form class="form" :class="{active:searchFocus}" :model="form">
      <mu-text-field class="search-input"
                     placeholder="搜索"
                     action-click="search"
                     action-icon="search"
                     @focus="searchFocus=true"
                     @blur="searchFocus=false"
                     v-model="form.input"></mu-text-field>
    </mu-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      form: {
        input: ''
      },
      searchFocus: true
    }
  },
  methods: {
    search () {

    }
  }
}
</script>

<style scoped>
  .form {
    width: 90%;
    margin: 10px auto 5px;
    display: flex;
    animation: inputBlur 200ms ease-in-out;
  }

  .active {
    width: 80%;
    margin: 20px auto;
    animation: inputFocus 200ms ease-in-out;
  }

  @keyframes inputFocus {
    from {
      width: 90%;
      margin: 10px auto 5px;
    }
    to {
      width: 80%;
      margin: 20px auto;
    }
  }

  @keyframes inputBlur {
    from {
      width: 80%;
      margin: 20px auto;
    }
    to {
      width: 90%;
      margin: 10px auto 5px;
    }
  }

  .search-input {
    display: flex;
    margin-bottom: 0;
    flex: 1;
  }

  .search-btn {
    display: flex;
    width: 30px;
    margin: 5px 0 0 10px;
    justify-content: center;
  }
</style>
