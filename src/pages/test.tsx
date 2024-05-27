// import { NextPageWithLayout } from "@/components/layout";
// import { register } from "module";
// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";

// const Page: NextPageWithLayout = (props: any) => {
//   const { register, handleSubmit } = useForm();
//   const [imagePreview, setImagePreview] = useState<string>("");

//   const onSubmit = (data: any) => {
//     console.log(`DATA: ${JSON.stringify(data)}`);
//     console.log(`FILE NAME: ${data.image.files[0]}`);
//     console.log(`image: ${data.image[0]}`);
//   };

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="text-white mt-48">
//       <h1>TESTING</h1>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           type="file"
//           {...register("image", { required: true })}
//           onChange={handleFileChange}
//         />
//         <input type="submit" />
//       </form>

//       {imagePreview && (
//         <img
//           src={imagePreview}
//           alt="Preview"
//           style={{ width: "200px", height: "200px" }}
//         />
//       )}
//     </div>
//   );
// };

// Page.navbar = true;
// Page.footer = true;

// export default Page;

import { useForm } from "react-hook-form";
import axios from "axios";

const Page = () => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data: any) => {
    // console.log(`DATA: ${JSON.stringify(data)}`);

    await axios.post("/api/upload", { b64File: data.b64File });
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const base64 = await convertToBase64(file);
      setValue("b64File", base64);
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      <input
        {...register("picture")}
        type="file"
        required
        onChange={handleFileChange}
      />
      <input type="hidden" {...register("b64File")} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Page;
