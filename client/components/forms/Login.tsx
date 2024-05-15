"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType, useUserContext } from "@/global/userContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await login({ email, password });

    if (res.ok) {
      res.json().then((data) => {
        const userData: UserType = {
          userId: data.userId,
          name: data.name,
          email: data.email,
          role: data.role,
          address: data.address,
          contact: data.contact,
          photoGraphUri: data.photoGraphUri,
          createdAt: data.createdAt,
        };

        setUser(userData);

        // TODO: do not use localstorage
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/dashboard");
      });
    } else if (res.status == 404) {
      res.json().then((data) => {
        alert(data.message);
        return;
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>
          Log in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
