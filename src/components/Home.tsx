import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
export default function Home(): JSX.Element {
  const { data } = useLoaderData() as { data: string };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data}>
        {(resolvedData) => <div>{resolvedData}</div>}
      </Await>
    </Suspense>
  );
}
