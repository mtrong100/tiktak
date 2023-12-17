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
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useToast } from "../ui/use-toast";
import { oauthLogin } from "@/services/authService";
import { TUserData } from "@/utils/types";
import { useState } from "react";
import { useAuthStore } from "@/zustand/authStore";

export function AuthModal() {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const results = await signInWithPopup(auth, provider);
      const data = results.user;

      const request: TUserData = {
        username: data?.displayName,
        avatar: data?.photoURL,
        email: data?.email,
        provider: "google",
      };

      const res = await oauthLogin(request);

      if (res) {
        useAuthStore.getState().storeCurrentUser(res?.results);
        localStorage.setItem("token", JSON.stringify(res?.token));
        toast({ description: res?.message, duration: 2000 });
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to login. Try again",
      });
    }
  };

  const handleLoginWithGithub = async () => {
    const provider = new GithubAuthProvider();

    try {
      const results = await signInWithPopup(auth, provider);
      const data = results.user;

      const request: TUserData = {
        username: data?.displayName,
        avatar: data?.photoURL,
        email: data?.email,
        provider: "github",
      };

      const res = await oauthLogin(request);

      if (res) {
        useAuthStore.getState().storeCurrentUser(res?.results);
        localStorage.setItem("token", JSON.stringify(res?.token));
        toast({ description: res?.message, duration: 2000 });
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to login. Try again",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Button
            onClick={handleLoginWithGoogle}
            variant="outline"
            className="text-lg"
            size="lg"
          >
            <FaGoogle className="mr-3 h-4 w-4" size={25} /> Continue with Google
          </Button>
          <Button
            onClick={handleLoginWithGithub}
            variant="outline"
            className="text-lg"
            size="lg"
          >
            <FaGithub className="mr-3 h-4 w-4" size={25} /> Continue with Github
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
