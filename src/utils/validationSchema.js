import * as yup from "yup";

export const formSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  githubUserName: yup.string().required("GitHub username is required"),
  avatar: yup
    .string()
    .url("Must be a valid URL")
    .matches(/cloudinary\.com/, "Must be a Cloudinary URL")
    .required("Avatar URL is required"),
});
