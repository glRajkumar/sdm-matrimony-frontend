"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";

function Upload() {
  const [image, setImage] = useState<any>(null);

  const uploadFile = async (timestamp: any, signature: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", "168584872561438");
    data.append("images", "images");

    try {
      const cloudName = "dz0vvjdhc";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}}/image/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const getSignatureForUpload = async (folder: any) => {
    try {
      // const res = await axios.post(`${API}/sign-upload`, { folder });
      // return res.data;
    } catch (error) {
      console.error("Signature error:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { timestamp: imgTimestamp, signature: imgSignature }: any =
        await getSignatureForUpload("images");
      const imgUrl = await uploadFile(imgTimestamp, imgSignature);

      // await axios.post(`${API}/api/videos`, { imgUrl});

      console.log("File upload success!");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  return (
    <section className="min-h-screen flex justify-center items-center">
      <Input
        className="w-1/2 mr-2"
        id="image"
        type="file"
        onChange={(e: any) => {
          setImage(e.target.files[0]);
        }}
      />
      <button onClick={handleSubmit}>upload</button>
    </section>
  );
}

export default Upload;
