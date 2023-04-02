import base from "./base"
import request from "../utils/request";

const api = {
  getNcov(nparams) {
    return request.get(base.baseUrl + base.ncov,{nparams})
  },
  /**
   * 各个省时的疫情数据
   */
  getprovinceNcov(){
    return request.get(base.baseUrl + base.provinceNcov)
  }
};

export default api;
