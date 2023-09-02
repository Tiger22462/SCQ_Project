// "use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SettingPage = () => {
  const pathname = usePathname();

  function extractIdFromPathname(pathname: string): string | null {
    const parts = pathname.split("/");
    return parts[parts.length - 2];
  }

  useEffect(() => {
    console.log("[Setting Page] pathname : ", pathname);
    console.log("[Setting Page] form id : ", extractIdFromPathname(pathname));
  }, []);

  return (
    <>
      {/* <div className="bg-whiteopa-800 grid justify-items-center items-center h-full  ">
        <div className="flex flex-col box-content w-2/3 h-auto p-11 rounded-lg my-16 gap-y-4 shadow-[0px_7px_20px_0px_#00000024] ">
          <h1 className="text-4xl font-semibold mb-10">Settings</h1>
          {settingList.map((index) => (
            <CardSettingOption title={index.title} detail={index.deital} />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default SettingPage;
