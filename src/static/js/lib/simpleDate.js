


let simpleDate=new class{
  constructor(){
    this.currentDate=new Date();
    this.currentMinutesFirstDay=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),1);
    this.currentMinutesLastDay=new Date((new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)).getTime()-1000);
  }

  format(fmt) {
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
}


export  {
  simpleDate
}
