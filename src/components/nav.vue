<template>
  <div class="nav_box" :class="{navbg:addbg}">
    <div class="logo_img" @click="menuClick(-1)">
      <img :src="`${$store.state.imgUrl}logo.png`" class="imgs" />
    </div>
    <div class="menu_box">
      <ul class="ul_">
        <li :class="[index == getMenuIndex ? 'activeClass' : '','fontsize18']"  v-for="(item,index) in navarr" :key="index" @click="menuClick(index)">
          {{$t(item)}}
          <div class="nft_hover" v-show="index == 0">
            <div class="box_nft">
              <div class="span1" @click.stop="nftFun('card')">{{$t("message.nav.txt7")}} <span class="icon-v-right"></span></div>
              <div class="span1" @click.stop="nftFun('mining')">{{$t("message.nav.txt8")}} <span class="icon-v-right"></span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="connect_box">
      <span class="span1 fontsize18" v-if="getIstrue">{{getSubtringAccount}}</span>
      <span class="span1 fontsize18" @click="commonLink" v-else>Connect</span>
      <div class="lang_box">
        <!-- <img src="../assets/images/cn.png" class="cnimg" /> -->
        <span class="lang_txt fontsize18">EN</span>
        <!-- <img src="../assets/images/accrow.png" class="downimg" /> -->
      </div>
    </div>
    <div class="mobile_menu">
      <div class="top_line" :class="{mobile_border:!InitialStatus}">
        <img :src="`${$store.state.imgUrl}logo.png`" class="mobile_imgs" @click="menuClick(-1)" />
        <div class="mobile_right_menu">
          <span class="span1 fontsize18" v-if="getIstrue">{{getSubtringAccount}}</span>
          <span class="span1 fontsize18" @click="commonLink" v-else>Connect</span>
          <img :src="`${$store.state.imgUrl}mobilemenu.png`" class="mobile_menu_class" v-if="InitialStatus" @click="mobilemenuClick" />
          <img :src="`${$store.state.imgUrl}proupclose.png`" class="mobile_menu_class" v-else @click="mobilemenuClick" />
        </div>
      </div>
      <div class="mobile_fixed_menu" v-if="mobilemenu" @click="mobilemenu = false">
        <div class="mobile_box">
          <ul class="ul_">
            <li :class="[index == getMenuIndex ? 'mobile_activeClass' : '','fontsize16']" v-for="(item,index) in navarr" :key="index" @click.stop="menuClick(index)">
              <div class="mobile_line">
                {{$t(item)}}
                <span class="mobile_triangle" :class="{mobilethreedown:mobile_menuDis,mobilethreetop:!mobile_menuDis}" v-if="index == 0"></span>
              </div>
              <div class="box_nft" v-if="mobile_menuDis && index == 0">
                <div class="span1" @click.stop="nftFun('card')">{{$t("message.nav.txt7")}}</div>
                <div class="span1" @click.stop="nftFun('mining')">{{$t("message.nav.txt8")}}</div>
              </div>
            </li>
          </ul>
          <div class="mobile_lang fontsize16">EN</div>
        </div>
        <div class="dispear_box"></div>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { wallet,network } from 'hashland-sdk';
