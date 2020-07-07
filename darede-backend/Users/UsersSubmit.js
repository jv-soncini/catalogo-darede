'use strict'

const uuid = require('uuid');
// const {v1: uuid1} = require('uuid')
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.usersSubmit = async (event, context, callback) => {
    const RequestBody = JSON.parse(JSON.stringify(event.body));
    const Nome = RequestBody.Nome;
    const Senha = RequestBody.Senha

    if (typeof Nome !== 'string' || typeof Senha !== 'string') {
        console.error('Falha na validação');
        callback(new Error('não foi possivel cadastrar o usuario'));
    }

    submitUserP(userInfo(Nome, Senha))
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'usuario cadastrado com sucesso com Nome ${Nome}',
                    userId: res.id
                })
            });
        })

        .catch(err => {
            console.log(err);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'incapaz de cadastrar o usuario com Nome ${Nome}'
                })
            })
        })
}

const submitUserP = User => {
    console.log('cadastrando usuario');
    const userInfo = {
        TableName: process.env.SERVICE_TABLE,
        Item: User,
    };
    return dynamoDb.put(userInfo).promise()
    .then(res => User);
}


const userInfo = (Nome, Senha) => {
    const CarimboDeData = new Date().getTime();

    return {
        id: uuid.v1(),
        Nome: Nome,
        Senha: Senha,
        cadastradoEm: CarimboDeData,
        AtualizadoEm: CarimboDeData,
    };
};