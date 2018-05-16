<template>
    <div class="dr-index">
        <p class="title">我的组件:</p>
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
                <el-form-item label="组件状态">
                    <el-select v-model="param.status" placeholder="输入组件ID" clearable>
                        <el-option
                            v-for="s in status"
                            :key="s.value"
                            :value="s.value"
                            :label="s.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form>
        </div>
        <component-infor :infor="infor"></component-infor>
    </div>
</template>
<script>
import ComponentInfor from '@/components/ComponentInfor'
import {status} from '@/dataMap'

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
            infor: []
        }
    },
    created() {
        this.$request
            .post('/api/cloudplatform/DrBSCInfo')
            .set('contentType', 'application/json')
            .send({
                userName: this.$store.state.userInfor.user
            })
            .end((err, res) => {
                if (!!err) {
                    this.$message({
                        type: 'error',
                        message: err.response.text
                    })
                } else {
                    this.infor = res.body;
                }
            })
    }
}
</script>
<style lang="stylus" scoped>
.dr-index
    padding: 0 .1rem
    font-size: .14rem
    position: fixed
    top: .6rem
    left: 0
    bottom: 0
    right: 0
    overflow-y: auto
    .title
        font-size: .16rem
        text-align: left
    .query-param
        text-align: left
        .el-form-item
            width: 20%
</style>
