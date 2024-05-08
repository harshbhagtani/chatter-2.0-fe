import { Avatar, Skeleton } from "@mui/material";
import React from "react";

const TypingSkeleton = () => {
  return (
    <div className="flex gap-2">
      <Avatar sizes="small" />
      <div className="w-40 bg-white rounded-md px-4 py-2">
        <Skeleton variant="text" className="text-base" />
        <Skeleton variant="text" className="text-base" />
      </div>
    </div>
  );
};

export default TypingSkeleton;