export default {
  inject: ['reload'],
  data () {
    return {
      InitialStatus:true,// 移动端菜单栏按钮转换变量
      addbg:false,// 导航栏背景
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      navarr: ['message.nav.txt1', 'message.nav.txt2', 'message.nav.txt3', 'message.nav.txt6', 'message.nav.txt4','message.nav.txt5'],
      mobilemenu:false,//移动端菜单
      mobile_menuDis:false, // nfts展开菜单,
    }
  },
  computed: {
    ...mapGetters(["getMenuIndex","getSubtringAccount","getIstrue"])
  },
  methods:{
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // nfts子菜单选择项
    nftFun(data){
      this.addbg = true
      this.InitialStatus = true
      this.$store.commit("HashMenu", 0);
      sessionStorage.setItem("HashMenu", 0);
      if(data == 'card'){
        this.$router.push('/buy')
      }else if(data == 'mining'){
        this.$router.push('/nftmining')
      }
      this.mobile_menuDis = false
      this.mobilemenu = false
    },
    // 菜单栏切换状态
    menuClick (index) {
      this.addbg = true
      this.$store.commit("HashMenu", 0);
      sessionStorage.setItem("HashMenu", 0);
      if(index == 0){
        this.mobile_menuDis = !this.mobile_menuDis
        this.InitialStatus = false
        return
      }
      this.InitialStatus = true
      this.mobilemenu = false
      switch (index) {
        case -1:
          this.mobile_menuDis = false
          this.mobilemenu = false
          this.addbg = false
          this.$router.push('/home')
          break;
        case 0:
          this.$router.push('/buy')
          break;
        case 4:
          window.location.href = 'https://land-hash.gitbook.io/official/dao/about-dao'
          break;
        case 5:
          window.location.href = 'https://land-hash.gitbook.io/official/white-paper/abstract'
          break;
        default:
          this.$common.selectLang('敬请期待','Coming soon',this)
          break;
      }
    },
    // 账号链接抽离方法
    connectFun(res){
      console.log('账号切换res: ', res);
      if(res.length == 0){
        this.$store.commit("setAccount",'no')
        sessionStorage.setItem("setAccount",'no')
        this.$store.commit("setCardInfo",JSON.stringify([]))
        sessionStorage.setItem("setCardInfo",JSON.stringify([]))
      }else{
        this.$store.commit("setAccount", res[0])
        sessionStorage.setItem("setAccount",res[0])
        this.$common.getUserCardInfoFun(res[0])
      }
      // this.reload()
    },
    // 网络链接抽离方法(第一次连接,用户网络不对的情况下帮他切换网络)
    networkFun(chainID){
      let net = network() // 获取sdk返回的当前的环境
      if(chainID == net.chainId){
        this.$store.commit("setChain", chainID)
        sessionStorage.setItem("setChain",chainID)
      }else{
        wallet.addChain()
      }
    },
    // 网络链接抽离方法(用户自己手动切换其他网络的操作)
    OnNetworkFun(res){
      let net = network() // 获取sdk返回的当前的环境
      if (res == net.chainId){
        this.$store.commit("setChain", res)
        sessionStorage.setItem("setChain",res)
      }else {
        this.$store.commit("setChain", '')
        sessionStorage.removeItem("setChain")
      }
    },
    // 链接钱包方法
    async commonLink(){
      const account = await wallet.getAccount() //链接钱包
      this.connectFun(account)

      const chainID = await wallet.getChainId() // 连接网络
      this.networkFun(chainID)

      // 监听账号
      wallet.onAccountChanged(this.connectFun)

      // 监听网络
      wallet.onChainChanged(this.OnNetworkFun)
    },
    // 移动端展开菜单
    mobilemenuClick(){
      this.mobilemenu = !this.mobilemenu
      this.InitialStatus = !this.InitialStatus
    }
  },
  mounted(){
    this.commonLink()
  }
}
</script>
<style lang="scss" scoped>
.nav_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  padding-left: 180px;
  .logo_img{
    position: absolute;
    top: 0;
    left: 20px;
    width: 169px;
    cursor: pointer;
    .imgs{
      width: 100%;
      object-fit: contain;
    }
  }
  .menu_box{
    width: calc(100% - 280px);
    .ul_{
      width: 100%;
      display: flex;
      align-items: center;
      li{
        position: relative;
        padding: 0 18px;
        color: #FFFFFF;
        cursor: pointer;
        .nft_hover{
          display: none;
          position: absolute;
          top: 0;
          left: -29px;
          z-index: 99999999;
          .box_nft{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 183px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            padding: 20px 10px;
            margin-top: 30px;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
            .span1{
              width: 100%;
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #fff;
              line-height: 82px;
              padding: 0 15px;
              .icon-v-right {
                width: 12px;
                height: 12px;
                border: 2px solid #fff;
                border-width: 2px 2px 0 0;
                transform: rotate(45deg);
                margin-left: 10px;
              }
            }
            .span1:hover{
              color: #00E7F0;
              .icon-v-right{
                width: 12px;
                height: 12px;
                border: 2px solid #00E7F0;
                border-width: 2px 2px 0 0;
                transform: rotate(45deg);
                margin-left: 10px;
              }
            }
          }
        }
      }
      li:hover{
        .nft_hover{
          display: flex;
        }
      }
      .activeClass{
        color: #00E7F0;
      }
    }
  }
  .connect_box{
    display: flex;
    align-items: center;
    .span1{
      padding:2px 11px;
      border-radius: 12px;
      box-shadow:26px 11px 40px 21px rgba(0,0,1,0.38), -5px 1px 34px 0px rgba(255, 255, 255,0.22) inset;
      color: #FFFFFF;
      cursor: pointer;
    }
    .lang_box{
      display: flex;
      align-items: center;
      margin-left: 20px;
      .cnimg{
        width: 50px;
        object-fit: contain;
      }
      .lang_txt{
        color: #FFFFFF;
        margin: 0 8px;
      }
      .downimg{
        width: 20px;
        object-fit: contain;
      }
    }
  }
  .mobile_menu{
    display: none;
  }
  .mobile_fixed_menu{
    display: none;
  }
}
.navbg{
  background: #0C153B;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
@media screen and (min-width: 981px) and (max-width: 1439px) {
  .nav_box{
    .menu_box{
      width: calc(100% - 200px);
    }
  }
}
@media screen and (max-width: 980px) {
  .nav_box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    height: auto;
    .logo_img{
      display: none;
    }
    .menu_box{
      display: none;
    }
    .connect_box{
      display: none;
    }
    .mobile_menu{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      .top_line{
        width: 100%;
        height: 0.6rem;
        padding: 0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #021C3A;
        border-radius: 0px 0px 17px 17px;
        border: 2px solid rgba(161, 64, 248, 1);
        border-top: none;
        .mobile_imgs{
          width: 0.42rem;
          object-fit: contain;
        }
        .mobile_right_menu{
          display: flex;
          align-items: center;
          .mobile_menu_class{
            width: 0.28rem;
            object-fit: contain;
            margin-left: 0.1rem;
          }
          .span1{
            padding:0.02rem 0.1rem;
            border-radius: 0.1rem;
            box-shadow:0 0 10px 2px rgba(0,0,1,0.38), 0 0 5px 0px rgba(255, 255, 255,0.22) inset;
            color: #FFFFFF;
            cursor: pointer;
          }
        }
      }
      .mobile_border{
        border: 2px solid rgba(161, 64, 248, 1);
        border-top: none;
        border-bottom: none;
        border-radius: 0px;
      }
      .mobile_fixed_menu{
        width: 100%;
        height: calc(100% - 0.6rem);
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        .mobile_box{
          border-radius: 0px 0px 17px 17px;
          border: 2px solid rgba(161, 64, 248, 1);
          border-top: none;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0 0.2rem;
          padding-bottom: 0.26rem;
          background: #021C3A;
          // height: 4rem;
          // background: linear-gradient(180deg, #011020 0%, #022954 37%, #012958 56%, #00162E 100%);
          .ul_{
            width: 100%;
            margin-top: 0.14rem;
            li{
              width: 100%;
              color: #FFFFFF;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 0.24rem;
              .mobile_line{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.12rem;
                .mobile_triangle{
                  border-width: 0.05rem;
                  border-color: #FFFFFF;
                  border-style: dashed;
                  border-top-style: solid;
                  border-left-color: transparent;
                  border-right-color: transparent;
                }
                .mobilethreetop{
                  border-bottom-width: 0;
                }
                .mobilethreedown{
                  border-top-width: 0;
                }
              }
              .box_nft{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #032144;
                box-shadow: -2px 1px 10px 0px #020F1F inset;
                border-radius: 0.06rem;
                padding: 0.12rem 0;
                .span1{
                  width: 100%;
                  display: flex;
                  align-items: center;
                  color: #fff;
                  line-height: 0.4rem;
                }
              }
            }
            .mobile_activeClass{
              color: #00E7F0;
            }
          }
          .mobile_lang{
            width: 100%;
            color: #FFFFFF;
          }
        }
        .dispear_box{
          width: 100%;
          min-height: calc(100% - 3rem);
          height: calc(100% - 3rem);
          background: red;
        }
      }
      // .mobileClass_animation{
      //   animation: fade-out 1.5s;
      // }
    }
  }
}
</style>
