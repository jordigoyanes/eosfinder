import Vue from 'vue'
import Router from 'vue-router'
import Overview from '@/components/Overview'
import Blocks from '@/components/Blocks'
import Accounts from '@/components/Accounts'
import Account from '@/components/Account'
import Messages from '@/components/Messages'
import Transactions from '@/components/Transactions'
import Transaction from '@/components/Transaction'
import Stats from '@/components/Stats'
import Search from '@/components/Search'
import Block from '@/components/Block'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/blocks',
      name: 'Blocks',
      component: Blocks
    },
    {
      path: '/blocks/:blockIdOrNum',
      name: 'Block',
      props: true,
      component: Block
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: Transactions
    },
    {
      path: '/transactions/:transactionID',
      name: 'Transaction',
      props: true,
      component: Transaction
    },
    {
      path: '/accounts/:accountName',
      name: 'Account',
      props: true,
      component: Account
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/search/:searchQuery',
      name: 'Search',
      props: true,
      component: Search
    }
  ]
})
