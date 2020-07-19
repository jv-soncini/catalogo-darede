'use strict'
const AWS = require('aws-sdk');
const iam = new AWS.IAM();

module.exports.GetGroup =  (event, context, callback) => {
    
    
    var params = {
        GroupName: "admin", 
      };

      iam.getGroup(params,(err, data) => {
    
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