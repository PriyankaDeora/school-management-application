import Navbar from "@/components/navbar";
import MemberForm from "../../components/memberform";
import Nav from "../../components/nav";

function AddMember() {
    

    return (
        <>
            <div className="flex h-max bg-slate-300">
                <Nav />

                <Navbar />

                <MemberForm/>
            </div>

        </>
    )
}

export default AddMember
