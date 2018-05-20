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
                            <span>{{orderdStatus[baseInfor.auditFlag]}}</span>
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
                    <div class="sla-wrapper" v-for="(sla, index) in slas" :key="index">
                        <div class="sla-infor">
                            <span>产品ID： {{sla.prodId}}</span>
                            <span>产品版本： {{sla.prodVersion}}</span>
                        </div>
                        <sla-list-infor
                                        ref="slalistinfor"
                                        class="sla-list-infor"
                                        :slaList="sla.slaList"
                                        :isGr="isGr"
                                        @deleteSla="deleteSla"
                                        :sla="index"
                                        :isAccountDetail="isAccountDetail"></sla-list-infor>
                        <div class="add-wrapper">
                            <el-button v-if="isGr" type="primary" size="mini" @click="addSla(sla)">添加</el-button>
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
                                <span v-if="!isMOr">{{approveInfor.approver}}</span>
                                <el-input v-else v-model="approveInfor.approver" placeholder="输入审核人"></el-input>
                            </el-form-item>
                            <el-form-item label="审核意见">
                                <span v-if="!isMOr">{{approveInfor.approveDesc}}</span>
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
                <el-button v-if="isGr" type="primary" @click="submitOrder">提交</el-button>
                <el-button v-else type="primary" @click="deployOrder">部署iSC</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import ProdListInfor from '@/components/ProdListInfor'
import SlaListInfor from '@/components/SlaListInfor'
import {prodTypeEnum, orderdStatus} from '@/dataMap'
import {query, formatDate, formatTime, uuid} from '@/utils'

export default {
    components: {
        ProdListInfor,
        SlaListInfor
    },
    data() {
        return {
            prodTypeEnum,
            orderdStatus,
            activeNames: ['1'],
            baseInfor: {
                orderId: '',
                ogId: '',
                createdBy: '',
                gmtCreate: '',
                modifiedBy: '',
                gmtModified: '',
                checkPerson: '',
                gmtCheck: '',
                auditFlag: '0',
                checkComment: ''
            },
            prodList: [],
            slas: [{
                prodId: '',
                prodVersion: '',
                slaList: []
            }],
            approveInfor: {
                approver: '',
                approveDesc: '',
                approveDate: ''
            },
            acountMoney: 0,
            isGr: false,
            isMOr: false,
            isAccountDetail: false
        }
    },
    created() {
        let param = query(location.href.split('?')[1])
        this.isAccountDetail = !!param.isAccountDetail
        this.isMOr = !!param.isMOr
        if (!!param.isGr) {
            let id = 'O' + uuid()
            this.isGr = true
            this.baseInfor.orderId = id
            this.$request
                .post('/api/cloudplatform/getGroupID')
                .set('contentType', 'application/json')
                .send({
                    account: this.$store.state.userInfor.account
                })
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.baseInfor.ogId = res.text
                    }
                })
            this.$request
                .get('/api/cloudplatform/getOrderSelectPdts')
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.prodList = res.body
                        this.slas = res.body.map((item) => {
                            return {
                                prodId: item.pdtId,
                                prodVersion: item.pdtVersion,
                                slaList: []
                            }
                        })
                    }
                })
        } else {
            if (!!param.id) {
                this.baseInfor.orderId = param.id
                this.$request
                    .post('/api/cloudplatform/selectMOrorderInfo-base')
                    .set('contentType', 'application/json')
                    .send({
                        orderId: this.baseInfor.orderId
                    })
                    .end((err, res) => {
                        if (!!err) {
                            this.$message({
                                type: 'error',
                                message: err.response.text
                            })
                        } else {
                            this.baseInfor = res.body
                        }
                    })
                this.$request
                    .post('/api/cloudplatform/selectorderInfo-pdt')
                    .set('contentType', 'application/json')
                    .send({
                        orderId: this.baseInfor.orderId
                    })
                    .end((err, res) => {
                        if (!!err) {
                            this.$message({
                                type: 'error',
                                message: err.response.text
                            })
                        } else {
                            this.prodList = res.body
                        }
                    })
                this.$request
                    .post('/api/cloudplatform/selectorderInfo-sla')
                    .set('contentType', 'application/json')
                    .send({
                        orderId: this.baseInfor.orderId
                    })
                    .end((err, res) => {
                        if (!!err) {
                            this.$message({
                                type: 'error',
                                message: err.response.text
                            })
                        } else {
                            this.slas = res.body
                        }
                    })
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
        addSla(sla) {
            sla.slaList.push({
                slaCoding: '',
                slaContent: ''
            })
        },
        submitOrder() {
            this.$request
                .post('/api/cloudplatform/submitOrder-main')
                .set('contentType', 'application/json')
                .send(this.baseInfor)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    }
                })
            let time = Date.now()
            let orderPdtRes = this.prodList.map(item => {
                return {
                    orderId: this.baseInfor.orderId,
                    pdtId: item.pdtId,
                    pdtVersion: item.pdtVersion,
                    pdtPrice: '',
                    createdBy: this.baseInfor.createdBy,
                    gmtCreate: formatDate(time) + ' ' + formatTime(time),
                    modifiedBy: '',
                    gmtModified: '1000-01-01 00:00:00'
                }
            })
            this.$request
                .post('/api/cloudplatform/submitOrder-pdt')
                .set('contentType', 'application/json')
                .send(orderPdtRes)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    }
                })
            let orderSLARes = []
            this.$refs.slalistinfor.forEach(item => {
                item.$emit('submit')
            })
            this.slas.forEach(item => {
                item.slaList.forEach(sla => {
                    orderSLARes.push({
                        orderId: this.baseInfor.orderId,
                        pdtId: item.prodId,
                        pdtVersion: item.prodVersion,
                        slaCode: sla.slaCoding,
                        slaContent: sla.slaContent,
                        slaPrice: '',
                        createdBy: this.baseInfor.createdBy,
                        gmtCreate: formatDate(time) + ' ' + formatTime(time),
                        modifiedBy: '',
                        gmtModified: '1000-01-01 00:00:00'
                    })
                })
            })
            this.$request
                .post('/api/cloudplatform/submitOrder-sla')
                .set('contentType', 'application/json')
                .send(orderSLARes)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    }
                })
        },
        deployOrder() {

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
