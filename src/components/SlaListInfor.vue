<template>
    <div class="sla-list-infor">
        <el-table
            :data="slaList"
            border
            @row-dbclick="goForDetail">
            <el-table-column
                type="index"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                label="SLA编码">
                <template slot-scope="scope">
                    <span v-if="!isGr">{{scope.slaCoding}}</span>
                    <el-input v-else v-model="scope.slaCoding" placeholder="输入SLA编码"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                label="SLA内容">
                <template slot-scope="scope">
                    <span v-if="!isGr">{{scope.slaContent}}</span>
                    <el-input v-else v-model="scope.slaContent" placeholder="输入SLA内容"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-if="!isGr"
                label="价格">
                <template slot-scope="scope">
                    <span v-if="isAccountDetail">{{scope.row.slaPrice}}</span>
                    <el-input v-else v-model="scope.row.slaPrice" placeholder="输入价格"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-if="isGr&&!isAccountDetail"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="deleteSla(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        slaList: {
            type: Array,
            required: true
        },
        isGr: {
            type: Boolean,
            default: false
        },
        sla: {
            type: Number
        },
        isAccountDetail: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
        goForDetail(row, event) {
            this.$router.push()
        },
        deleteSla(index) {
            this.$emit('deleteSla', this.sla, index)
        }
    }
}
</script>
<style lang="stylus">

</style>
