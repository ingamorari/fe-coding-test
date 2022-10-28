export interface PostModel {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
