'use strict'
const AWS = require('aws-sdk');
const template = require('../Templates/Webserver.json')
const cloudformation = new AWS.CloudFormation()
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.execute =  (event, context, callback) => {
    
    const params = {
         
            StackName: 'EC2',
            DisableRollback: true,
            TemplateBody: JSON.stringify(template),
            TimeoutInMinutes: 5
          
        }
        
        cloudformation.createStack(params, (err, data) => {
          if (err){

            callback(null,{
              statuscode: err.statusCode || 501,
              Erro: err,
            })
            return; 
          } 


         const response = {
           statuscode: 201,
           data: data
         }

          callback(null, response)          
        });
}