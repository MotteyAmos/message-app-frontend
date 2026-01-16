'use client'
import React, { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export default function layout({ children }: PropsWithChildren) {
  return (   
    <div>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
    </div>
  );
}
