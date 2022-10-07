/**
 * @name handleAPIError
 * @description Function to handle API errors with sweetalert
 */

import Swal from "sweetalert2";

export const handleAPIError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    if (status === 401) {
      // Unauthorized
      // Logout user
      //   localStorage.removeItem("vuex");
      //   window.location.reload();
      if (data.message === "inactive") {
        Swal.fire({
          title: "Error",
          text: data.errors ? data.errors.join(" ") : data.message,
          icon: "error",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("vuex");
            localStorage.removeItem("selectedOperationalAccountBalance");
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.errors ? data.errors.join(" ") : data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else if (status === 400) {
      // Bad request
      // Show error message
      Swal.fire({
        title: "Error",
        text: data.errors ? data.errors.join(" ") : data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (status === 404) {
      // Not found
      // Show error message
      Swal.fire({
        title: "Error",
        text: data.errors ? data.errors.join(" ") : data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (status === 500) {
      // Internal server error
      // Show error message
      Swal.fire({
        title: "Error",
        text: data.errors ? data.errors.join(" ") : data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (status === 403) {
      // Forbidden
      // Show error message
      Swal.fire({
        title: "Error",
        text: data.errors ? data.errors.join(" ") : data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (status === 413) {
      // Request entity too large
      // Show error message
      Swal.fire({
        title: "Error",
        text: "Request entity too large",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      // Error from server
      // Show error message
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    Swal.fire({
      title: "Error",
      text: "No response from server",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    Swal.fire({
      title: "Error",
      text: "Error in request",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
  return Promise.reject(error);
};
