import { Stack, StackProps, CfnOutput, aws_dynamodb} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { RestApi, ResourceBase, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export class ApiStackBuilder extends Stack {
    public readonly hcEndpoint: CfnOutput;

    constructor(scope: Construct,id: string, apiTypes: string[], props?: StackProps){
        super(scope, id + "Stack", props);

        const gateway = new RestApi(this, `${id}API`);
        const resource = gateway.root.addResource(`${id}`);

        this.hcEndpoint = new CfnOutput(this, `${id}-GatewayUrl`, {
            value: gateway.url
        });

        const dbTable = new Table(this, id, {
            partitionKey: { name: `${id}Table`, type: aws_dynamodb.AttributeType.STRING}
        })

        apiTypes.forEach(apiType => this.createEndpoint(this, id, apiType, dbTable, resource));
    }

    private createEndpoint = function(stack: Stack, name: string, apiType: string, table: Table, apiResource: ResourceBase){

        const lambda = new NodejsFunction(stack, `${name}-${apiType}Lambda`,{
            entry: `lambdaCode/${name}/${apiType}${name}.ts`,
            handler: `handler`
        });

        apiResource.addMethod(apiType.toUpperCase(), new LambdaIntegration(lambda));

        table.grantReadWriteData(lambda);
    }
}

