'use strict'
const AWS = require('aws-sdk');
const iam = new AWS.IAM();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.create =  (event, context, callback) => {

   const Data =  JSON.parse(JSON.stringify(event.body))
   const NomeGrupo = Data.GroupName

   if (typeof NomeGrupo ==! String || NomeGrupo == null) {
       callback(new Error ("não foi possivel cadastrar um grupo com este nome"));
       return;
   }

   var params ={
        GroupName: NomeGrupo
   }

   iam.createGroup(params, (err,data) => {
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