import {ENV} from "../config.js"
/**
 * 该文件用于环境配置
 */
const log=new class{
  msg(msg,tag){
    if(ENV=="prod"){
      return;
    }
    console.log(location.href)
    if(tag){
      console.log(msg,tag)
    }else {
      console.log(msg)
    }
  }
  warn(msg,tag){
    if(ENV=="prod"){
      return;
    }
    console.log(location.href)
    if(tag){
      console.warn(msg,tag)
    }else {
      console.warn(msg)
    }
  }
  error(msg,tag){
    if(ENV=="prod"){
      return;
    }
    console.log(location.href)
    if(tag){
      console.error(msg,tag)
    }else {
      console.error(msg)
    }
  }
}
export {
  log
};
