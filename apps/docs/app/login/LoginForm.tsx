import * as React from "react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { TextInput } from "@repo/ui/components/hoc/Components";

export default function LoginForm() {
  return (
    <Card className="w-[350px] h-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <TextInput
              label="Email"
              id="email"
              type="email"
              placeholder="john@doe.com"
            />
            <TextInput
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button>Login</Button>
      </CardFooter>
    </Card>
  );
}
