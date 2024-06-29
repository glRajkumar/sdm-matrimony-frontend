"use client";

import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function Upload() {
  const [image, setImage] = useState<any>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image",image);

    try {
      let res = await axios.put(`http://localhost:5000/users/imgupload`,formData);
       console.log("img upload success",res?.data)
    } catch (error) {
      console.error("img upload error:", error);
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
