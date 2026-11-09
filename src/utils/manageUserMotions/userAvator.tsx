"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/global.type";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      whileHover={{ scale: 1.1 }}
    >
      <Avatar className={sizeClasses[size]}>
        <AvatarImage
          src={user.profilePhotoUrl || "/placeholder.svg"}
          alt={`${user.name.firstName} ${user.name.lastName}`}
        />
        <AvatarFallback className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white font-semibold">
          {user.name.firstName.charAt(0)}
          {user.name.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
}
