import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { DocumentClient, UpdateItemInput } from 'aws-sdk/clients/dynamodb';

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

AWSMock.setSDKInstance(AWS);
let mockDynamoDB: DocumentClient;
let result: any;

AWSMock.mock(
  'DynamoDB.DocumentClient',
  'put',
  (params: UpdateItemInput, callback: Function) => {
      callback(null, "Put Item into DynamoDB");
  },
);

Given('today is Sunday', function () {
    mockDynamoDB = new AWS.DynamoDB.DocumentClient({
      apiVersion: '2012-08-10',
    });
  });

  When('I ask whether it\'s Friday yet', async function () {
    const input = {TableName: '', Item:{} };

    result = await mockDynamoDB.put(input).promise();

    console.log(result);

    
  });

  Then('I should be told {string}', function (string: string) {
    assert.equal(result, string);
  });