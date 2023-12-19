import EditForm from "@/components/editform";

const getMemberById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/members/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch member");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditMember({ params }) {

  const { id } = params;
  const { member } = await getMemberById(id);
  const { userName, fatherName, motherName, birthDate, role, email, schoolName, grade, phone, gender } = member;

  return (
    <div className="w-1/2 mx-auto">
      <EditForm id={id} userName={userName} fatherName={fatherName} motherName={motherName} birthDate={birthDate} role={role} email={email} schoolName={schoolName} grade={grade} phone={phone} gender={gender} />
    </div>
  );
}
