"use client";
import Image from "next/image";
import Link from "next/link";
import { LoaderIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { UpdateHeader } from "@/app/_context/UpdateHeader";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateHeader);


  const route = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      route.push("/");
    }
  }, []);
  const SignIn = () => {
    setLoading(true);
    GlobalApi.signIn(email, password)
      .then((resp) => {
        sessionStorage.setItem("jwt", resp.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        setPassword("");
        setEmail("");
        setUpdateCart(!updateCart)
        toast("Login Successful");
        route.replace("/");
        // window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "There was a problem signing in please ensure you are have an account  and try again "
        );
        toast.error(error?.response?.data?.error?.message);

        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200">
        <Image src={"/logo.jpg"} width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Sign In to Account</h2>
        <h2 className="font-bold text-3xl">
          Enter your Email and Password to Sign In{" "}
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
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
            onClick={() => SignIn()}
            disabled={!(email || password) || loading}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Don't have an account
            <Link href={"/create-account"} className="text-blue-500 px-2">
              Click here to Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
