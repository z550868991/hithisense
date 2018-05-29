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
                            <el-input v-if="isMOr" v-model="baseInfor.iSCName" placeholder="输入服务中心名称"></el-input>
                            <span v-else>{{baseInfor.iSCName}}</span>
                        </el-form-item>
                        <el-form-item label="服务中心类型：">
                            <el-input v-if="isMOr" v-model="baseInfor.iSCType" placeholder="输入服务中心类型"></el-input>
                            <span v-else>{{baseInfor.iSCType}}</span>
                        </el-form-item>
                        <el-form-item label="服务访问地址：">
                            <el-input v-if="isMOr" v-model="baseInfor.iSCUrl" placeholder="输入服务访问地址"></el-input>
                            <span v-else>{{baseInfor.iSCUrl}}</span>
                        </el-form-item>
                        <el-form-item v-if="isMOr" label="起始组件名称：">
                            <el-input v-model="startBSC" placeholder="输入起始组件名称"></el-input>
                        </el-form-item>
                        <el-form-item label="创建人：">
                            <el-input v-if="isMOr" v-model="baseInfor.createdBy" placeholder="输入创建人"></el-input>
                            <span v-else>{{baseInfor.createdBy}}</span>
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
                                <el-input v-if="isMOr" v-model="databaseConfig.host" placeholder="输入数据库节点IP" @input="changeUrl"></el-input>
                                <span v-else>{{databaseConfig.host}}</span>
                            </el-form-item>
                            <el-form-item label="端口">
                                <el-input v-if="isMOr" v-model="databaseConfig.port" placeholder="输入端口" @input="changeUrl"></el-input>
                                <span v-else>{{databaseConfig.port}}</span>
                            </el-form-item>
                            <el-form-item label="数据库">
                                <el-input v-if="isMOr" v-model="databaseConfig.database" placeholder="输入数据库" @input="changeUrl"></el-input>
                                <span v-else>{{databaseConfig.database}}</span>
                            </el-form-item>
                            <el-form-item label="数据库驱动">
                                <el-select v-if="isMOr" v-model="databaseConfig.driver"  placeholder="选择数据库驱动">
                                    <el-option label="MySQL" value="MySQL"></el-option>
                                </el-select>
                                <span v-else>{{databaseConfig.driver}}</span>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input v-if="isMOr" v-model="databaseConfig.user" placeholder="输入用户名"></el-input>
                                <span v-else>{{databaseConfig.user}}</span>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-if="isMOr" v-model="databaseConfig.password" placeholder="输入密码"></el-input>
                                <span v-else>{{databaseConfig.password}}</span>
                            </el-form-item>
                            <el-form-item label="URL">
                                <span>jdbc:mysql://{{databaseConfig.url}}</span>
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
                                    <input v-if="isMOr" v-model="scope.row.pointIp" placeholder="输入服务节点IP">
                                    <span v-else>{{scope.row.pointIp}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="访问端口">
                                <template slot-scope="scope">
                                    <input v-if="isMOr" v-model="scope.row.pointPort" placeholder="8080">
                                    <span v-else>{{scope.row.pointPort}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="传输端口">
                                <template slot-scope="scope">
                                    <input v-if="isMOr" v-model="scope.row.pointAddress" placeholder="8090">
                                    <span v-else>{{scope.row.pointAddress}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                v-if="isMOr"
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="deletePoint(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="add-wrapper">
                        <el-button v-if="isMOr" type="primary" size="mini" @click="addPoint">添加</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="content-footer">
                <el-button v-if="isMOr" type="primary" @click="deployStep1">确认部署</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import ComponentInfor from '@/components/ComponentInfor'
import {query, uuid} from '@/utils'

export default {
    components: {
        ComponentInfor
    },
    data() {
        return {
            activeNames: ['1'],
            startBSC: '',
            baseInfor: {
                iSCId: '',
                ogId: '',
                iSCName: '',
                iSCType: '',
                iSCUrl: '',
                createdBy: '',
                gmtCreate: '',
                modifiedBy: '',
                gmtModified: ''
            },
            compList: [],
            databaseConfig: {
                host: '',
                port: '',
                database: '',
                user: '',
                password: '',
                url: '',
                driver: 'MySQL',
                iSCid: ''
            },
            pointConfigs: [],
            isMOr: false
        }
    },
    created() {
        let param = query(location.href.split('?')[1])
        this.isMOr = !!param.isMOr
        if (!!param.id) {
            this.baseInfor.iSCId = param.id
            this.baseInfor.ogId = param.og
            this.$request
                .post('/api/cloudplatform/selectiSCInfo-main')
                .set('contentType', 'application/json')
                .send({
                    iSCID: param.id
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
                .post('/api/cloudplatform/selectiSCInfo-BSCs')
                .set('contentType', 'application/json')
                .send({
                    iSCID: param.id
                })
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.compList = res.body
                    }
                })
            this.$request
                .post('/api/cloudplatform/selectMOriSCInfo-DB')
                .set('contentType', 'application/json')
                .send({
                    iSCID: param.id
                })
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.databaseConfig = res.body
                    }
                })
            this.$request
                .post('/api/cloudplatform/selectMOriSCInfo-SN')
                .set('contentType', 'application/json')
                .send({
                    iSCID: param.id
                })
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        let resSN = []
                        for(let i = 0; i < res.body.length; i += 3) {
                            resSN.push({
                                pointIp: res.body[i],
                                pointPort: res.body[i + 1],
                                pointAddress: res.body[i + 2]
                            })
                        }
                        this.pointConfigs = resSN
                    }
                })
        } else {
            let id = 'iSC' + uuid()
            this.baseInfor.iSCId = id
            this.baseInfor.ogId = param.og
            this.$request
                .post('/api/cloudplatform/deployiSCInfo-BSCs')
                .set('contentType', 'application/json')
                .send({
                    orderId: param.oid
                })
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.compList = res.body || []
                    }
                })
        }
    },
    methods: {
        changeUrl() {
            this.databaseConfig.url = `${this.databaseConfig.host}:${this.databaseConfig.port}/${this.databaseConfig.database}`
        },
        addPoint() {
            this.pointConfigs.push({
                pointIp: '',
                pointPort: '',
                pointAddress: ''
            })
        },
        deletePoint(index) {
            this.pointConfigs.splice(index, 1)
        },
        deployStep1() {
            this.$request
                .post('/api/cloudplatform/deploySaveiSCInfo-main')
                .set('contentType', 'application/json')
                .send(this.baseInfor)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.deployStep2()
                    }
                })
        },
        deployStep2() {
            let dbconn = this.databaseConfig
            dbconn.iSCid = this.baseInfor.iSCId
            this.$request
                .post('/api/cloudplatform/deploySaveiSCInfo-DB')
                .set('contentType', 'application/json')
                .send(dbconn)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.deployStep3()
                    }
                })
        },
        deployStep3() {
            let ipAndport = []
            ipAndport.push(this.baseInfor.iSCId)
            this.pointConfigs.forEach(item => {
                ipAndport.push(item.pointIp)
                ipAndport.push(item.pointPort)
                ipAndport.push(item.pointAddress)
            })
            this.$request
                .post('/api/cloudplatform/deploySaveiSCInfo-SN')
                .set('contentType', 'application/json')
                .send(ipAndport)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.deployStep4()
                    }
                })
        },
        deployStep4() {
            let result = this.compList.map(item => {
                return {
                    id: item.bscID,
                    version: item.version
                }
            })
            result.unshift({
                id: this.baseInfor.iSCId,
                version: ''
            })
            this.$request
                .post('/api/cloudplatform/deploySaveiSCInfo-BSCs')
                .set('contentType', 'application/json')
                .send(result)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.deployStep5()
                    }
                })
        },
        deployStep5() {
            let IDandURL = []
            IDandURL.push(this.baseInfor.iSCId)
            IDandURL.push(this.startBSC)
            this.$request
                .post('/api/cloudplatform/deployCommand')
                .set('contentType', 'application/json')
                .send(IDandURL)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.$message('部署请求已发送，等待服务节点部署')
                    }
                })
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
