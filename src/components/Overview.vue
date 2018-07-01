<template>
  <v-container>
    <h1 class=display-3>Latest blocks</h1>
      <v-layout>
          <v-flex>
            <v-data-table
          transition="slide-y-transition"
          :headers="blockListHeaders"
          :items="blocks"
          hide-actions
          class="elevation-1"
          >
            <template slot="items" slot-scope="props">
            <td class="text-xs-left"><router-link :to="props.item.blockPath">{{ props.item.blockNum }}</router-link></td>
            <td class="text-xs-left">{{ props.item.timestamp }}</td>
            <td class="text-xs-left">{{ props.item.transactions }}</td>
            <td class="text-xs-left"><router-link :to="props.item.accountPath">{{ props.item.producer }}</router-link></td>
            </template>
            <template slot="no-data">
            <v-progress-linear slot="progress" color="amber darken-2" indeterminate></v-progress-linear>
            </template>
          </v-data-table>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import {eos} from '../eosconfig/eosconfig.js'
import Vue from 'vue'
  export default {
    data () {
      return {
        blockListHeaders: [
          { text: 'Block number', value: 'blockNum',  sortable:false },
          { text: 'Timestamp', value: 'timestamp' , sortable:false},
          { text: 'Transactions', value: 'transactions' , sortable:false},
          { text: 'Block Producer', value: 'producer' , sortable:false},
        ],
        blocks: [],
        interval: ''
      }
    },
    methods:{
      getLatestBlocks:function(limit){
        let vm = this;
        eos.getInfo({}).then(result => {
            let lastBlock = result.last_irreversible_block_num;
            return lastBlock
        }).then(function(lastBlock){
                let blockList=[];
                (async function getList(){
                    for(let i=0;i<limit;i++){
                        await eos.getBlock(lastBlock - i).then(result =>{
                            blockList.push(result)
                            if(blockList.length == limit){
                              for(let i=0; i < blockList.length; i++){
                                let blockPath = '/blocks/' + blockList[i].block_num
                                let accountPath = '/accounts/' + blockList[i].producer
                                let date = new Date(blockList[i].timestamp)
                                let humanDate = vm.convertUTCtoHuman(date)
                                Vue.set(vm.blocks, i, {
                                  blockNum: blockList[i].block_num,
                                  timestamp: humanDate,
                                  producer: blockList[i].producer,
                                  transactions: blockList[i].input_transactions.length,
                                  blockPath: blockPath,
                                  accountPath: accountPath
                                })
                              }
                            }
                        })
                    }
                })();
            });
      },
      fetchData: function(){
        this.interval = setInterval(()=>{this.getLatestBlocks(10);}, 1000)
      },
      convertUTCtoHuman(date){
          const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ]
         let month = monthNames[date.getMonth()]
         let time =  ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)+':' + ("0" + date.getSeconds()).slice(-2) + ' at '+ date.getMilliseconds() + 'ms'
         let humanDate = month + ' ' +  date.getDate() + ', ' + date.getFullYear() +', '+ time
         return humanDate
      }
    },
    created (){
      //fetch blocks data when page is loaded, and then start the refresh interval fetchData.
      this.getLatestBlocks(10);
      this.fetchData()
    },
    destroyed(){
      // when the user changes the route, stop fetching data for the previous route
      clearInterval(this.interval)
    }
  }
</script>
