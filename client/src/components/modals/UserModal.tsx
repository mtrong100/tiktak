import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { GenderCombobox } from "../GenderCombobox";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/zustand/authStore";
import { updateUser } from "@/services/userService";
import { TUserUpdateData } from "@/utils/types";
import { userInformationSchema } from "@/zodSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function UserModal() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUser = useAuthStore((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [gender, setGender] = useState("");
  const value = localStorage.getItem("token") as string;
  const accessToken = value ? JSON.parse(value) : null;

  const form = useForm<z.infer<typeof userInformationSchema>>({
    resolver: zodResolver(userInformationSchema),
    defaultValues: {
      username: currentUser?.username || "",
      city: currentUser?.city || "",
      country: currentUser?.country || "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      setGender(currentUser?.gender || "");
    }
  }, [currentUser]);

  // Handle update user profile
  async function onSubmit(values: z.infer<typeof userInformationSchema>) {
    setIsLoading(true);

    try {
      if (!gender) {
        toast({ description: "Please choose your gender", duration: 2000 });
        return;
      }

      const formData: TUserUpdateData = {
        ...values,
        gender,
      };

      const res = await updateUser(accessToken, currentUser?._id, formData);

      if (res) {
        useAuthStore.getState().storeCurrentUser(res?.results);
        toast({ description: res?.message, duration: 2000 });
        setIsLoading(false);
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to update profile. Try again",
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">
            Update your profile
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your country..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="flex flex-col">
              <FormLabel>Gender</FormLabel>
              <GenderCombobox value={gender} setValue={setGender} />
            </FormItem>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
