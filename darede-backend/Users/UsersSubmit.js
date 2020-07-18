'use strict'

const uuid = require('uuid');
// const {v1: uuid1} = require('uuid')
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.usersSubmit =  (event, context, callback) => {
    
 

    const params = {
      TableName: process.env.USERS_TABLE,
      User: {
        id: uuid.v1(),
        ...user
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
        body: params.Items,
      };
      callback(null, response);
    });
  };
  