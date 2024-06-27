// import Swal from "sweetalert2";
// export const showSuccessDialog = (title: string, text: string) => {
//   return Swal.fire({
//     title,
//     text,
//     icon: "success",
//   });
// };
// export const showErrorDialog = (title: string, text: string) => {
//   return Swal.fire({
//     title,
//     text,
//     icon: "error",
//   });
// };
// const dialogs = { success: showSuccessDialog, error: showErrorDialog };
// export default dialogs;
import Swal from "sweetalert2";

export const showSuccessDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
  });
};

export const showErrorDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
  });
};

export const showConfirmDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

const dialogs = { success: showSuccessDialog, error: showErrorDialog, confirm: showConfirmDialog };

export default dialogs;