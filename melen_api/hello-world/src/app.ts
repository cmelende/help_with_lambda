import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import {PostService} from "./services/implementation/PostService";
export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const postService = new PostService();
    const queries = JSON.stringify(event.queryStringParameters);
    return {
        statusCode: 200,
        body: JSON.stringify(await postService.GetAll())
    }
}