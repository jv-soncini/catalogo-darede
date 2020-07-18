'use strict'
const AWS = require('aws-sdk');
const cloudFormation = new AWS.CloudFormation();

module.exports.describe = (event, context, callback) => {
   
    var params = {
    };

      cloudFormation.describeStacks(params, (err, data) => {
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

