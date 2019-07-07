import mintUI from "mint-ui";

const dialog=new class{

  constructor(){
    this.mintUI=mintUI;
  }

  /**
   *  加载提示
   */
  loadding(selector,background) {

  }

  /**
   * 提示登录
   */
  hintLogin() {
    this.mintUI.MessageBox("提示","您的登陆已过期，请重新登陆").then(action=>{
      location.href="http://localhost:8080"
    })
  }



  /**
   * 消息提示
   * @param title
   * @param message
   * @param success
   */
  hint(options) {
    let _options={
      title:"提示",
      message:"无提示内容",
      success:function (){},
    }
    if(typeof (options)=="string"){
      _options.message=options
    }else{
      _options=Object.assign(_options,options)
    }

    this.mintUI.MessageBox(_options).then(action=>{
      if(action=="confirm"){
        _options.success();
      }else if(action=="cancel"){
        _options.cancel();
      }
    })

  }


  /**
   * 确定/取消对话框
   * @param title
   * @param msg
   * @param successCallback
   * @param cancelCallback
   */
  confirm(options){
    let _options={
      title:"提示",
      message:"无提示内容",
      showCancelButton:true,
      success:function (){},
      cancel:function () {}
    }
    _options=Object.assign(_options,options)
    this.mintUI.MessageBox(_options).then(action=>{
      if(action=="confirm"){
        _options.success();
      }else if(action=="cancel"){
        _options.cancel();
      }
    })
  }

}

export {dialog}
