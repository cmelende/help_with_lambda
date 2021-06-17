# help_with_lambda

##### ran this
```
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import {DynamoDB} from "aws-sdk";
import {GetItemInput} from "aws-sdk/clients/dynamodb";
export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    // const postService = new PostService();
    // const queries = JSON.stringify(event.queryStringParameters);


    var dynamoDb = new DynamoDB({ endpoint: 'http://localhost:8000'});


    var params: GetItemInput = {
        TableName: "posts",
        Key: {
            "id": {"S": "1"},
            "timestamp": {"N": "1"},
        }
    };
    const result = await dynamoDb.getItem(params).promise();


    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}
```

got this error
```
"errorType":"UnknownEndpoint","errorMessage":"Inaccessible host: `localhost'. This service may not be available in the `us-east-1' region.","code":"UnknownEndpoint","message":"Inaccessible host: `localhost'. This service may not be available in the `us-east-1' region.","region":"us-east-1","hostname":"localhost","retryable":true,"originalError":{"errorType":"NetworkingError","errorMessage":"connect ECONNREFUSED 127.0.0.1:8000","code":"NetworkingError","message":"connect ECONNREFUSED 127.0.0.1:8000","errno":-111,"syscall":"connect","address":"127.0.0.1","port":8000,"region":"us-east-1","hostname":"localhost","retryable":true,"time":"2021-06-17T07:41:23.233Z","stack":["Error: connect ECONNREFUSED 127.0.0.1:8000","    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1146:16)","    at TCPConnectWrap.callbackTrampoline (internal/async_hooks.js:134:14)"]},"time":"2021-06-17T07:41:23.233Z","stack":["UnknownEndpoint: Inaccessible host: `localhost'. This service may not be available in the `us-east-1' region.","    at Request.ENOTFOUND_ERROR (/var/runtime/node_modules/aws-sdk/lib/event_listeners.js:507:46)","    at Request.callListeners (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:106:20)","    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/sequential_executor.js:78:10)","    at Request.emit (/var/runtime/node_modules/aws-sdk/lib/request.js:688:14)","    at ClientRequest.error (/var/runtime/node_modules/aws-sdk/lib/event_listeners.js:339:22)","    at ClientRequest.<anonymous> (/var/runtime/node_modules/aws-sdk/lib/http/node.js:96:19)","    at ClientRequest.emit (events.js:376:20)","    at ClientRequest.emit (domain.js:470:12)","    at Socket.socketErrorListener (_http_client.js:475:9)","    at Socket.emit (events.js:376:20)"]}
```

this is what i get when i run the query from the command line

```
PS D:\Software Projects\temp> aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": [
        "posts"
    ]
}

{
    "Items": [
        {
            "date": {
                "S": "01-01-2021"
            },
            "id": {
                "S": "1"
            },
            "title": {
                "S": "welcome!"
            },
            "body": {
                "S": "welcome to my blog!"
            },
            "author": {
                "S": "cory m"
            },
            "timestamp": {
                "N": "1"
            }
        }
    ],
    "Count": 1,
    "ScannedCount": 1,
    "ConsumedCapacity": null
}
```
