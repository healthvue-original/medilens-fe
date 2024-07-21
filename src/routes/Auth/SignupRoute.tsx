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
import { CreateOrgPayload } from "@/services/api/types";
import { ActionFunction, Form, Link, redirect } from "react-router-dom";

export const action: ActionFunction = async function action({ request }) {
  const formData = await request.formData();

  const org_name = formData.get("org-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const payload: CreateOrgPayload = {
    org_name,
    email,
    password,
  };

  await api.createOrg(payload);
  return redirect("/");
};

function Component(): JSX.Element {
  return (
    <Form name="signup" className="h-full" action="/auth/signup" method="POST">
      <Card className="p-8 pt-16 pb-4 h-full flex flex-col">
        <div className="flex-1">
          <CardHeader>
            <h1 className="text-4xl mb-6 text-primary">HealthVue</h1>
            <CardTitle className=" text-3xl font-normal ">
              Create New Organisation
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="flex flex-col gap-4">
              <Input name="org-name" placeholder="Org Name" />
              <Input name="email" placeholder="Email" />
              <Input type={"password"} name="password" placeholder="Password" />
            </div>

            <div className="mt-10 w-full">
              <Button className="w-full">Continue</Button>
            </div>

            <div className="mt-6 flex justify-end">
              <Link to={"/auth/login"}>
                <Button variant="link">Login</Button>
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

Component.displayName = "SignupRoute";

export const element = <Component />;
