import { InputFile } from "@/components/InputFile";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { createPost } from "@/services/postService";
import { useAuthStore } from "@/zustand/authStore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Upload = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [video, setVideo] = useState<string>("");
  const [value, setValue] = useState<string>("");

  // Handle upload video
  const handleUploadVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;
    if (!file) return;
    const storage = getStorage();

    const storageRef = ref(storage, "videos/" + file.name + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsUploading(true);
      },
      (error) => {
        console.log(error);
        setVideo("");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideo(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  // Hande add new post
  const handleAddNewPost = async () => {
    if (!video) {
      toast({ description: "Please upload your video", duration: 2000 });
      return;
    }

    if (!value) {
      toast({ description: "Please write your content", duration: 2000 });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token") as string;
      const accessToken = JSON.parse(token);

      const data = {
        video,
        content: value,
        user: currentUser?._id,
      };

      const res = await createPost(data, accessToken);

      if (res) {
        toast({ description: res?.message, duration: 2000 });
        setVideo("");
        setValue("");
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setVideo("");
      setValue("");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to create post. Try again",
      });
    }
  };

  return (
    <section>
      <h1 className="font-bold text-3xl">Upload your video</h1>
      <p className="mt-2">Post a video to your account</p>

      <div className="flex mt-5 gap-3 items-start justify-center">
        <div
          className={`relative border-[8px] border-border shadow-xl rounded-[20px] h-[575px] w-[330px] flex items-center justify-center`}
        >
          {!video && (
            <InputFile onChange={handleUploadVideo} loading={isUploading} />
          )}

          {video && (
            <video
              controls
              loop
              autoPlay
              muted
              src={video}
              className="rounded-xl"
            />
          )}
        </div>

        <div className="w-full max-w-lg flex-1">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your content here."
            className="min-h-[300px] text-lg"
          />
          <Button
            onClick={handleAddNewPost}
            size="lg"
            className="mt-3 flex ml-auto text-lg"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Upload;
