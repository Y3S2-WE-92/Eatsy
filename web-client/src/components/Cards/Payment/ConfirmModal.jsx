export default function ConfirmModal({ open, onCancel, onConfirm, header, message }) {
    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-center">{header}</h3>
                  <p className="text-center">
                    {message}
                  </p>
                  <div className="flex justify-center gap-4 mt-6">
                    <button onClick={onCancel} className="btn btn-outline">Cancel</button>
                    <button onClick={onConfirm} className="btn btn-primary">Yes</button>
                  </div>
                </div>
              </div>
            )}
        </>
    );
}
