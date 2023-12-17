import { Textarea } from "@/components/ui/textarea";

const Upload = () => {
  return (
    <section>
      <h1 className="font-bold text-3xl">Upload your video</h1>
      <p className="mt-2">Post a video to your account</p>

      <div className="w-full mx-auto flex flex-col gap-3 max-w-sm items-center justify-center">
        <Textarea placeholder="Type your content here." />
        <div
          className={`relative border-[8px] border-border shadow-xl rounded-xl`}
        >
          <video
            controls
            loop
            autoPlay
            muted
            src={
              "https://firebasestorage.googleapis.com/v0/b/toktok-clone-780fb.appspot.com/o/videos%2Frksthijerg%20(3).mp4?alt=media&token=0f79db0e-123d-4431-a234-6a798bb6b611"
            }
            className="max-h-[500px] rounded-md w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Upload;
