'use strict'
const AWS = require('aws-sdk');
const template = require('../../Templates/Webserver.json')
const cloudformation = new AWS.CloudFormation()
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.execute =  (event, context, callback) => {
    

    // setStackName = (stackname) =>{
    //   if(typeof stackname ==! string || stackname.length < 3 || stackname == null)
    //   {
    //     console.log('Nome invalido, revise se o nome contem no minimo 3 caracteres')
    //     callback(null, {
    //       Error: '400 bad request',
    //       body:  'Nome invalido, revise se o nome contem no minimo 3 caracteres'
    //     })
    //   }
    // }
    const params = {
         
            StackName: 'EC2-WebServer',
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