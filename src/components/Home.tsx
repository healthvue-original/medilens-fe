import { Card, CardContent, CardHeader } from "./ui/card";
import ChartWrapper from "./ui/chart";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 ">
      <div className="flex flex-row flex-wrap">
        <SampleCountCard title="Patients" />
        <SampleCountCard title="Cases" />
        <SampleCountCard title="Scanners" />
        <SampleCountCard title="Technicians" />
      </div>
      <div className="flex flex-wrap">
        <SampleChartCard type={"pie"} />
        <SampleChartCard type={"line"} />
        <SampleChartCard type={"bar"} />
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
    <div className="w-1/2 sm:w-1/4 p-2">
      <Card className="">
        <CardHeader>
          <p>{title}</p>
        </CardHeader>
        <CardContent>
          <h1 className=" text-6xl">{getRandomCount()}</h1>
        </CardContent>
      </Card>
    </div>
  );
}

function SampleChartCard({ type }: { type: any }): JSX.Element {
  return (
    <div className="h-96 w-full sm:w-1/2 p-3">
      <Card className="h-full w-full">
        <CardHeader>Sample {type} Chart</CardHeader>
        <CardContent className=" h-[calc(100%-72px)] w-full">
          <ChartWrapper
            chartData={{
              type,
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
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: `${type == "pie" ? "right" : "top"}`,
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
