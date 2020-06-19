'use strict';

const dynamodb = require('./dynamodb');

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.SERVICE_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  
  dynamodb.get(params, (error, result) => {
    
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'não foi possivel buscar o item de serviço',
      });
      return;
    }

    
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};