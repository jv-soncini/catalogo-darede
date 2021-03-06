// 'use strict';

// const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// module.exports.update = (event, context, callback) => {
//   const data = JSON.parse(event.body);

//   if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
//     console.error('Falha na validação');
//     callback(null, {
//       statusCode: 400,
//       headers: { 'Content-Type': 'text/plain' },
//       body: 'não foi possivel atualizar o item de serviço',
//     });
//     return;
//   }

//   const params = {
//     TableName: process.env.SERVICE,
//     Key: {
//       id: event.pathParameters.id,
//     },
//     ExpressionAttributeNames: {
//       '#todo_text': 'text',
//     },
//     ExpressionAttributeValues: {
//       ':text': data.text,
//       ':checked': data.checked,
//       ':updatedAt': timestamp,
//     },
//     UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
//     ReturnValues: 'ALL_NEW',
//   };


//   dynamoDb.update(params, (error, result) => {
  
//     if (error) {
//       console.error(error);
//       callback(null, {
//         statusCode: error.statusCode || 501,
//         headers: { 'Content-Type': 'text/plain' },
//         body: 'não foi buscar o item de serviço',
//       });
//       return;
//     }

  
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(result.Attributes),
//     };
//     callback(null, response);
//   });
// };