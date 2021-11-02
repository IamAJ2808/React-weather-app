import React from "react";

import "./toast.css";

function Toast({message}){
 return (<div className="snackbar show">{message}</div>);
}

export default Toast;