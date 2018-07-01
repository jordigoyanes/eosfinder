<template>
  <v-container>
    <h1 class=display-3>transaction info</h1>
    <h3>{{this.$route.params.transactionID}}</h3>
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
            <h2>Actions</h2>
            <v-expansion-panel v-for="action in actions" :key="action">
              <v-expansion-panel-content>
                <div slot="header">
                  <v-chip color="green" text-color="white">{{action.account}}</v-chip>
                  <v-chip color="primary" text-color="white">{{action.name}}</v-chip>
                </div>
                <v-card>
                  <v-tabs
                  v-model="active"
                  color="#303030"
                  dark
                  slider-color="amber darken-3"
                  >
                  </v-tabs>
                  <v-tab >
                    Pretty data
                  </v-tab>
                  <v-tab-item ></v-tab-item>
                  <v-tab >
                    Pretty data
                  </v-tab>
                  <v-tab-item ></v-tab-item>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
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
            name: 'Transaction ID',
            data: '',

          },
          {
            value: false,
            name: 'Block Number',
            data: '',
            hasLink:true,
            link:''

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
        ],
        actions: []
      }
    },
    

    methods:{
      getTransactionInfo:function(){
        let vm = this
        let txID = vm.$route.params.transactionID
         eos.getTransaction(txID).then(result => {
            vm.items[0].data = result.transaction_id
            vm.items[1].data = result.block_num
            vm.items[2].data = result.createdAt
            this.rawData = json.plain(result)
            let actions = result.transaction.transaction.actions
            for(let i=0; i < actions.length; i++){
              Vue.set(vm.actions, i, {
                name: actions[i].name,
                account: actions[i].account,
            })
          }
        })
      }
    },
    created (){
      this.getTransactionInfo()
    }
  }
</script>