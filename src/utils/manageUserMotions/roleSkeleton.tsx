"use client";

import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/global.type";

interface RoleSelectorProps {
  user: User;
  onRoleChange: (userId: string, newRole: string) => void;
}

export function RoleSelector({ user, onRoleChange }: RoleSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Select
        value={user.role}
        onValueChange={(value) => onRoleChange(user._id, value)}
      >
        <SelectTrigger className="w-32 h-8 text-sm border-[#6366f1]/20 focus:border-[#6366f1] focus:ring-[#6366f1]/20 cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin" className="text-sm cursor-pointer">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Admin
            </span>
          </SelectItem>
          <SelectItem value="manager" className="text-sm cursor-pointer">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Manager
            </span>
          </SelectItem>
          <SelectItem value="customer" className="text-sm cursor-pointer">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Customer
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}
