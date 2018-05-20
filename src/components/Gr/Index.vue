<template>
    <div class="gr-index">
        <p class="title">产品列表:</p>
        <div class="query-param">
            <el-form :model="param" label-width=".8rem" :inline="true">
                <el-form-item label="产品ID">
                    <el-input v-model="param.pdtId" placeholder="输入产品ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="产品名称">
                    <el-input v-model="param.pdtName" placeholder="输入产品名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="产品类别">
                    <el-input v-model="param.pdtType" placeholder="输入产品类别" clearable></el-input>
                </el-form-item>
                <el-form-item label="产品版本">
                    <el-input v-model="param.pdtVersion" placeholder="输入产品版本" clearable></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form>
        </div>
        <prod-list-infor :prodList="prodList" :isGr="true" @addOrder="addOrder"></prod-list-infor>
        <el-button class="submit" type="primary" @click="goForDetail">订购</el-button>
    </div>
</template>
<script>
import ProdListInfor from '@/components/ProdListInfor'

export default {
    components: {
        ProdListInfor
    },
    data() {
        return {
            param: {
                pdtId: '',
                pdtName: '',
                pdtType: '',
                pdtVersion: ''
            },
            prodList: [],
            selection: []
        }
    },
    methods: {
        goForDetail() {
            if (!this.selection.length) {
                this.$message({
                    type: 'warning',
                    message: '至少选择一条数据'
                })
                return
            }
            let result = this.selection.map(item => {
                return {
                    id: item.pdtId,
                    version: item.pdtVersion
                }
            })
            this.$request
                .post('/api/cloudplatform/saveOrderSelectPdts')
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
            this.$router.push(`/orderdetail?isGr=1`)
        },
        addOrder(selection) {
            this.selection = selection
        }
    },
    created() {
        this.$request
            .get('/api/cloudplatform/GrpdtInfo')
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
    }
}
</script>
<style lang="stylus">
.gr-index
    padding: 0 .1rem
    .title
        font-size: .16rem
        text-align: left
    .query-param
        text-align: left
        .el-form-item
            width: 20%
    .submit
        margin-top: .15rem
</style>
