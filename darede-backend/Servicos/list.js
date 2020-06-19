 'use strict'

 const dynamodb = require('./dynamoDB');

 module.exports.list = (event, context, callback) => {
     const params = {
         TableName: process.env.SERVICE_TABLE,
     };

     dynamodb.scan(params, (error, result) =>{
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
             body: JSON.stringify(result.items),
         };
         callback(null, response)
     })
 }