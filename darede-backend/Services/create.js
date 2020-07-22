'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(JSON.stringify(event.body));
  const NomeServico = data.NomeServico
  const DescricaoServico = data.DescricaoServico
  if (typeof NomeServico !== 'string' || typeof DescricaoServico !== 'string' ) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the todo item.'));
    return;
  }

  const params = {
    TableName: process.env.SERVICE_TABLE,
    Item: {
      id: uuid.v1(),
      NomeServico: NomeServico,
      DescricaoServico: DescricaoServico,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };


  dynamoDb.put(params, (error) => {
   
    if (error) {
      console.error(error);
      callback(new Error('nao foi possivel criar o serviço'));
      return;
    }
 
    
    const response = {
      statusCode: 200,
      body: params.Item,
    };
    callback(null, response);
  });
};







