import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  avatar: string;
  username?: string;
}

export function UserAvatar({
  avatar = "https://github.com/shadcn.png",
  username = "shadcnui",
}: Props) {
  return (
    <Avatar>
      <AvatarImage src={avatar} alt="avatar" />
      <AvatarFallback>{username}</AvatarFallback>
    </Avatar>
  );
}
