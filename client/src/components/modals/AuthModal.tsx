import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg" size="lg">
          Join now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Join with us</DialogTitle>
          <DialogDescription className="text-lg">
            Create an account now
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-3">
          <Button variant="outline" className="text-lg" size="lg">
            <FaGoogle className="mr-2 h-4 w-4" size={25} /> Google
          </Button>
          <Button variant="outline" className="text-lg" size="lg">
            <FaGithub className="mr-2 h-4 w-4" size={25} /> Github
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
