export type TSidebarLinks = {
  name: string;
  icon: JSX.Element;
  link: string;
};

export type TUserData = {
  username: string | null;
  avatar: string | null;
  email: string | null;
  provider?: string;
};

export type TUserUpdateData = {
  username: string | null;
  city: string | null;
  gender: string | null;
  country: string | null;
};

export type TCurrentUser = {
  _id: string;
  username: string;
  avatar: string;
  email: string;
  provider: string;
  gender?: string;
  city?: string;
  country?: string;
  following: string[];
  followers: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type TPost = {
  content: string;
  video: string;
  user: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type TComment = {
  content: string;
  image?: string;
  user: string;
  post: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TDropdownLinks = {
  title: string;
  icon: JSX.Element;
  link: string;
};
