"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_1 = require("../../models/post");
const aws_sdk_1 = require("aws-sdk");
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
class PostService {
    constructor() {
        this._mapper = new dynamodb_data_mapper_1.DataMapper({
            client: new aws_sdk_1.DynamoDB({
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            })
        });
    }
    async GetAll() {
        var e_1, _a;
        let posts = [];
        const iterator = this._mapper.query(post_1.Post, { id: '1' });
        try {
            // for await(const post of this._mapper.scan({valueConstructor: Post})) {
            for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = await iterator_1.next(), !iterator_1_1.done;) {
                const post = iterator_1_1.value;
                posts.push(post);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return)) await _a.call(iterator_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return posts;
    }
    Create(savePostViewModel) {
        let post = new post_1.Post();
        let now = new Date();
        post.date = now;
        post.timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDay()).getTime() / 1000;
        post.author = savePostViewModel.Author;
        post.title = savePostViewModel.Title;
        post.body = savePostViewModel.Body;
        // post.metadata = Object.assign(new PostMetadata(), new Set(savePostViewModel.Tags))
        this._mapper.put({ item: post }).then(() => {
            console.log(post.id);
        });
    }
}
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map