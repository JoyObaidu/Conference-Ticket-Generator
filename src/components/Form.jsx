import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../utils/validationSchema";
import { saveToStorage, getFromStorage } from "../utils/storage";
import PropTypes from "prop-types";


const CLOUD_NAME = "dgatpyppe";
const UPLOAD_PRESET = "ml_default";

const Form = ({ setTicket }) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const storedData = getFromStorage();
    if (storedData) {
      setValue("fullName", storedData.fullName);
      setValue("email", storedData.email);
      setValue("avatar", storedData.avatar);
      setAvatarUrl(storedData.avatar);
    }
  }, [setValue]);

  const openUploadWidget = () => {
    if (!window.cloudinary) {
      console.error("Cloudinary script not loaded.");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ["local"],
        cropping: true,
        multiple: false,
        folder: "conference_avatars",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const uploadedUrl = result.info.secure_url;
          setAvatarUrl(uploadedUrl);
          setValue("avatar", uploadedUrl, { shouldValidate: true });
          trigger("avatar");
        } else if (error) {
          console.error("Cloudinary Upload Error:", error);
        }
      }
    );

    widget.open();
  };

  const onSubmit = (data) => {
    saveToStorage(data);
    setTicket(data);
  };

  return (
    <div className="text-white bg-purple-950 shadow-lg rounded-lg p-6 max-w-lg mx-auto w-full sm:w-1/2 md:w-2/3 lg:w-3/4">
      <header className="text-center">
        <h2 className="text-xl font-bold mb-2">
          Your Journey to Coding Conference 2025 Starts Here
        </h2>
        <p className="text-gray-300">
          Secure your spot at the biggest conference
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Upload Avatar</label>
          <button
            type="button"
            onClick={openUploadWidget}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition duration-300"
          >
            Upload Image
          </button>

          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Uploaded Avatar"
              className="w-24 h-24 rounded-full mt-2 object-cover mx-auto"
            />
          )}

          <input type="hidden" {...register("avatar")} value={avatarUrl} />
          {errors.avatar && (
            <p className="text-red-500 text-sm">{errors.avatar.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Enter your full name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">GitHub Username</label>
          <input
            {...register("githubUserName")}
            type="text"
            placeholder="Enter your GitHub username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.githubUserName && (
            <p className="text-red-500 text-sm">
              {errors.githubUserName.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  setTicket: PropTypes.func.isRequired, // ✅ This ensures prop validation
};

export default Form;
