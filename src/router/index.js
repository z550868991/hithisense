import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import DrIndex from '@/components/Dr/Index'
import MOrIndex from '@/components/MOr/Index'
import GrIndex from '@/components/Gr/Index'
import MOrCompPublish from '@/components/MOr/CompPublish'
import MOrIscList from '@/components/MOr/IscList'
import MOrIscRequest from '@/components/MOr/IscRequest'
import MOrOrder from '@/components/MOr/Order'
import MOeProdList from '@/components/MOr/ProdList'
import MOrUserRegister from '@/components/MOr/UserRegister'
import Detail from '@/components/Detail'
import ProdDetail from '@/components/ProdDetail'
import OrderDetail from '@/components/OrderDetail'
import IscDetail from '@/components/IscDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: 'dr',
                component: DrIndex
            },
            {
                path: 'detail',
                component: Detail
            },
            {
                path: 'proddetail',
                component: ProdDetail
            },
            {
                path: 'orderdetail',
                component: OrderDetail
            },
            {
                path: 'iscdetail',
                component: IscDetail
            },
            {
                path: 'mor',
                component: MOrIndex,
                children: [
                    {
                        path: 'comppublish',
                        component: MOrCompPublish
                    },
                    {
                        path: 'isclist',
                        component: MOrIscList
                    },
                    {
                        path: 'iscrequest',
                        component: MOrIscRequest
                    },
                    {
                        path: 'order',
                        component: MOrOrder
                    },
                    {
                        path: 'prodlist',
                        component: MOeProdList
                    },
                    {
                        path: 'userregister',
                        component: MOrUserRegister
                    }
                ]
            },
            {
                path: 'gr',
                component: GrIndex
            }
        ]
    },
    {
        path: '/login',
        component: Login
    }
  ]
})
