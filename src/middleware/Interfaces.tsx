export interface ButtonInterface {
  text: string | React.JSX.Element;
  classNames?: string;
  onClick: () => void;
  key?: string;
}

export interface ButtonLinkInterface extends ButtonInterface {
  domain: string;
}

export interface User {
  email: string;
  $id: string;
  name: string;
  $createdAt: string;
}

export interface Image {
  created_at: string;
  original_filename: string;
  public_id: string;
  secure_url: string;
}

export interface CreatePostInterface {
  text: string;
  image: Image;
}

export interface Post {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  text: string;
  image: string;
  likes: string[];
  email: string;
  comments: string[];
}

export interface TextBoxInputInterface {
  setChange: (e: string) => void;
  placeholder: string;
  name: string;
  classNames?: string;
  rows?: number;
  cols?: number;
}

export interface SearchInputInterface {
  setSearchValue: (e: string) => void;
  searchValue?: string;
}

export interface PostsInterface {
  posts: Post[];
  optionDisplay: boolean;
  setOptionDisplay: (e: boolean) => void;
  user: User;
  endIndex?: number;
  startIndex?: number;
}

export interface addLikeInterface {
  post: Post;
  user: User;
  navigate: (e: string) => void;
}

export interface Comment {
  comment: string;
  id: string;
}

export interface addCommentInterface extends addLikeInterface {
  comment: string;
  expandedPostDomain?: string;
}

export interface PostOptionsInterface {
  post: Post;
  props: PostsInterface;
  checkLikeLogic: string;
  expandedPostDomain?: string;
}

export interface CommentLike {
  id?: string;
}

export interface CommentOptionsInterface {
  post: Post;
  index: number;
}

export interface ReplyOptionsInterface extends CommentOptionsInterface {
  replyIndex: number;
}

export interface Reply {
  comment: string;
  id: string;
  likes: string[];
}

export interface SearchInterface {
  user: User;
  searchValue: string;
}

export interface SearchHistory {
  $id?: string;
  id: string;
  searchHistory: string[];
  $createdAt?: string;
}

export interface Account {
  id: string;
  blocked: string[];
  subscriptions: string[];
  $id: string;
  private: boolean;
}

export interface PaginatedButtonsInterface {
  setEndIndex: (e: number) => void;
  endIndex: number;
  rowsPerPage: number;
}
