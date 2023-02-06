<template>
    <div id="app">
        <div class="titleBar">
            <div class="title">
                <div class="logo"><img src="@/assets/logo.png" alt=""></div>
                <div class="txt">窗口标题</div>
            </div>
            <div class="windowTool">
                <div @click="minisize">
                    <i class="iconfont iconminisize"></i>
                </div>
                <div v-if="isMaxSize" @click="restore">
                    <i class="iconfont iconrestore"></i>
                </div>
                <div v-else  @click="maxsize">
                    <i class="iconfont iconmaxsize"></i>
                </div>
                <div class="close" @click="close">
                    <i class="iconfont iconclose"></i>
                </div>
            </div>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<style lang="scss">
body,html{
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
}
#app {
    text-align: center;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #f5222d;
    flex-direction: column;
}
</style>

<script>
let {remote} = require("electron")
export default{
    data(){
        return {
            isMaxSize:false
        }
    },
    methods:{
        close(){
            remote.getCurrentWindow.close()
        },
        minisize(){
            remote.getCurrentWindow.minisize()
        },
        restore(){
            remote.getCurrentWindow.restore()
        },
        maxsize(){
            remote.getCurrentWindow.maxsize()
        }
    }
}
</script>