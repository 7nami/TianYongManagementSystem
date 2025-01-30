import Mock from 'mockjs'
import homeApi from './mockServeData/home'


// 第一个拦截的接口
Mock.mock(/home\/getData/,
    homeApi.getStatisticalData
    
    /*  function(){
    // console.log('被mockjs拦截的getData接口');
    
} */)