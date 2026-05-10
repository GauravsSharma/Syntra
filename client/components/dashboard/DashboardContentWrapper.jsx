// components/dashboard/DashboardContentWrapper.jsx

"use client";

import { usePathname } from "next/navigation";

const DashboardContentWrapper = ({ children }) => {
  const pathname = usePathname();

  const isConversationPage =
    pathname.startsWith("/dashboard/conversation");

  return (
    <div
      className={`w-full lg:ml-54 ${
        isConversationPage
          ? "mb-0"
          : "mb-16 sm:mb-0"
      }`}
    >
      {children}
    </div>
  );
};

export default DashboardContentWrapper;