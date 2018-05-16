<template>
    <div class="user-register">
        <div class="query-param">
            <el-form :model="param" label-width=".8rem" :inline="true">
                <el-form-item label="组织ID">
                    <el-input v-model="param.id" placeholder="输入组织ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="组织名称">
                    <el-input v-model="param.name" placeholder="输入组织名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="属性">
                    <el-input v-model="param.attr" placeholder="输入属性" clearable></el-input>
                </el-form-item>
                <el-form-item label="组织类别">
                    <el-input v-model="param.type" placeholder="输入组织类别" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="param.status" placeholder="输入状态" clearable></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form>
        </div>
        <user-register-infor :infor="infor"></user-register-infor>
    </div>
</template>
<script>
import UserRegisterInfor from '@/components/UserRegisterInfor'

export default {
    components: {
        UserRegisterInfor
    },
    data() {
        return {
            param: {
                id: '',
                name: '',
                attr: '',
                type: '',
                status: ''
            },
            infor: []
        }
    }
}
</script>
<style lang="stylus">
.user-register
    .query-param
        text-align: left
        .el-form-item
            width: 30%
</style>
