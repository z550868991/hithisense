<template>
    <div class="isc-detail">
        <div class="content-wrapper">
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title">基本信息</p>
                    </template>
                    <el-form
                        class="base-infor"
                        :model="baseInfor"
                        label-width="1.2rem"
                        :inline="true">
                        <el-form-item label="iSC ID：">
                            <span>{{baseInfor.iSCId}}</span>
                        </el-form-item>
                        <el-form-item label="组织ID：">
                            <span>{{baseInfor.ogId}}</span>
                        </el-form-item>
                        <el-form-item label="服务中心名称：">
                            <el-input v-model="baseInfor.iSCName" placeholder="输入服务中心名称"></el-input>
                        </el-form-item>
                        <el-form-item label="服务中心类型：">
                            <el-input v-model="baseInfor.iSCType" placeholder="输入服务中心类型"></el-input>
                        </el-form-item>
                        <el-form-item label="服务访问地址：">
                            <el-input v-model="baseInfor.iSCUrl" placeholder="输入服务访问地址"></el-input>
                        </el-form-item>
                        <el-form-item label="创建人：">
                            <el-input v-model="baseInfor.createBy" placeholder="输入创建人"></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <p class="title">组件信息</p>
                    </template>
                    <div class="comp-wrapper">
                        <component-infor :infor="compList"></component-infor>
                    </div>
                </el-collapse-item>
               <el-collapse-item name="3">
                    <template slot="title">
                        <p class="title">数据库连接配置</p>
                    </template>
                    <div class="database-wrapper">
                        <el-form
                            class="database-infor"
                            :model="databaseConfig"
                            label-width="1.2rem"
                            :inline="true">
                            <el-form-item label="数据库节点IP">
                                <el-input v-model="databaseConfig.ip" placeholder="输入数据库节点IP"></el-input>
                            </el-form-item>
                            <el-form-item label="端口">
                                <el-input v-model="databaseConfig.port" placeholder="输入端口"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库">
                                <el-input v-model="databaseConfig.database" placeholder="输入数据库"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库驱动">
                                <el-select v-model="databaseConfig.drive"  placeholder="选择数据库驱动">
                                    <el-option label="MySQL" value="MySQL"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input v-model="databaseConfig.username" placeholder="输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="databaseConfig.pwd" placeholder="输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="URL">
                                <el-input v-model="databaseConfig.url" placeholder="输入URL"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <p class="title">服务节点配置</p>
                    </template>
                    <div class="point-wrapper">
                        <el-table
                            :data="pointConfigs"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="50%">
                            </el-table-column>
                            <el-table-column
                                label="服务节点IP">
                                <template slot-scope="scope">
                                    <input v-model="scope.row.pointIp" placeholder="输入服务节点IP">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="访问端口">
                                <template slot-scope="scope">
                                    <input v-model="scope.row.pointPort" placeholder="输入访问端口">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="传输端口">
                                <template slot-scope="scope">
                                    <input v-model="scope.row.pointAddress" placeholder="输入传输端口">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="deletePoint(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="add-wrapper">
                        <el-button type="primary" size="mini" @click="addPoint">添加</el-button>
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
import ComponentInfor from '@/components/ComponentInfor'
import {query} from '@/utils'

export default {
    components: {
        ComponentInfor
    },
    data() {
        return {
            activeNames: ['1'],
            baseInfor: {
                iSCId: '',
                ogId: '',
                iSCName: '',
                iSCType: '',
                iSCUrl: '',
                createBy: ''
            },
            compList: [],
            databaseConfig: {
                ip: '',
                database: '',
                port: '',
                username: '',
                pwd: '',
                drive: '',
                url: ''
            },
            pointConfigs: []
        }
    },
    created() {
        let param = query(location.href.split('?')[1])
        if (!!param.id) {
            this.baseInfor.iSCId = param.id
            this.baseInfor.ogId = param.og
        }
    },
    methods: {
        addPoint() {
            this.pointConfigs.push({
                pointIp: '',
                pointPort: '',
                pointAddress: ''
            })
        },
        deletePoint(index) {
            this.pointConfigs.splice(index, 1)
        }
    }
}
</script>
<style lang="stylus">
.isc-detail
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
        .comp-wrapper
            width: 90%
            margin: 0 auto
            margin-bottom: .2rem
            box-shadow: -0.05rem .1rem .1rem #F2F6FC
        .point-wrapper
            width: 90%
            margin: 0 auto
            margin-bottom: .2rem
            box-shadow: -0.05rem .1rem .1rem #F2F6FC
            input
                font-size: .14rem
                width: 100%
                padding: .05rem 0
                color: #606266
                border: none
                outline: none
                background: rgba(0, 0, 0, 0)
                &::placeholder
                    color: #dcdfe6
        .add-wrapper
            width: 90%
            margin: 0 auto
            text-align: left
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
