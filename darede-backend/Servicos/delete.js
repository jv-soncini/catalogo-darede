'use strict';
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.SERVICE_TABLE,
    Key: {
      id: event.path.id,
    },
  };

  dynamoDb.delete(params, (error,) => {
    
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'não foi possivel deletar o item de serviço ',
        param: error
      });
      return;
    }

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
        body: JSON.stringify("O serviço Foi removido com sucesso")
      };
      callback(null, response);
    })
    

  });
};