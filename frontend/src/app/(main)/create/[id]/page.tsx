"use client";
import React, { useEffect } from "react";

const createPage = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    console.log("[Create Page] form id : ", params.id);
  }, []);
  return (
    <div>
      <p>Form id: {params.id}</p>
    </div>
  );
};

export default createPage;
