'use strict'
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

module.exports.create = function (event, context, callback) {
    

   var params = {
        KeyName: "TesteChave1"
    }

    ec2.createKeyPair(params, (err, data) => {
        if(err) {
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