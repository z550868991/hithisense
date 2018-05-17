<template>
    <div class="index">
        <el-container>
            <el-header>
                <p class="title header-item">HITHISENSE云平台</p>
                <p class="user-infor header-item">
                    <span>角色名称：{{userName}}</span>
                    <span class="content">
                        <span class="user">{{userAccount}}</span>
                        <span class="logout" @click="logout">注销</span>
                    </span>
                </p>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    mounted() {
        if(!this.$store.state.userInfor.user) {
            this.$request
                .get('/api/cloudplatform/getSession')
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        if (!res.body) {
                            this.$router.push('/login')
                        } else {
                            this.$store.commit('setUserInfor', {
                                ...res.body
                            })
                        }
                    }
                })
        }
    },
    computed: {
        userName() {
            return this.$store.state.userInfor.user || localStorage.user
        },
        userAccount() {
            return this.$store.state.userInfor.account || localStorage.account
        }
    },
    methods: {
        logout() {
            this.$request
                .get('/api/cloudplatform/logout')
                .end((err, res) => {
                    if (!!err) {
                        this.$message({
                            type: 'error',
                            message: err.response.text
                        })
                    } else {
                        this.$router.push('/login')
                    }
                })
        }
    }
}
</script>
<style lang="stylus" scoped>
.index
    .el-header
        position: fixed
        top: 0
        left: 0
        right: 0
        padding: 0
        height: .6rem
        z-index: 2900
        .header-item
            width: 100%
            color: #ffffff
            text-align: left
            text-indent: .1rem
            margin: 0
        .title
            background: #606266
            font-size: .25rem
            font-weight: bold
        .user-infor
            background: #C0C4CC
            font-size: .14rem
            color: #606266
            padding: .03rem 0
            .content
                float: right
                margin-right: .1rem
                span
                    margin-right: .1rem
                    cursor: pointer
                .logout
                    &:hover
                        text-decoration: underline
    .el-main
        margin-top: .6rem
        padding: 0
</style>
