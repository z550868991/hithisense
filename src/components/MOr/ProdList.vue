<template>
    <div class="prod-list">
        <div class="query-param">
            <el-form :model="param" label-width=".8rem" :inline="true">
                <el-form-item label="产品ID">
                    <el-input v-model="param.id" placeholder="输入产品ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="产品名称">
                    <el-input v-model="param.name" placeholder="输入产品名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="产品类别">
                    <el-input v-model="param.type" placeholder="输入产品类别" clearable></el-input>
                </el-form-item>
                <el-form-item label="产品版本">
                    <el-input v-model="param.version" placeholder="输入产品版本" clearable></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form>
        </div>
        <prod-list-infor :prodList="prodList"></prod-list-infor>
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
                id: '',
                name: '',
                version: '',
                type: '',
                status: ''
            },
            prodList: []
        }
    },
    created() {
        this.$request
            .get('/api/cloudplatform/MOrpdtInfo')
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
.prod-list
    .query-param
        text-align: left
        .el-form-item
            width: 30%
</style>
