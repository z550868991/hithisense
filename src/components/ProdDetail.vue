<template>
    <div class="prod-detail">
        <div class="content-wrapper">
            <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <p class="title">基本信息</p>
                    </template>
                    <el-form
                        class="base-infor"
                        :model="baseInfor"
                        label-width="1rem">
                        <el-form-item label="产品ID">
                            <span>{{baseInfor.pdtId}}</span>
                        </el-form-item>
                        <el-form-item label="产品名称">
                            <el-input v-model="baseInfor.pdtName" placeholder="输入产品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="产品类别">
                            <el-radio-group v-model="baseInfor.pdtType">
                                <el-radio
                                    v-for="type in prodTypeEnum"
                                    :key="type.value"
                                    :label="type.value">{{type.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="产品LOGO">
                            <el-input v-model="baseInfor.pdtIcon" placeholder="输入产品LOGO"></el-input>
                        </el-form-item>
                        <el-form-item label="产品版本号">
                            <el-input v-model="baseInfor.pdtVersion" placeholder="输入产品版本号"></el-input>
                        </el-form-item>
                        <el-form-item label="产品状态">
                            <el-radio-group v-model="baseInfor.pdtStatus">
                                <el-radio v-for="st in pdtStatusEnum" :label="st.value" :key="st.value">{{st.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="运营团队ID">
                            <el-input v-model="baseInfor.busoprTeamId" placeholder="输入运营团队ID"></el-input>
                        </el-form-item>
                        <el-form-item label="产品概述">
                            <el-input v-model="baseInfor.pdtDesc" placeholder="输入产品概述"></el-input>
                        </el-form-item>
                        <el-form-item label="产品功能">
                            <el-input v-model="baseInfor.pdtFunc" placeholder="输入产品功能"></el-input>
                        </el-form-item>
                        <el-form-item label="使用场景">
                            <el-input v-model="baseInfor.useCase" placeholder="输入使用场景"></el-input>
                        </el-form-item>
                        <el-form-item label="应用案例">
                            <el-input v-model="baseInfor.appCase" placeholder="输入应用案例"></el-input>
                        </el-form-item>
                        <el-form-item label="产品手册">
                            <el-input v-model="baseInfor.pdtMan" placeholder="输入产品手册"></el-input>
                        </el-form-item>
                        <el-form-item label="常见问题">
                            <el-input v-model="baseInfor.pdtQuestion" placeholder="输入常见问题"></el-input>
                        </el-form-item>
                        <el-form-item label="服务协议">
                            <el-input v-model="baseInfor.serviceProtocol" placeholder="输入服务协议"></el-input>
                        </el-form-item>
                        <el-form-item label="创建人">
                            <el-input v-model="baseInfor.createdBy" placeholder="输入创建人"></el-input>
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
            </el-collapse>
            <div class="content-footer">
                <el-button type="primary" @click="savePdt">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import ComponentInfor from '@/components/ComponentInfor'
import {prodTypeEnum, pdtStatusEnum} from '@/dataMap'
import {query} from '@/utils'

export default {
    components: {
        ComponentInfor
    },
    data() {
        return {
            prodTypeEnum,
            pdtStatusEnum,
            activeNames: ['1'],
            baseInfor: {
                pdtId: '（暂无）',
                pdtName: '',
                pdtType: '01',
                pdtIcon: '',
                pdtVersion: '',
                bizServiceIDs: '',
                pdtStatus: '0',
                busoprTeamId: '',
                pdtDesc: '',
                pdtFunc: '',
                useCase: '',
                appCase: '',
                pdtMan: '',
                pdtQuestion: '',
                serviceProtocol: '',
                createdBy: '',
                createdTime: '',
                lastModifiedBy: '',
                lastModifiedTime: ''
            },
            compList: []
        }
    },
    methods: {
        savePdt() {
            this.$request
                .post('/api/cloudplatform/MOrpdtEdit-baseInfo')
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
            let result = this.compList.map(item => {
                return {
                    id: item.bscID,
                    version: item.version
                }
            })
            result.unshift({
                id: this.baseInfor.pdtId,
                version: this.baseInfor.pdtVersion
            })
            this.$request
                .post('/api/cloudplatform/MOrpdtEdit-selectBSCs')
                .set('contentType', 'application/json')
                .send(result)
                .end((err) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    }
                })
            this.$message('保存成功！')
        }
    },
    created() {
        let param = query(location.href.split('?')[1])
        if (!!param.id) {
            this.baseInfor.pdtId = param.id
        }
        this.$request
            .get('/api/cloudplatform/getPdtSelectBSCs')
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
    }
}
</script>
<style lang="stylus">
.prod-detail
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
        .comp-wrapper
            width: 90%
            margin: 0 auto
            margin-bottom: .2rem
            box-shadow: -0.05rem .1rem .1rem #F2F6FC
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
