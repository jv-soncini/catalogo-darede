"use strict";
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.login = (event, context, callback) => {
  var Data = JSON.parse(JSON.stringify(event.body));
  var User = Data.UserName
  var PassWord = Data.PassWord


    if(typeof User !== 'string' || typeof Password !== 'string'){
        callback(null,{
            user: User,
            Senha: PassWord,
            usert: typeof User,
            Senhat: typeof PassWord
        });
    }

  var params = {
      TableName: process.env.USERS_TABLE,
    Key: {
      Usuario: {
        S: User,
      },
      PassWord: {
          S: PassWord
      }
    },
  };

  dynamoDb.getItem(params, (err, data) => {
    if (err) {
      callback(null, {
        StatusCode: err.statusCode || 501,
        Error: err,
      });
      return;
    }

    const response = {
      StatusCode: 200,
      body: "usuario e senha corretos",
    };
    callback(null, response);
  });
};
