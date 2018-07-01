<template>
  <v-app
    id="inspire"
  >
    <v-content>
      <v-container >
        <h1><router-link to='/'>eosfinder</router-link></h1>
        <v-text-field
          placeholder="Search for an account, transaction ID or block number/ID..."
          v-model="searchQuery"
          single-line
          append-icon="search"
          :append-icon-cb="() => {initSearch()}"
          color="black"
          hide-details
          @keyup.enter="initSearch()"
        ></v-text-field>
       
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Router from 'vue-router';

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      searchQuery: '',
      activeClass:'',
      invalidPathMsg: '',
      items: [
        { text: 'Overview', icon: 'dashboard', to:"/" },
        { text: 'Blocks', icon: 'crop_square', to:"/blocks" },
        { text: 'Transactions', icon: 'list', to:"/transactions" },
        { text: 'Accounts', icon: 'supervisor_accounts' , to:"/accounts"},
        { text: 'Messages', icon: 'description' , to:"/messages"},
        { text: 'Statistics', icon: 'donut_small' , to:"/stats"}
      ]
    }
  },
  methods:{
    initSearch(){
      if(this.searchQuery != ''){
        this.$router.push({path: "/search/" + this.searchQuery})
      }
    },
    convertUTCtoHuman(date){
      var newDate = new Date(date);
      newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      return newDate.getFullYear()+ "-" + ("0" + newDate.getMonth()).slice(-2)  + "-" + ("0" + newDate.getDate()).slice(-2) + " " + ("0" + newDate.getHours()).slice(-2) + ":" + ("0" + newDate.getMinutes()).slice(-2) + ":" + ("0" + newDate.getSeconds()).slice(-2);
      return newDate;
    }
  },
  name: 'App'
}
</script>

<style>
.router-link-active{
  color: #FF8F00
}
.logo{
  height: 30px;
  width: 20px;
}
</style>