"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ImageUploadButtonProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  className?: string;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onUploadSuccess,
  folder = "/reports",
  className = "",
}) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    try {
      // 1. First get authentication
      const authResponse = await fetch("/api/imagekit-auth");
      
      // Check if response is JSON
      const contentType = authResponse.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await authResponse.text();
        console.error("Received non-JSON response:", text);
        throw new Error("Authentication server error");
      }

      const authData = await authResponse.json();
      
      if (!authData?.success) {
        throw new Error(authData?.error || "Authentication failed");
      }

      // 2. Get selected file
      const fileInput = uploadRef.current;
      if (!fileInput?.files?.[0]) {
        throw new Error("No file selected");
      }

      const file = fileInput.files[0];
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File must be less than 5MB");
      }

      setProgress(10); // Show initial progress

      // 3. Prepare upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `upload_${Date.now()}`);
      formData.append("folder", folder);
      formData.append("publicKey", authData.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);

      setProgress(30); // Show upload starting

      // 4. Upload to ImageKit
      const uploadResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(70); // Upload in progress

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json().catch(() => ({}));
        throw new Error(error.message || "Upload failed with status " + uploadResponse.status);
      }

      const result = await uploadResponse.json();
      setProgress(100); // Upload complete
      
      onUploadSuccess(result.url);
      toast.success("Upload successful!");

    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Upload failed");
      setProgress(0);
      
      // Reset file input
      if (uploadRef.current) {
        uploadRef.current.value = "";
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        type="file"
        ref={uploadRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => uploadRef.current?.click()}
        className="w-full"
      >
        Upload Image
      </Button>
      
      {progress > 0 && progress < 100 && (
        <div className="space-y-1">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">Uploading: {progress}%</p>
        </div>
      )}
    </div>
  );
};