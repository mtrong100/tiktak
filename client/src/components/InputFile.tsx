import { Loader2 } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

interface InputFileProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

export function InputFile({
  onChange = () => {},
  loading = false,
}: InputFileProps) {
  return (
    <div className="flex items-center justify-center flex-col gap-3 w-full max-w-xs ">
      <Button variant="outline" className="h-[50px]">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <label htmlFor="video" className="cursor-pointer text-lg">
          Upload file
        </label>
      </Button>
      <input
        name="video"
        type="file"
        id="video"
        accept=".mp4"
        className="hidden-input"
        onChange={onChange}
      />
    </div>
  );
}
