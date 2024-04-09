"use client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import  {LoaderIcon} from 'lucide-react'
import { UpdateHeader } from "@/app/_context/UpdateHeader";

const CreateAccount = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateHeader);


  const router = useRouter();
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);
  const handleSubmit = () => {
    setLoading(true);

    GlobalApi.registerUsers(username, email, password)
      .then((resp) => {
        const user = resp.data.user;
        const jwt = resp.data.jwt;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", jwt);
        toast("Sign Up SuccessFul");
        setPassword("");
        setEmail("");
        setUsername(" ");
        setUpdateCart(!updateCart)
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        return toast("Error Creating Account");
      });
  };

  return (
    <div className="flex justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200">
        <Image src={"/logo.jpg"} width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Create An Account</h2>
        <h2 className="font-bold text-3xl">Enter your Email and Password </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={() => handleSubmit()}
            disabled={!(username || email || password) || loading}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : " Create an Account"}
          </Button>
          <p>
            Already have an account
            <Link href={"/login"} className="text-blue-500 px-2">
              Click here to Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
