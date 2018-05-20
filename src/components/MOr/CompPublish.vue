<template>
    <div class="comp-publish">
        <div class="query-param">
            <el-form :model="param" label-width=".8rem" :inline="true">
                <el-form-item label="组件ID">
                    <el-input v-model="param.id" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="组件名称">
                    <el-input v-model="param.name" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="组件版本">
                    <el-input v-model="param.version" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form>
        </div>
        <div class="add-wrapper">
            <el-button type="primary" size="mini" @click="goForAdd">添加产品</el-button>
        </div>
        <component-infor :infor="infor" :selectable="true" @addPdt="addPdt"></component-infor>
    </div>
</template>
<script>
import ComponentInfor from '@/components/ComponentInfor'

export default {
    components: {
        ComponentInfor
    },
    data() {
        return {
            status,
            param: {
                id: '',
                name: '',
                version: '',
                status: ''
            },
            infor: [],
            selection: []
        }
    },
    methods: {
        goForAdd() {
            if (!this.selection.length) {
                this.$message({
                    type: 'warning',
                    message: '至少选择一条数据'
                })
                return
            }
            let result = this.selection.map(item => {
                return {
                    id: item.bscID,
                    version: item.version
                }
            })
            this.$request
                .post('/api/cloudplatform/savePdtSelectBSCs')
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
            this.$router.push('/prodDetail?editor=1&isMOr=1')
        },
        addPdt(selection) {
            this.selection = selection
        }
    },
    created() {
        this.$request
            .get('/api/cloudplatform/MOrBSCInfo')
            .end((err, res) => {
                if (!!err) {
                    this.$message({
                        type: 'error',
                        message: err.response.text
                    })
                } else {
                    this.infor = res.body
                }
            })
    }
}
</script>
<style lang="stylus">
.comp-publish
    position: relative
    .query-param
        text-align: left
    .add-wrapper
        position: fixed
        top: 1rem
        right: .3rem
        padding: .05rem 0
</style>
