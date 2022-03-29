import { ApiEventPayload } from "../../Models/ApiEventPayload";

async function handler(event: ApiEventPayload, context: any) {
    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
};

export { handler };