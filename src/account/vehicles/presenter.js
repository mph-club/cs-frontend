import Model from './model'

/*
 * Call the functions from model to connect APIs
 */

export default {
  
  getAll:function(params){
    Model.getAll(params)  	  
  },
  getVehicleDetail:function(params){
    Model.getVehicleDetail(params)  	  
  },

}
