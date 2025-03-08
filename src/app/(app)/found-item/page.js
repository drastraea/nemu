import SubmitForm from "../_components/submit-form";

export default function FoundItem() {
  return (
    <div>
      <h1 className="text-lg font-semibold">Submit Found Item</h1>
      <SubmitForm type="FOUND" />
    </div>
  );
}
