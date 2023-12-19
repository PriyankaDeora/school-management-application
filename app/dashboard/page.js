import Nav from "../../components/nav";
import Navbar from "@/components/navbar";
import CardBarChart from "@/components/BarChart";
import DoughnutChart from "@/components/PieChart";
import FlowChart from "@/components/FlowChart";
import Cards from "@/components/Cards";

  async function dashboard() {

    return (
        <div className="flex bg-slate-300">
            <Nav />

            <Navbar />
            <div className="flex-1 m-5 rounded-lg lg:ml-64 md:ml-20 sm:ml-16 ml-14 mt-20">
                <div className="min-h-screen flex flex-col gap-5">

                    <Cards />

                    <div className="grid lg:grid-cols-2 gap-5 md:grid-cols-1">
                        <div className="bg-white rounded-lg px-20 py-10 flex flex-col gap-5 justify-center items-center shadow-md shadow-slate-500">
                            <DoughnutChart />
                        </div>
                        <div className="bg-white rounded-lg py-5 px-10 flex flex-col items-center shadow-md shadow-slate-500 justify-center"><CardBarChart /></div>
                    </div>

                    <div className="rounded-lg bg-white p-5 shadow-md shadow-slate-500">
                        <h1 className="text-xl p-5 font-semibold">FlowChart</h1>
                        <FlowChart />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default dashboard