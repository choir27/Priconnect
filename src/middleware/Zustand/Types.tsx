import { Image, Post, User, Account } from "../Interfaces";

export type State = {
  text: string;
  image: Image;
  posts: Post[];
  comment: string;
  searchValue: string;
  display: boolean;
};

export type Action = {
  setText: (e: string) => void;
  setImage: (e: Image) => void;
  setPosts: (e: Post[]) => void;
  setComment: (e: string) => void;
  setSearchValue: (e: string) => void;
  setDisplay: (e: boolean) => void;
};

export type Context = {
  posts: Post[];
  user: User;
  subscribedPosts: Account[];
};

export const defaultUser = {
  email: "",
  $id: "",
  name: "",
  $createdAt: "",
};
