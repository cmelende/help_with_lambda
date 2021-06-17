"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const PostService_1 = require("./services/implementation/PostService");
const lambdaHandler = async (event) => {
    const postService = new PostService_1.PostService();
    const queries = JSON.stringify(event.queryStringParameters);
    return {
        statusCode: 200,
        body: JSON.stringify(await postService.GetAll())
    };
};
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=app.js.map