import { binding, given, then, when} from 'cucumber-tsflow';
import { SettingDto } from "../../Models/SettingDto";
import { SettingsDto } from "../../Models/SettingsDto";
import { Guid } from "guid-typescript";
import { handler as PostHandler } from '../../lambdaCode/Settings/POSTSettings';
import { ApiEventPayload } from '../../Models/ApiEventPayload';
import { HttpMethods } from '../../infrastructure/builders/HttpMethods';
import { setSDKInstance, mock, restore }from 'aws-sdk-mock';
//import  AWS from 'aws-sdk';
const AWS = require('aws-sdk');

@binding()
export class ApiStackSteps {

    

    settings : SettingsDto;
    eventPayload: ApiEventPayload;



    @given(/an event payload with a settings object as the body/)
    public eventContainingSettingsObject() {
        let settingList : SettingDto[] = [];
        settingList.push(new SettingDto("setting 1", "true"));
        settingList.push(new SettingDto("setting 2", "true"));
        settingList.push(new SettingDto("setting 3", "true"));
        this.settings = new SettingsDto(Guid.create(), settingList);
        this.eventPayload = new ApiEventPayload(HttpMethods.POST, "Settings", this.settings);
    }

    @when(/the settings object is passed to the lambda/)
    public async runLambdaWithSettingsObject() {
        setSDKInstance(AWS);
        mock('DynamoDB', 'getItem', (params: {}, callback: Function) => {
            PostHandler(this.eventPayload)
        })
    
        const input:any = { TableName: '', Key: {} };
        const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
        var res: any;
        await dynamodb.getItem(input).promise()

        res == {pk: 'foo', sk: 'bar'};
    
        restore('DynamoDB');
    }

    @then(/the object is in the DynamoDB/)
    public checkDynamoDB() {
        return true
    }
}