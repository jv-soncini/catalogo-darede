'use strict'
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();
module.exports.describe =  (event, context, callback) => {
    

   const params = {
        InstanceIds: [
            "i-08dc2c1dc62e32e96"
         ]
    }

    ec2.describeInstances(params,(err,data) => {
        if (err){

            callback(null,{
              statuscode: err.statusCode || 501,
              Erro: err,
            })
            return; 
          } 
  
  
         const response = {
           statuscode: 200,
           data: data
         }

         callback(null, response)
    })

}