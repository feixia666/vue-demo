<template>
    <div class="goodsinfo-container">
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                <swiper :lunbotuList="lunbolist" :isfull="false"></swiper>
                </div>
            </div>
            
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>${{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">${{ goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from './swiper'
import numbox from './goodsinfo_numbox'
export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbolist: [],
            goodsinfo: {},
            ballFlag: false,
            selectedCount: 1

        }
    },
    created () {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    
    methods: {
        getLunbotu () {
            this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then(result => {
                if (result.body.status === 0) {
                    result.body.message.forEach(a => {
                        a.img = a.src;
                    });
                    this.lunbolist = result.body.message;
                }
            })
        },
        getGoodsInfo () {
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id).then(s => {
                if (s.body.status === 0) {
                    this.goodsinfo = s.body.message[0];
                }
            })
        },
        addToShopCar () {
            this.ballFlag = !this.ballFlag;
            var goodsinfo = { 
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
                };
            this.$store.commit("addToCar", goodsinfo);
        },
        beforeEnter (el) {
            el.style.transform = "translate(0, 0)"
        },
        enter (el, done) {
            el.offsetWidth;
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document.getElementById("badge").getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all .5s cubic-bezier(.4, -0.3, 1, .68)";
            done();
        },
        afterEnter () {
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount (count) {
            this.selectedCount = count;
            console.log(this.selectedCount)
        }
        

    },
    components: {
        swiper,
        numbox
    }
       
    
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    overflow: hidden;
    background: #eee;
    .now_price{
        color: red;
        font-size: 14px;
        font-weight: bold;
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;

    }
}
</style>