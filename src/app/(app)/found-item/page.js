import SubmitForm from "../_components/submit-form";

export default function FoundItem() {
  return (
    <div className="container max-w-2xl mx-auto pt-8 pb-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Submit Found Item</h1>
      <SubmitForm type="FOUND" />
    </div>
  );
}
