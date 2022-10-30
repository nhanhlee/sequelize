const sequelize = require('../models/index')
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../ultis/reponse');
const { Op } = require("sequelize");

const addOrder = async (req, res)=>{
    try{
        let body = {...req.body}
        let arr_sub_id = body.arr_sub_id
        arr_sub_id.forEach(async(element) => {
            let checkSub = await model.sub_food.findOne({where : {
                sub_id : element
            }})

            if(!checkSub){
                console.log("1") 
                failCode(res,"","ko ton tại");
            }
        })

        let checkOrder = await model.order.findOne({where : {
            user_id : body.user_id,
            food_id : body.food_id
        }})
        if(!checkOrder){
            if(!body.arr_sub_id){
                console.log("2") 
                let result = await model.order.create(body)
                successCode(res,result,"thêm order thành công")
            }
            else{
                console.log("3") 
                body.arr_sub_id = body.arr_sub_id.toString()
                let result = await model.order.create(body)
                successCode(res,result,"thêm order thành công")
            }
        }
        else{
            console.log("4") 
            failCode(res,"","Vui lòng bạn chọn food_id khác")
        }   
    }
    catch(err){
        console.log("5") 
        errorCode(res,"lỗi backend")
    }
    
}

module.exports = {addOrder}