'use strict'
const AWS = require('aws-sdk');
const iam = new AWS.IAM();

module.exports.list =  (event, context, callback) => {
    
    var params = {}

    iam.listUsers(params, (err, data) => {
        if (err) {
            callback(null, {
                StatusCode: err.statusCode || 501,
                Error: err
            })
            return;
        }
 
 
      const  response = {
            StatusCode: 201,
            body: data
 
        }
        callback(null, response);
    })
    
     

}