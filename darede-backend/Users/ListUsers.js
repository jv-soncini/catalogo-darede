'use strict'
const AWS = require('aws-sdk');

exports.handler = function (event, context, callback) {
    const params = {
        TableName: process.env.USERS_TABLE,
     };

     dynamoDb.scan(params, (error, data) =>{
         if (error) {
             console.error(error);
             callback(null, {
                 statusCode: error.statusCode || 501,
                 headers: {'Content-Type': 'text/plain'},
                 body: 'nao foi possivel encontrar o item do serviço',
             })
             return;
         }


         const response = {
             statusCode: 200,
             body: {
                 Servicos: data.Items
             }
             
         };
         callback(null, response)
     })


}