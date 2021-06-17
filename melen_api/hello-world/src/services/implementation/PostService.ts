import {IPostService, SavePostViewModel} from "../interface/IPostService";
import {Post, PostMetadata} from "../../models/post";
import {CredentialProviderChain, DynamoDB, SharedIniFileCredentials} from "aws-sdk";
import {DataMapper} from "@aws/dynamodb-data-mapper";
import {ServiceConfigurationOptions} from "aws-sdk/lib/service";

export class PostService implements IPostService {

    private _mapper: DataMapper;
    private _client: DynamoDB;
    constructor() {
        this._mapper = new DataMapper({
            client: new DynamoDB({
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            })
        })
    }
    async GetAll(): Promise<Post[]> {
        let posts: Post[] = []

        const iterator = this._mapper.query(Post, {id:'1'})

        // for await(const post of this._mapper.scan({valueConstructor: Post})) {
        for await (const post of iterator){
            posts.push(post);
        }

        return posts;
    }

    Create(savePostViewModel: SavePostViewModel): void {
        let post = new Post();
        let now = new Date();
        post.date = now;
        post.timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDay()).getTime()/1000;
        post.author = savePostViewModel.Author;
        post.title = savePostViewModel.Title;
        post.body = savePostViewModel.Body;
        // post.metadata = Object.assign(new PostMetadata(), new Set(savePostViewModel.Tags))

        this._mapper.put({item: post}).then(() => {
            console.log(post.id);
        })
    }


}