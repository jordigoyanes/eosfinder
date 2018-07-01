<template>
    <v-container>
      <div v-if="searchError">
        <h1>{{this.errorMsg}}</h1>
      </div>
      <div v-else>
        <h1>Searching...</h1>
        <v-progress-circular indeterminate :size="50" color="amber"></v-progress-circular>
      </div>
    </v-container>
</template>

<script>
import Vue from 'vue'
import is from 'is-extended'
import {eos} from '../eosconfig/eosconfig.js'

  export default {
    data () {
      return {
        transactionInfo: [],
        txID: '',
        blockID: '',
        errorMsg: '',
        searchError: false,
        bcData:''
        
      }
    },
    methods:{
      //this tries to find the info requested by the user and redirects accordingly
      find: function(){
        let vm = this
        let query = this.searchQuery
        if(isNaN(query)){
          if(query.length >= 12){
            //search for matching block or tx id
            eos.getTransaction(query).then(result => {
                this.$router.push({path:"/transactions/" + query})
            }).catch(function(err){
               vm.getBlock(query)
            })

          }else{
            eos.getAccount(query).then(result => {
                  if(result.permissions.length == 0){
                      this.searchError = true
                      this.errorMsg = "That account doesn't exist."
                    
                  }else{
                    this.$router.push({path:"/accounts/" + query})
                  }
                }).catch(function(err){
                    if(err.code != 200){
                      vm.searchError = true
                      vm.errorMsg = "That account doesn't exist."
                    }
                })
          }
        }else{
            this.$router.push({path:"/blocks/" + query})
          //eos.getBlock(parseInt(query)).then(result => {console.log(result)})
          //todo: check if block number exists

        }
      },
      getBlock: function(query){
        let vm = this
        eos.getBlock(query).then(result => {
                this.$router.push({path:"/blocks/" + query})
                throw err
                }).catch(function(err){
                  vm.searchError = true
                  vm.errorMsg = "Invalid transaction or block ID"
                })
      }
    },
    computed:{
        searchQuery: function(){
            return this.$route.params.searchQuery
        }
    },
    watch:{
      $route (){
          this.find()
      }
  },
    mounted (){
      this.find()
    }
  }
</script>
