import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import ChartWrapper from "./ui/chart";

export default function Home(): JSX.Element {
  // const { data } = useLoaderData() as { data: string };
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    //   <Await resolve={data}>
    //     {(resolvedData) => <div>{`${JSON.stringify(resolvedData)}`}</div>}
    //   </Await>
    // </Suspense>
    <div className="flex flex-col gap-6 p-6 ">
      <div className="flex flex-row gap-12">
        <SampleCountCard title="Patients" />
        <SampleCountCard title="Cases" />
        <SampleCountCard title="Scanners" />
        <SampleCountCard title="Technicians" />
      </div>
      <div className="flex gap-6 flex-wrap">
        <SampleChartCard />
        <SampleChartCard />
        <SampleChartCard />
      </div>
    </div>
  );
}

function getRandomCount(): number {
  const num = Math.random() * 100;
  return Math.floor(num);
}

function SampleCountCard({ title }: { title: string }): JSX.Element {
  return (
    <Card className=" w-80">
      <CardHeader>
        <p>{title}</p>
      </CardHeader>
      <CardContent>
        <h1 className=" text-6xl">{getRandomCount()}</h1>
      </CardContent>
    </Card>
  );
}

function SampleChartCard(): JSX.Element {
  return (
    <Card className="h-96 w-[49%]">
      <CardContent className="h-full w-full">
        <ChartWrapper
          chartData={{
            type: "line",
            data: {
              labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19, 3, 5, 2, 3],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
