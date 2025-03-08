import SubmitForm from "../_components/submit-form";

export default function LostPage() {
    return (
        <div>
            <h1 className="text-lg font-semibold">Submit Lost Item</h1>
            <SubmitForm type="LOST" />
        </div>
    );
}