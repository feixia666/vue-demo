import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    car: []
  },
  mutations: {
    addToCar (state, goodsinfo) {
      var flag = false;
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
        item.count += parseInt(goodsinfo.count);
        flag = true;
        return true;
      }
    })
    if (!flag) {
      state.car.push(goodsinfo)
    }
    
    },
    // updateGoodsInfo (state, goodsinfo) {
    //   state.car.some(item => {
    //     if (item.id == goodsinfo.id) {
    //       item.count = parseInt(goodsinfo.count);
    //       return true;
    //     }
    //   })
      
    // },
    updateGoodsInfo (state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true
        }
      })
    },
    removeFormCar(state, id){
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      
    },

    updateGoodsSelected (state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      
    }
    
  },
  getters: {
    getAllCount (state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count 
      })
      return c
    },
    getGoodsCount (state) {
      var o ={};
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    
    getGoodsSelected (state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o;
    },
    
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item=> {
        if(item.selected) {
          o.count +=item.count;
          o.amount += item.price * item.count
        }
      })
      return o
    }
    
  }
})
