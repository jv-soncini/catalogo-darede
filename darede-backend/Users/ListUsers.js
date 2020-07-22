"use strict";
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
  
  var params = {
      TableName: process.env.USERS_TABLE
  }

  dynamoDb.scan(params, (err, data) => {
    if (err) {
      callback(null, {
        StatusCode: err.statusCode || 501,
        Error: err,
      });
      return;
    }

    const response = {
      StatusCode: 200,
      body: data,
    };
    callback(null, response);
  });
};
