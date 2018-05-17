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
    </div>
</template>
<script>
export default {
    data() {
        return {
            param: {
                pdtId: '',
                pdtName: '',
                pdtType: '',
                pdtVersion: ''
            }
        }
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
</style>
