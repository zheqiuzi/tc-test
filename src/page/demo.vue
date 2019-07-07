<template>
    <div>
    <p>项目主页:/instalmentPurchase/</p>
      <b>控制台输出类:log 具体参数结合参考工具类说明</b>
      <p>
        this.log.msg(字符串,可选标记)
      </p>
      <b>数据请求类:request 具体参数结合参考工具类说明</b>
      <p>
        this.reuest.get({url:"",success(res){}})
      </p>
      <p>
        this.reuest.post({url:"",data:"",success(res){}})
      </p>
      <b>弹窗类:dialog 具体参数结合参考工具类说明</b>
      <p>弹窗类提供提示框、确认框、登录提示框传入参数为json配置对象，具体参数结合参考工具类说明</p>
      <p>简单提示框使用方式如：this.dialog.hint(json对象或者提示内容字符串);</p>
    </div>
</template>

<script>
    export default {
        name: "demo",
      data(){
          return{

          }
      },
      mounted(){
        this.request.get({
          url:this.url.api.MM,
          success:(res)=>{
            console.log(res)
          }
        })
      }
    }
</script>

<style scoped>

</style>
