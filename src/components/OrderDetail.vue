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
                            <span>{{baseInfor.createdBy}}</span>
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
                        <prod-list-infor :prodList="prodList" :isOrder="true"></prod-list-infor>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <p class="title">质量需求</p>
                    </template>
                    <div class="sla-wrapper" v-for="sla in slas" :key="sla.prodId">
                        <div class="sla-infor">
                            <span>产品ID： {{sla.prodId}}</span>
                            <span>产品版本： {{sla.prodVersion}}</span>
                        </div>
                        <sla-list-infor :slaList="sla.slaList"></sla-list-infor>
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
                                <el-input v-model="approveInfor.approver" placeholder="输入审核人"></el-input>
                            </el-form-item>
                            <el-form-item label="审核意见">
                                <el-input
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
                <el-button type="primary">部署iSC</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import ProdListInfor from '@/components/ProdListInfor'
import SlaListInfor from '@/components/SlaListInfor'
import {prodTypeEnum} from '@/dataMap'
import {query, formatDate} from '@/utils'

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
            slas: [],
            approveInfor: {
                approver: '',
                approveDesc: '',
                approveDate: ''
            }
        }
    },
    created() {
        let param = query(location.href.split('?')[1])
        if (!!param.id) {
            this.baseInfor.orderId = param.id
        }
        this.approveInfor.approveDate = formatDate(Date.now())
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
            box-shadow: -0.05rem .1rem .1rem #F2F6FC
            .sla-infor
                text-align: left
                span
                    margin-left: 1rem
                    &:first-child
                        margin-left: 0
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
</style>
