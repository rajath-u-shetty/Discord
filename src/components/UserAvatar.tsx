import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"

interface UserAvatarProps {
    src? : string,
    className?: string,
    name?: string
}

const UserAvatar = ({src, className, name }: UserAvatarProps) => {
    
  return (
    <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
        <AvatarImage src={src}/>
        <AvatarFallback className="text-white">
          {name?.charAt(0).toLocaleUpperCase()}
        </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
