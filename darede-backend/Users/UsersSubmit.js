'use strict'

const uuid = require('uuid');

const AWS = require('aws-sdk');

const iam = new AWS.IAM();



const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.usersSubmit =  (event, context, callback) => {
    
    const Data = JSON.parse(JSON.stringify(event.body))
    const username = Data.UserName
    const password = Data.PassWord

    
    if(typeof username !== 'string' || typeof password !== 'string')
    {
        callback(null,{
            body: "parametros não seguem as normas, impossivel realizar o cadastro",
        })

    }

    var params = {
        UserName: username
    };

    
  
  

      iam.createUser(params, (error, data) => {
          
          if (error) {
              console.error(error);
              callback(new Error('não foi possivel cadastrar um usuario com este nome'), {
                  err: error
                });
        return;
    }
    
    
    
    var response = {
        Status: 200,
        body1: data
    }
    
    callback(null, response)
});





var LoginParams = {
    Password: password,
    UserName: username
}

    

 var CadastrarLogin = () => {

      iam.createLoginProfile (LoginParams, (err, data) => {
          
       if ( LoginParams.PassWord < 8) {
           console.error(err);
           callback(new Error('A senha deve conter no minimo 8 caracteres'));
           return;
        }
        else if (err) {
            callback(null, {
                StatuCode: err.statusCode || 501,
                Error: err
            })
            return;
        } 
        
        const response = {
            statusCode: 200,
            body: data,
            confirmacao: JSON.stringify("usuario cadastrado com sucesso")
        };
        callback(null, response);
    });
}  
    setTimeout(CadastrarLogin, 1000)

  


    const paramsTable = {
        TableName: process.env.USERS_TABLE,
        Item: {
          idUsers: uuid.v1(),
          Usuario: LoginParams.UserName,
          PassWord: LoginParams.Password,
          Grupos: {}
        },
      };


    dynamoDb.put(paramsTable, (err,data) => {
        
        
        if (err) {
            console.error(err);
            callback(null,{
                Error: err,
                processo: process.env.USERS_TABLE
            })

            return;
          }
      
          
          const response = {
            statusCode: 200,
            body3: paramsTable.Item,
          };
          callback(null, response);                                     
    })
  
  
  };
  