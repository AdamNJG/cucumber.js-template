import { App } from "aws-cdk-lib";
import { ApiStackBuilder } from "./builders/ApiStackBuilder";
import { HttpMethods } from "./builders/HttpMethods";

const app = new App();

const apiTypes: string[] = [HttpMethods.POST, HttpMethods.GET, HttpMethods.PUT, HttpMethods.DELETE];

new ApiStackBuilder(app, 'Settings', apiTypes);