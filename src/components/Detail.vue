<template>
    <div class="detail">
        <div class="content-wrapper" v-if="!publish">
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title">基本信息</p>
                    </template>
                    <el-form
                        class="base-infor"
                        :model="baseInfor"
                        label-width=".9rem"
                        :inline="true">
                        <el-form-item label="组件ID：">
                            <span>{{baseInfor.bscID}}</span>
                        </el-form-item>
                        <el-form-item label="组件名称：">
                            <span>{{baseInfor.bscName}}</span>
                        </el-form-item>
                        <el-form-item label="组件版本：">
                            <el-input v-model="baseInfor.version"></el-input>
                        </el-form-item>
                        <el-form-item label="创建人：">
                            <span>{{baseInfor.developer}}</span>
                        </el-form-item>
                        <el-form-item label="创建时间：">
                            <span>{{baseInfor.bscTime}}</span>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <p class="title">描述信息</p>
                    </template>
                    <div class="interface">
                        <span class="label">组件统一访问接口：</span>
                        <el-input v-model="baseInfor.url"></el-input>
                    </div>
                    <div class="interface">
                        <span class="label">组件描述：</span>
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入内容"
                            v-model="baseInfor.description">
                        </el-input>
                    </div>
                    <el-button type="primary" size="mini" @click="saveDesc">保存配置</el-button>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <p class="title">服务信息</p>
                    </template>
                    <div class="service-wrapper">
                        <span v-if="!services.length">暂无数据~</span>
                        <div class="service-content" v-for="(service, index) in services" :key="service.id">
                            <el-form
                                class="service-data"
                                :model="service"
                                :inline="true">
                                <el-form-item label="服务ID">
                                    <span>{{service.seviceId}}</span>
                                </el-form-item>
                                <el-form-item label="服务名称">
                                    <el-input v-model="service.serviceName" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="服务类型">
                                    <el-input v-model="service.serviceType" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="服务访问路径">
                                    <el-input v-model="service.servicePath" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="服务访问参数">
                                    <el-input v-model="service.serviceParam" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="是否对外开放">
                                    <el-checkbox v-model="service.serviceOpen"></el-checkbox>
                                </el-form-item>
                                <el-form-item label="是否加密">
                                    <el-checkbox v-model="service.serviceSecurity"></el-checkbox>
                                </el-form-item>
                                <el-form-item label="加密方法">
                                    <el-input v-model="service.serviceMethod" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="密钥">
                                    <el-input v-model="service.serviceKey" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="返回数据格式类型">
                                    <el-input v-model="service.serviceReturnvaluetype" size="mini"></el-input>
                                </el-form-item>
                                <el-form-item label="返回数据格式：">
                                    <el-input v-model="service.serviceFormat" size="mini"></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="service-delete operate" @click="deleteService(index)">
                                删除
                            </div>
                        </div>
                        <div style="text-align: left">
                            <el-button type="primary" size="mini" @click="handleAddService">添加</el-button>
                        </div>
                        <el-button type="primary">保存配置</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <p class="title">资源配置信息</p>
                    </template>
                </el-collapse-item>
                <el-collapse-item name="5">
                    <template slot="title">
                        <p class="title">组件依赖</p>
                    </template>
                    <div class="comp-dependience">
                        <span v-if="!deps.length">暂无数据~</span>
                        <div
                            class="dep-wrapper"
                            v-for="(dep, index) in deps"
                            :key="index">
                            <el-form class="dep-content" :model="dep" label-width=".8rem" :inline="true">
                                <el-form-item label="组件ID">
                                    <el-input v-model="dep.compId"></el-input>
                                </el-form-item>
                                <el-form-item label="组件版本">
                                    <el-input v-model="dep.compVersion"></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="dep-delete operate" @click="deleteDep(index)">
                                删除
                            </div>
                        </div>
                        <div class="add-wrapper">
                            <el-button type="primary" size="mini" @click="addDep">添加</el-button>
                        </div>
                        <el-button type="primary" size="mini">保存配置</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="6">
                    <template slot="title">
                        <p class="title">组件数据源</p>
                    </template>
                    <div class="database-source">
                        <el-form :model="database" label-width="1rem" :inline="true">
                            <el-form-item label="数据库名称">
                                <el-input v-model="database.dbName"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库版本">
                                <el-input v-model="database.dbVersionId"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" size="mini">保存配置</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="7">
                    <template slot="title">
                        <p class="title">数据模型</p>
                    </template>
                    <div class="data-model">
                        <component-infor :infor="dataModel"></component-infor>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="content-wrapper publish-content-wrapper" v-else>
             <el-collapse v-model="publishActiveNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title">组件配置</p>
                    </template>
                    <el-form
                        class="comp-config"
                        :model="compConfig">
                        <el-form-item label="环境类型">
                            <el-radio-group v-model="compConfig.env">
                                <el-radio label="online">线上</el-radio>
                                <el-radio label="dev">开发</el-radio>
                                <el-radio label="test">测试</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否为当前运行版本">
                            <el-radio-group v-model="compConfig.isCurrent">
                                <el-radio :label="0">是</el-radio>
                                <el-radio :label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="发布描述信息">
                            <el-input
                                v-model="compConfig.infor"
                                type="textarea"
                                autosize></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <p class="title">模型配置</p>
                    </template>
                    <el-form
                        v-for="modelConfig in modelConfigs"
                        :key="modelConfig.modelId"
                        class="model-config"
                        :model="modelConfig"
                        :inline="true">
                        <el-form-item label="模型ID">
                            <span>{{modelConfig.modelId}}</span>
                        </el-form-item>
                        <el-form-item label="组件版本">
                            <span>{{modelConfig.modelVersion}}</span>
                        </el-form-item>
                        <el-form-item label="环境类型">
                            <el-radio-group v-model="modelConfig.env">
                                <el-radio label="online">线上</el-radio>
                                <el-radio label="dev">开发</el-radio>
                                <el-radio label="test">测试</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否为当前运行版本">
                            <el-radio-group v-model="modelConfig.isCurrent">
                                <el-radio :label="0">是</el-radio>
                                <el-radio :label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="发布信息描述">
                            <el-input
                                v-model="modelConfig.infor"
                                type="textarea"
                                autosize></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="content-footer">
            <el-button v-if="!publish" type="primary" @click="submit">发布</el-button>
            <el-button v-else type="primary" @click="publish">确认发布</el-button>
        </div>
    </div>
