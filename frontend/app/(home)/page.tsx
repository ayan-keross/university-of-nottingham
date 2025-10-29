//import Image from "next/image";
import data from "./data.json";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

export default function Page() {
  return (
    // <div
    //   className="@container/main flex flex-1 flex-col gap-2"
    //   style={{ backgroundImage: 'url("/nottingham_background.jpg")' }}
    // >
    //   <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    //     <div className="px-4 lg:px-6 mx-auto mt-[200px]">
    //       <h1 className="text-3xl font-bold text-black"><span className="text-5xl font-bold text-blue-400">Welcome</span> to the University of Nottingham</h1>
    //       <p className="mt-2 text-2xl text-black">
    //         Estates & Facilities Portfolio Management
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </div>
  );
}
