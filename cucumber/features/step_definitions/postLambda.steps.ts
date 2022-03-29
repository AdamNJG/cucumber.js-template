import { binding, given, then, when} from 'cucumber-tsflow';
import { SettingDto } from "../../../Models/SettingDto";
import { SettingsDto } from "../../../Models/SettingsDto";
import { Guid } from "guid-typescript";
import { post, post as PostHandler } from '../../../lambdaCode/Settings/POSTSettings';
import { ApiEventPayload } from '../../../Models/ApiEventPayload';
import { HttpMethods } from '../../../infrastructure/builders/HttpMethods';
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

mockDynamoDB = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
  });

let settings : SettingsDto;
let eventPayload: ApiEventPayload;


    Given('an event payload with a settings object as the body', function () {
        let settingList : SettingDto[] = [];
        settingList.push(new SettingDto("setting 1", "true"));
        settingList.push(new SettingDto("setting 2", "true"));
        settingList.push(new SettingDto("setting 3", "true"));
        settings = new SettingsDto(Guid.create(), settingList);
        eventPayload = new ApiEventPayload(HttpMethods.POST, "Settings", settings);
    });

    When('the settings object is passed to the lambda', async function (){
        result = await post(mockDynamoDB, eventPayload);
    });


    Then('the object is in the DynamoDB', function () {
        assert.equal(result, "Settings inserted");
    });
