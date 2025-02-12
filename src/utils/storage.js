import localforage from "localforage";

export const saveToStorage = (data) => {
  localforage.setItem("formData", data);
};

export const getFromStorage = async () => {
  return await localforage.getItem("formData");
};
