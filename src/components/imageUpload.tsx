"use client";

import React, { useRef, useState } from "react";
import {
  ImageKitProvider,
  IKUpload,
  IKImage,
  IKVideo,
} from "imagekitio-next"; 

const FileUpload = ({
  type = "image",
  folder = "/reports",
  placeholder = "Upload a file",
  onSuccessUpload,
}: {
  type?: "image" | "video";
  folder?: string;
  placeholder?: string;
  onSuccessUpload?: (url: string) => void;
}) => {
  const uploadRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  const authenticator = async () => {
    const res = await fetch("/api/imagekit-auth");
    const data = await res.json();
    return data;
  };

  const handleSuccess = (res: any) => {
    setFileUrl(res.url);
    onSuccessUpload?.(res.url);
  };

  const handleError = (err: any) => {
    console.error("Upload error", err);
    alert("Upload failed. Please try again.");
  };

  return (
    <ImageKitProvider
      publicKey="public_dTtnfLNskwHlfECCtLfZGkhNpF4="
      urlEndpoint="https://ik.imagekit.io/deepaksharma"
      authenticator={authenticator}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          uploadRef.current?.click();
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {placeholder}
      </button>

      <IKUpload
        ref={uploadRef}
        style={{ display: "none" }}
        folder={folder}
        useUniqueFileName={true}
        onSuccess={handleSuccess}
        onError={handleError}
        onUploadProgress={({ loaded, total }) =>
          setProgress(Math.round((loaded / total) * 100))
        }
      />

      {progress > 0 && progress < 100 && <p>Uploading: {progress}%</p>}

      {fileUrl &&
        (type === "image" ? (
          <IKImage path={fileUrl.replace("https://ik.imagekit.io/deepaksharma/", "")} />
        ) : (
          <IKVideo path={fileUrl.replace("https://ik.imagekit.io/deepaksharma/", "")} controls />
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;
