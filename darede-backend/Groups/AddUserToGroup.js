'use strict'
const AWS = require('aws-sdk');
const iam = new AWS.IAM();

module.exports.add = function (event, context, callback) {
    
    var params = {
        GroupName: "Teste3", 
        UserName: "schorsch"
       };

       iam.addUserToGroup(params,(err,data) => {

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