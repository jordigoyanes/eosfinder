<template>
  <v-container>
    <h1 class=display-3>Block #{{this.items[0].data}}</h1>

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
            name: 'Block Number',
            data: '',

          },
          {
            value: false,
            name: 'Producer',
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
        ]
      }
    },
    

    methods:{
      getBlockInfo:function(){  
        let blockIdOrNum = this.$route.params.blockIdOrNum
        if(!isNaN(blockIdOrNum)){
            //if it's a block number
            eos.getBlock(parseInt(blockIdOrNum)).then(result => {
                let resultStr= JSON.stringify(result)
                this.items[0].data = result.block_num
                this.items[1].data = result.producer
                this.items[1].link = '/accounts/' + result.producer
                this.items[2].data = result.timestamp
                this.items[3].data = result.id
                this.items[4].data = result.previous
                this.items[4].link = '/blocks/' + result.previous
                this.items[5].data = result.transaction_mroot
                this.items[6].data = result.input_transactions.length
                console.log("esto es: " + result.transactions)
                //let transactions = result.transactions
                console.log("it works! " + resultStr)
                
                this.rawData = json.plain(result)
                })
        }else{
            //if it's a block id or hash
            eos.getBlock(blockIdOrNum).then(result => {
                let resultStr= JSON.stringify(result)
                this.items[0].data = result.block_num
                this.items[1].data = result.producer
                this.items[1].link = '/accounts/' + result.producer
                this.items[2].data = result.timestamp
                this.items[3].data = result.id
                this.items[4].data = result.previous
                this.items[4].link = '/blocks/' + result.previous
                this.items[5].data = result.transaction_mroot
                this.items[6].data = result.input_transactions.length
                console.log("it works! " + resultStr)
                this.rawData = json.plain(result)
                })
        }
      }
    },
    watch:{
      $route (){
          this.getBlockInfo()
      }
  },
    created (){
      this.getBlockInfo()
    }
  }
</script>
