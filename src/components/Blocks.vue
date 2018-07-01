<template>
  <v-container>
      <v-layout>
          <v-flex>
            <h2>Latest blocks</h2>
            <v-data-table
          transition="slide-y-transition"
          :headers="blockListHeaders"
          :items="blocks"
          hide-action
          class="elevation-1"
          dark
          >
            <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.blockNum }}</td>
            <td class="text-xs-right">{{ props.item.timestamp }}</td>
            <td class="text-xs-right">{{ props.item.producer }}</td>
            </template>
            <template slot="no-data">
            <v-progress-linear slot="progress" color="amber darken-2" indeterminate></v-progress-linear>
            </template>
          </v-data-table>
          </v-flex>
      </v-layout>
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
import axios from 'axios'
import Vue from 'vue'
  export default {
    data () {
      return {
        blockListHeaders: [
          { text: 'Block number', value: 'blockNum', align: 'center', sortable:false },
          { text: 'Timestamp', value: 'timestamp' , align: 'center', sortable:false},
          { text: 'Producer', value: 'producer' , align: 'center', sortable:false},
        ],
        blocks: [],
        interval: ''
      }
    },
    methods:{
      getLatestBlocks:function(){
        let vm = this
        axios.get('http://localhost:5000/api/blocks?limit=20', {})
        .then(function(response){
        let data = response.data
        console.log(data);
        console.log(response.status);
        //add items to the data table and make them reactive:
          for(let i=0; i < data.length -10; i++){
            Vue.set(vm.blocks, i, {
              blockNum: data[i].block_num,
              timestamp: data[i].timestamp,
              producer: data[i].producer
            })
          }
        });
      },
      fetchData: function(){
        this.interval = setInterval(()=>{this.getLatestBlocks();}, 1000)
      }
    },
    created (){
      this.fetchData()
    },
    destroyed(){
      // when the user changes the route, stop fetching data constantly.
      clearInterval(this.interval)
    }
  }
</script>
