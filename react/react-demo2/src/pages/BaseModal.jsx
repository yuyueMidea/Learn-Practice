export default function BaseModal({ visible, onClose, title, children }) {
    if(!visible) return null;
    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded shadow-lg w-[610px]">
                <div className="p-4 border-b flex justify-between">
                    <h2>{title}</h2>
                    <button onClick={onClose}>×</button>
                </div>
                <div className="p-4 w-[600px] h-[400px] overflow-y-auto">{children}</div>
            </div>
        </div>
    )
}