export default async function Home() {
  await new Promise((res, rej) => setTimeout(res, 3000));
  return <div>Hello</div>;
}
