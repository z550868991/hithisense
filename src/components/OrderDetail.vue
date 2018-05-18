<template>
    <div class="order-detail">
        <div class="content-wrapper">
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title">基本信息</p>
                    </template>
                    <el-form
                        class="base-infor"
                        :model="baseInfor"
                        label-width="1rem"
                        :inline="true">
                        <el-form-item label="订单ID">
                            <span>{{baseInfor.orderId}}</span>
                        </el-form-item>
                        <el-form-item label="组织ID">
                            <span>{{baseInfor.ogId}}</span>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <el-input v-if="isGr" v-model="baseInfor.createdBy" placeholder="输入创建人"></el-input>
                            <span v-else>{{baseInfor.createdBy}}</span>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <span>{{baseInfor.orderStatus}}</span>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <p class="title">订购明细</p>
                    </template>
                    <div class="prod-wrapper">
                        <prod-list-infor :prodList="prodList" :isOrder="true" :isAccountDetail="isAccountDetail" :isGr="isGr" @deletePro="deletePro"></prod-list-infor>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <p class="title">质量需求</p>
                    </template>
                    <div class="sla-wrapper" v-for="(sla, index) in slas" :key="sla.prodId">
                        <div class="sla-infor">
                            <span>产品ID： {{sla.prodId}}</span>
                            <span>产品版本： {{sla.prodVersion}}</span>
                        </div>
                        <sla-list-infor class="sla-list-infor" :slaList="sla.slaList" :isGr="isGr" @deleteSla="deleteSla" :sla="index" :isAccountDetail="isAccountDetail"></sla-list-infor>
                        <div class="add-wrapper">
                            <el-button v-if="isGr" type="primary" size="mini" @click="addSla(sla.slaList)">添加</el-button>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <p class="title">审核信息</p>
                    </template>
                    <div class="approve-wrapper">
                        <el-form
                            class="approve-infor"
                            :model="approveInfor"
                            label-width="1rem">
                            <el-form-item label="审核人">
                                <span v-if="isAccountDetail">{{approveInfor.approver}}</span>
                                <el-input v-else v-model="approveInfor.approver" placeholder="输入审核人"></el-input>
                            </el-form-item>
                            <el-form-item label="审核意见">
                                <span v-if="isAccountDetail">{{approveInfor.approveDesc}}</span>
                                <el-input
                                    v-else
                                    v-model="approveInfor.approveDesc"
                                    type="textarea"
                                    placeholder="输入审核意见"
                                    autosize>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="审核日期">
                                <span>{{approveInfor.approveDate}}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="content-footer">
                <div v-if="isAccountDetail" class="acount">
                    <span class="price">合计：{{acountMoney}}</span>
                    <el-button type="primary">结算</el-button>
                </div>
                <el-button v-else type="primary">部署iSC</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import ProdListInfor from '@/components/ProdListInfor'
import SlaListInfor from '@/components/SlaListInfor'
import {prodTypeEnum} from '@/dataMap'
import {query, formatDate, uuid} from '@/utils'

export default {
    components: {
        ProdListInfor,
        SlaListInfor
    },
    data() {
        return {
            prodTypeEnum,
            activeNames: ['1'],
            baseInfor: {
                orderId: '',
                ogId: '',
                createdBy: '',
                orderStatus: ''
            },
            prodList: [],
            slas: [{
                prodId: '1',
                prodVersion: '111',
                slaList: [{}]
            }],
            approveInfor: {
                approver: '',
                approveDesc: '',
                approveDate: ''
            },
            acountMoney: 0,
            isGr: false,
            isAccountDetail: false
        }
    },
    created() {
        let param = query(location.href.split('?')[1])
        this.isAccountDetail = !!param.isAccountDetail
        if (!!param.isGr) {
            let id = uuid()
            this.isGr = true
            this.baseInfor.orderId = id
        } else {
            if (!!param.id) {
                this.baseInfor.orderId = param.id
            }
            if (!this.isAccountDetail) {
                this.approveInfor.approveDate = formatDate(Date.now())
            }
        }
    },
    mounted() {
        let acountMoney = 0
        // 如果是订单详情2，这里写请求动作
        if (this.isAccountDetail) {
            // 动作
            this.prodList.forEach((pdt) => {
                acountMoney += pdt.pdtPrice
            })
            this.slas.forEach((sla) => {
                sla.slaList.forEach((item) => {
                    acountMoney += item.slaPrice
                })
            })
            this.acountMoney = acountMoney
        }
    },
    methods: {
        deletePro(index) {
            this.prodList.splice(index, 1)
        },
        deleteSla(sla, index) {
            this.slas[sla].slaList.splice(index, 1)
        },
        addSla(list) {
            list.push({
                slaCoding: '',
                slaContent: ''
            })
        }
    }
}
</script>
<style lang="stylus">
.order-detail
    padding: 0 .1rem
    .el-collapse
        margin-bottom: 1rem
        .title
            text-align: left
            margin: 0
            padding: 0 .3rem
            overflow: hidden
        .el-form
            font-size: .14rem
            padding: 0 .5rem
            text-align: left
            .el-form-item
                width: 48%
        .prod-wrapper
            width: 90%
            margin: 0 auto
            margin-bottom: .2rem
            box-shadow: -0.05rem .1rem .1rem #F2F6FC
        .sla-wrapper
            width: 90%
            margin: 0 auto
            margin-bottom: .2rem
            .sla-infor
                text-align: left
                span
                    margin-left: 1rem
                    &:first-child
                        margin-left: 0
            .sla-list-infor
                box-shadow: -0.05rem .1rem .1rem #F2F6FC
            .add-wrapper
                margin-top: .1rem
                text-align: left
        .approve-wrapper
            .el-form-item
                width: 90%
    .content-footer
        position: fixed
        bottom: 0
        left: 0
        right: 0
        padding: .1rem
        text-align: center
        background: rgba(0, 0, 0, .1)
        z-index: 2000
        .price
            font-size: .2rem
            color: #E6A23C
            font-weight: bold
            margin-right: 2rem
</style>
