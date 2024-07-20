import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { ActionFunction, Form, Link, redirect } from "react-router-dom";

export const action: ActionFunction = async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const payload = {
    email,
    password,
  };

  await api.login(payload);
  return redirect("/");
};

function Component(): JSX.Element {
  return (
    <Form name="login" className="h-full" method="POST" action="/auth/login">
      <Card className="p-8 pt-16 pb-4 h-full flex flex-col">
        <div className="flex-1">
          <CardHeader>
            <h1 className="text-4xl mb-6 text-primary">HealthVue</h1>
            <CardTitle className=" text-3xl font-normal ">
              Login with your email and password
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="flex flex-col gap-4">
              <Input
                name="email"
                placeholder="Email"
                value={"pras@gmail.com"}
              />
              <Input
                name="password"
                type={"password"}
                placeholder="Password"
                value={"password"}
              />
            </div>

            <div className="mt-10 w-full">
              <Button className="w-full">Continue</Button>
            </div>

            <div className="mt-6 flex justify-end">
              <Link to={"/auth/signup"}>
                <Button variant="link">Create New Org</Button>
              </Link>
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex items-center justify-center">
          <p className="font-thin text-sm">&copy;HealthVue 2024</p>
        </CardFooter>
      </Card>
    </Form>
  );
}

Component.displayName = "LoginRoute";

export const element = <Component />;
