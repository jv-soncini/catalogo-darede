'use strict'
const AWS = require('aws-sdk');

const cloudFormation = new AWS.CloudFormation();

module.exports.describe =  (event, context, callback) => {
    
    var params = {
        StackInstanceAccount: '507252436531', /* required */
        StackInstanceRegion: 'us-west-1', /* required */
        StackSetName: 'EC2-WebServer' /* required */
    };

      cloudFormation.describeStackInstance(params, (err, data) => {
        if (err){

          callback(null,{
            statuscode: err.statusCode || 501,
            Erro: err,
          })
          return; 
        } 


       const response = {
         statuscode: 200,
         data: data
       }

       callback(null, response)
})
}