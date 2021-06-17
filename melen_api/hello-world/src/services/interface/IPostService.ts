import { Post } from "../../models/post"
export interface IPostService {
    GetAll(): Promise<Post[]>
    Create(savePostViewModel: SavePostViewModel): void
}

export class SavePostViewModel {
    public Author: string;
    public Title: string;
    public Body: string;
    public Tags: string[]
}

