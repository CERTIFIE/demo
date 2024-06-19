import ServiceComponent from "./ServiceComponent";
import DocumentComponent from "./DocumentComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 bg-gray-100">
      <ServiceComponent />
      <div className="mt-5"></div>
      <div className="mt-5"></div>
      <DocumentComponent />
    </main>
  );
}
