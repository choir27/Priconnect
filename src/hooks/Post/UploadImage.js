import { Button } from "../../components/Button";
import { useStore } from "../../middleware/Zustand/States";

export default function ImageUpload() {
  const setImage = useStore((action) => action.setImage);

  function uploadImage() {
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_REACT_APP_CLOUDINARY_NAME,
        uploadPreset: import.meta.env.VITE_REACT_APP_CLOUDINARY_PRESET,
        sources: ["local", "url"], // restrict the upload sources to URL and local files
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);

          setImage({
            created_at: result.info.created_at,
            original_filename: result.info.original_filename,
            public_id: result.info.public_id,
            secure_url: result.info.secure_url,
          });
        }
      },
    );

    myWidget.open();
  }

  return Button({
    text: "Upload Image",
    classNames: "button2",
    onClick: () => uploadImage(),
  });
}
