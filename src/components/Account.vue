<template>
  <v-container>
    <h1 class=display-3>{{this.items[0].data}}</h1>

  <div>
        <v-tabs
          v-model="active"
          color="#303030"
          dark
          slider-color="amber darken-3"
        >
          <v-tab >
            Pretty data
          </v-tab>
          <v-tab-item >
            <v-card flat>
                <v-data-table
                    :items="items"
                    class="elevation-1"
                    hide-actions
                    hide-headers
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right"> 
                        <div v-if="props.item.hasLink">
                            <router-link :to='props.item.link'> {{ props.item.data }}</router-link>
                        </div>
                        <div v-else>
                            {{ props.item.data }}
                        </div>
                    </td>
                    </template>
                </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab >
            Raw blockchain data
          </v-tab>
          <v-tab-item >
            <v-card flat>
                <code>{{this.rawData}}</code>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<script>
import {eos} from '../eosconfig/eosconfig.js'
import json from 'format-json'
import axios from 'axios'
import Vue from 'vue'
  export default {
    data () {
      return {
        active: null,
        transactionInfo: [],
        txID: '',
        blockID: '',
        rawData: '',
        items: [
          {
            value: false,
            name: 'Account Name',
            data: '',

          },
          {
            value: false,
            name: 'Balance',
            data: '',

          },
          {
            value: false,
            name: 'Timestamp',
            data: '',

          },
          {
            value: false,
            name: 'Block ID',
            data: '',

          },
          {
            value: false,
            name: 'Previous Block',
            data: '',
            hasLink:true,
            link:''

          },
          {
            value: false,
            name: 'Transaction Merkle root',
            data: '',

          },
          {
            value: false,
            name: 'Transactions',
            data: '',

          }
        ]
      }
    },
    

    methods:{
      getAccountInfo:function(){  
        let accountName = this.$route.params.accountName
            eos.getAccount(accountName).then(result => {
                this.rawData = json.plain(result)
                this.items[0].data = result.account_name
                })
      }
    },
    watch:{
      $route (){
          this.getAccountInfo()
      }
  },
    created (){
      this.getAccountInfo()
    }
  }
</script>