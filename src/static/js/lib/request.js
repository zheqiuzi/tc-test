import axios from 'axios'
import { Loading } from 'element-ui';
import {dialog} from "./dialog";
import {cookie} from "./cookie";
import {url} from "./url";

/**
 * Request 类用于数据请求，目前只定义了
 */
const request =new class {
  requestConfig={
    codes:{
      //正常返回数据的code码
      NORMAL: 200,
      //定义其他code码同等正常数据的code码
      NORMAL_CODES: {
        200: 200,
      },
      //缺少token
      NO_TOKEN: 40301
    },
    baseUrl:"",
    useMock:false,
    sendBefore:function () {},
    mockHandler:function () {}
  };

  constructor(config){
    this.url=url;
    this.dialog=dialog;
    this.cookie=cookie;
    // this.log=new Log();
    // if(config){
    //   this.requestConfig=Object.assign(this.requestConfig,config);
    // }
    this.http=axios.create({
      baseURL:this.url.baseUrl,
      // withCredentials:true
    })

    this.http.defaults.headers.post['source']="1"
    this.http.defaults.headers.post['platform']="4"
    this.http.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'

    this.http.defaults.headers.get['source']="1"
    this.http.defaults.headers.get['platform']="4"
    this.http.defaults.headers.get['Content-Type']='application/x-www-form-urlencoded'

    // this.http.defaults.headers.common['Authorization'] = "xx";
    // 请求拦截器
    this.http.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
    // 响应拦截器
    this.http.interceptors.response.use((res) => {
      return res;
    }),(err)=>{
      console.log('请求失败',error)
    }

  }

  base(options){
    var that=this;
    //默认请求参数和处理方法
    let _options={
      method:"get",
      needToken:true,
      fail:null
    }
    _options=Object.assign(_options,options);
    //请求之前
    //判断是否有token
    // const token=this.cookie.getCookie("x-token");

    // if(_options.needToken&&!token){
    //   this.dialog.hintLogin();
    //   return
    // }else{
    //   this.http.defaults.headers.common['Authorization'] = token;
    // }

    // 请求之前ui处理(待添加);
    // 调用自定义请求之前执行函数
    // 请求数据
    this.http[_options.method](_options.url,_options.data).then(function (res) {
      //code码处理
      var code=res.data.responseHeader.status;
      if (typeof (_options.customCodeHandlers && _options.customCodeHandlers[code]) == 'function') {
        //使用自定义处理方式
        _options.customCodeHandlers[code](res);
      } else if (that.requestConfig.codes.NORMAL_CODES[code] == that.requestConfig.codes.NORMAL) {
        if (_options.success) {
          _options.success(res);
        }
      } else {
        //异常处理
        that.codeHandler(res);
      }
    }).catch((e)=>{
      if(_options.error)_options.error(e);
      that.dialog.hint("请求异常",e.toString())
      console.log(e)
    })

  }
  /**
   * GET 请求数据
   * @param url 请求参数
   * @param data 请求数据，如果没有或者已经拼接到url里面了可置空
   * @param success 请求成功并且code码正常的回调函数
   * @param customCodeHandlers 自定义code码处理
   * 特别注意：当optional有自定义参数请求时候，请求的url和data数据最后都会以第一个url参数和第二个data参数为准
   */
  get(options) {
    let _options={
      method:"get",
    }
    _options=Object.assign(_options,options);
    this.base(_options);
  }
  /**
   * POST 请求数据
   * options自定义属性如下：
   * @param url 请求参数
   * @param data 请求数据，如果没有或者已经拼接到url里面了可置空
   * @param success 请求成功并且code码正常的回调函数
   * @param customCodeHandlers 自定义code码处理
   * 特别注意：当optional有自定义参数请求时候，请求的url和data数据最后都会以第一个url参数和第二个data参数为准
   */
  post(options) {
    let _options={
      method:"post",
    }
    _options=Object.assign(_options,options);
    this.base(_options);
  }
  codeHandler(res) {
    var code = parseInt(res.data.status);
    switch (code) {
      case this.requestConfig.codes.NO_TOKEN:
      {
        //提示登录
        this.dialog.hintLogin()
      }break;
      default:
      {
        let msg=res.data.message;
        if(!msg){
          msg=JSON.stringify(res)
        }
        // 提示错误
        //this.dialog.hint("数据异常:"+msg)
      }break;
    }
  }
}

export {request}

