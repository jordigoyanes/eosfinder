<template>
  <v-container>
    <h1 class=display-3>Latest transactions</h1>
      <v-layout>
          <v-flex>
            <v-data-table
          transition="slide-y-transition"
          :headers="txListHeaders"
          :items="transactions"
          hide-actions
          class="elevation-1"
          dark
          >
            <template slot="items" slot-scope="props">
            <td class="text-xs-right"><router-link :to="{path:'/transactions/' + props.item.txID}">{{props.item.txID}}</router-link></td>
            <td class="text-xs-right">{{ props.item.timestamp }}</td>
            <td class="text-xs-right">{{ props.item.numMessages }}</td>
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
        txListHeaders: [
          { text: 'Transaction ID', value: 'txID', align: 'center', sortable:false },
          { text: 'Timestamp', value: 'timestamp' , align: 'center', sortable:false},
          { text: 'Messages', value: 'numMessages' , align: 'center', sortable:false},
        ],
        transactions: [],
        interval: ''
      }
    },
    methods:{
      getLatestTransactions:function(){
        let vm = this
        axios.get('http://localhost:3000/v1/transactions', {
          headers:{
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjI0NjIxNzEsInN1YiI6IjVhYmVlNGUxZDI4YTc2M2M4MWI3OWM2ZiIsImp0aSI6IiQyYSQxMCQ1LnRjbGp0cFhRSktZLjlnQ0V1TEt1c0UyVmd1RXMzSDEwR0FkNHlKaWEzMEgzN29YLzJkYSIsInJvbGVzIjpbInVzZXIiXX0.BZvu-sKaonSJDaNemsLueK4CSCF-UPIIFMaDQ3mDihM'
          }
        })
        .then(function(response){
        let data = response.data
        console.log(data);
        console.log(response.status);
        //add items to the data table and make them reactive:
          for(let i=0; i < data.length -10; i++){
            Vue.set(vm.transactions, i, {
              txID: data[i].transaction_id,
              timestamp: data[i].createdAt,
              numMessages: ((data[i].messages.length == 0) ? 0 : data[i].messages.length)
            })
          }
        });
      },
      fetchData: function(){
        this.interval = setInterval(()=>{this.getLatestTransactions()}, 1000)
      }
    },
    computed(){
      txLink: ()=> {
        return '/transactions/' + this.txID
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