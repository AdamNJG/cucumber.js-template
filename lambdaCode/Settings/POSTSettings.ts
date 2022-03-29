import { ApiEventPayload } from "../../Models/ApiEventPayload";
import { SettingsDto } from "../../Models/SettingsDto";
const { DynamoDB } = require("aws-sdk");

async function handler(event: ApiEventPayload, context?: any) {

    const dbclient = new DynamoDB.DocumentClient();

    let stuff = async () => {
        try{

            let settings: SettingsDto = event.body;
    
            if(settings != null){
    
                console.log("setting valid");
    
                await dbclient.put({
                    TableName: "test",
                    Item: settings
                }).promise().then(
                    console.log("promise forfilled")
                );
    
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

    return stuff;

};

export { handler };