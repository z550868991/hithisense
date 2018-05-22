<template>
    <div class="isc-list">
        <div class="query-param">
            <el-form :model="param" label-width=".8rem" :inline="true">
                <el-form-item label="iSC ID">
                    <el-input v-model="param.iSCId" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="组织ID">
                    <el-input v-model="param.ogId" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="iSC 名称">
                    <el-input v-model="param.iSCName" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="iSC 类型">
                    <el-input v-model="param.iSCType" placeholder="输入组件ID" clearable></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form>
        </div>
        <isc-list-infor :iscList="iscList" :isMOr="true"></isc-list-infor>
    </div>
</template>
<script>
import IscListInfor from '@/components/IscListInfor'

export default {
    components: {
        IscListInfor
    },
    data() {
        return {
            param: {
                iSCId: '',
                ogId: '',
                iSCName: '',
                iSCType: ''
            },
            iscList: []
        }
    },
    created() {
        this.$request
            .get('/api/cloudplatform/MOriSCInfo')
            .end((err, res) => {
                if (!!err) {
                    this.$message({
                        type: 'error',
                        message: err.response.text
                    })
                } else {
                    this.iscList = res.body || []
                }
            })
    }
}
</script>
<style lang="stylus">

</style>
