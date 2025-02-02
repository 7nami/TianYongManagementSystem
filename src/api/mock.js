import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import permissionApi from './mockServeData/permission'


// 第一个拦截的接口
Mock.mock(/home\/getData/,
    homeApi.getStatisticalData
    
    /*  function(){
    // console.log('被mockjs拦截的getData接口');
    
} */)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)