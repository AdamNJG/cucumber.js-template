import { DynamoDB } from "aws-sdk";
import { ApiEventPayload } from "../../Models/ApiEventPayload";
import { SettingsDto } from "../../Models/SettingsDto";

async function handler(event: ApiEventPayload, context?: any) {

    const dbclient = new DynamoDB.DocumentClient();

    return post(dbclient, event);

};

async function post(dbClient: DynamoDB.DocumentClient, event: ApiEventPayload){
    try{

        let settings: SettingsDto = event.body;

        if(settings != null){

            console.log("setting valid");

            await dbClient.put({
                TableName: "test",
                Item: settings
            }).promise()

            return {
                statusCode: 200,
                body: "Settings inserted"
            }
        }
        return {
            statusCode: 400,
            body: "no settings in payload"
        }

    }
    catch(ex){
        return {
            statusCode: 500,
            body: JSON.stringify(ex)
        }
    }
}

export { handler, post };