</template>
<script>
import {query, formatDate, formatTime, uuid} from '@/utils'
import ComponentInfor from '@/components/ComponentInfor'

export default {
    components: {
        ComponentInfor
    },
    data() {
        return {
            id: '',
            version: '',
            activeNames: ['1'],
            publishActiveNames: ['1'],
            baseInfor: {
                bscID: '',
                bscName: '',
                bscType: '',
                bscTime: '',
                modifiedTime: '',
                bscNum: '',
                developer: '',
                version: '',
                url: '',
                description: '',
                open: ''
            },
            services: [],
            deps: [],
            database: {
                dbName: '',
                dbVersionId: ''
            },
            dataModel: [],
            compConfig: {
                env: '',
                isCurrent: 0,
                infor: ''
            },
            modelConfigs: [{
                modelId: '',
                modelVersion: '',
                env: 'online',
                isCurrent: 0,
                infor: ''
            }],
            newService: {
                seviceId: '',
                serviceName: '',
                serviceType: '',
                servicePath: '',
                serviceParam: '',
                serviceOpen: '',
                serviceSecurity: '',
                serviceMethod: '',
                serviceKey: '',
                serviceReturnvaluetype: '',
                serviceFormat: ''
            },
            newDep: {
                compId: '',
                compVersion: ''
            },
            publish: false,
            showAddService: false
        }
    },
    created() {
        let param = query(location.href.split('?')[1])
        this.id = param.id || ''
        this.version = param.version || ''
        this.$request
            .post('/api/cloudplatform/selectDrBSCInfo-Main')
            .set('contentType', 'application/json')
            .send({
                id: this.id,
                version: this.version
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
            .post('/api/cloudplatform/selectDrBSCInfo-Main')
            .set('contentType', 'application/json')
            .send({
                id: this.id,
                version: this.version
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
    },
    mounted() {
    },
    methods: {
        uuid,
        formatDate,
        formatTime,
        submit() {
            this.publish = true
        },
        deleteService(index) {
            this.services.splice(index, 1)
        },
        saveDesc() {
            this.$request
                .post('/api/cloudplatform/submitDrBSCInfo-Desc')
                .set('contentType', 'application/json')
                .send({
                    id: this.id,
                    version: this.version,
                    url: this.baseInfor.url,
                    desc: this.baseInfor.description
                })
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.$message('保存成功！')
                    }
                })
        },
        handleAddService() {
            let id = uuid();
            this.services.push({
                ...this.newService,
                seviceId: id
            })
        },
        addDep() {
            this.deps.push({...this.newDep})
        },
        deleteDep(index) {
            this.deps.splice(index, 1)
        }
    }
}
</script>
<style lang="stylus">
.detail
    font-size: .14rem
    padding: 0 .1rem
    background: #E4E7ED
    .content-wrapper
        position: fixed
        top: .6rem
        left: 0
        bottom: 0
        right: 0
        overflow-y: auto
    .el-collapse
        margin-bottom: 1rem
        .title
            text-align: left
            margin: 0
            padding: 0 .3rem
            overflow: hidden
            .line
                display: inline-block
                margin-left: .14rem
                width: 90%
                height: 1px
                border-top: 1px solid #000000
        .el-collapse-item__wrap
            padding: 0 .2rem
            .el-form
                text-align: left
            .base-infor
                .el-form-item
                    width: 30%
            .interface
                display: flex
                align-items: center
                margin-bottom: .1rem
                .label
                    width: 1.5rem
            .operate
                display: flex
                align-items: center
                font-size: .14rem
                position: absolute
                top: 0
                right: 0
                width: .2rem
                height: 100%
                background: #F56C6C
                color: #ffffff
                cursor: pointer
                &:active
                    background: #FF4040
            .service-wrapper
                width: 100%
                margin: 0 auto
                .service-content
                    position: relative
                    margin-bottom: .1rem
                    border-radius: .5rem
                    .service-data
                        display: flex
                        justify-content: space-between
                        flex-wrap: wrap
                        padding: 0 .05rem
                        margin-right: .2rem
                        background: rgba(0, 0, 0, .06)
            .comp-dependience
                width: 100%
                .dep-wrapper
                    position: relative
                    margin-bottom: .1rem
                    border-radius: .5rem
                    .dep-content
                        display: flex
                        align-items: center
                        padding: 0 .05rem
                        margin-right: .2rem
                        background: rgba(0, 0, 0, .06)
                        .el-form-item
                            margin: .1rem 0
                .add-wrapper
                    text-align: left
            .model-config
                background: rgba(0, 0, 0, .06)
                padding: 0 .1rem
                .el-form-item
                    min-width: 30%
    .add-service
        .el-form
            text-align: left
            .el-form-item
                .el-input
                    max-width: 70%
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
