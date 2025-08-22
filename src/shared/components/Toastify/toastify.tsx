import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function Toast() {
  const notify = () => toast("Chaal mera Putar Chutti kar !");

  return (
    <div>
      <button onClick={notify}>Push me !</button>
      <ToastContainer />
    </div>
  );
}
