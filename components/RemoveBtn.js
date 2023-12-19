"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

function RemoveBtn({ id }) {

  const router = useRouter();

  const removeMember = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/members?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button
    onClick={removeMember}
    className="text-red-500">
        <HiOutlineTrash size={24} />
    </button>
  )
}

export default RemoveBtn;