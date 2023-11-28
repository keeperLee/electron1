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
                <div v-else @click="maxsize">
                    <i class="iconfont iconmaxsize"></i>
                </div>
                <div class="close" @click="close">
                    <i class="iconfont iconclose"></i>
                </div>
            </div>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss">
body,
html {
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

<style lang="scss" scoped>
@import url(https://at.alicdn.com/t/font_1378132_s4e44adve5.css);
.titleBar {
    height: 38px;
    line-height: 36px;
    background: #fff1f0;
    display: flex;
    border-bottom: 1px solid #f5222d;
    .title {
        flex: 1;
        display: flex;
        -webkit-app-region: drag;
        .logo {
            padding-left: 8px;
            padding-right: 6px;
            img {
                width: 20px;
                height: 20px;
                margin-top: 7px;
            }
        }
        .txt {
            text-align: left;
            flex: 1;
        }
    }
}
.windowTool {
    div {
        color: #888;
        height: 100%;
        width: 38px;
        display: inline-block;
        cursor: pointer;
        &:hover {
            background: #ffccc7;
        }
        i {
            font-size: 12px;
        }
    }
    .close:hover {
        color: #fff;
        background: #ff4d4f;
    }
}
.content {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
}
</style>

<script>
let { remote } = require('electron')
export default {
    data () {
        return {
            isMaxSize: false,
        }
    },
    methods: {
        close () {
            console.log(remote)
            remote.getCurrentWindow().close()
        },
        minisize () {
            remote.getCurrentWindow().minimize()
        },
        restore () {
            remote.getCurrentWindow().restore()
        },
        maxsize () {
            remote.getCurrentWindow().maximize()
        },
        debounce (fn) {
            let timeout = null;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fn.apply(this, arguments)
                }, 300)
            }
        },
        setState () {
            let win = remote.getCurrentWindow();
            let rect = win.getBounds();
            let isMaxSize = win.isMaximized();
            this.isMaxSize = isMaxSize;
            let obj = { rect, isMaxSize };
            localStorage.setItem('winState', JSON.stringify(obj))
        },
        getState () {
            let win = remote.getCurrentWindow();
            let winState = localStorage.getItem('winState');
            if (winState) {
                winState = JSON.parse(winState);
                if (winState.isMaxSize) {
                    win.maximize();
                } else {
                    win.setBounds(winState.rect);
                }
            }
        }
    },
    mounted () {
        let win = remote.getCurrentWindow();
        win.on('maximize', () => {
            this.isMaxSize = true;
            this.setState()
        });
        win.on('unmaximize', () => {
            this.isMaxSize = false;
            this.setState()
        });
        win.on('move', this.debounce(() => {
            this.setState()
        }));
        win.on('resize', this.debounce(() => {
            this.setState()
        }));
        this.isMaxSize = win.isMaximized()
        this.getState();
    }
}
</script>