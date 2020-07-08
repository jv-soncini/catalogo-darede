'use strict';
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
   console.log(JSON.stringify(event));
   const params = {
    TableName: process.env.SERVICE_TABLE,
    Key: {
      id: event.path.id
    },
  };

  dynamoDb.get(params, (error, result) => {
    
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'não foi possivel buscar o serviço',
        param: event.path.id
      });
      return;
    }

    
    const response = {
      statusCode: 200,
      body: result.Item   
    };
    callback(null, response);
  });
};