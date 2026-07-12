import { useCartStore } from "../store/useCartStore";

// Owner: Member 5 (Cart / Checkout UI, Day 4 of the sprint plan)
export default function Cart() {
  const { lines, removeLine, updateQuantity } = useCartStore();

  if (lines.length === 0) {
    return <p className="text-gray-500">Your cart is empty.</p>;
  }

  const total = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);

  return (
    <div className="space-y-4">
      {lines.map((line) => (
        <div
          key={line.variantId}
          className="flex items-center justify-between border-b border-gray-200 pb-3"
        >
          <div>
            <p className="text-sm font-medium">{line.productTitle}</p>
            <p className="text-xs text-gray-500">
              {line.size} / {line.color}
            </p>
          </div>
          <input
            type="number"
            min={1}
            value={line.quantity}
            onChange={(e) => updateQuantity(line.variantId, Number(e.target.value))}
            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <p className="text-sm">Rs {(line.unitPrice * line.quantity).toFixed(2)}</p>
          <button
            onClick={() => removeLine(line.variantId)}
            className="text-xs text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-between font-medium pt-2">
        <span>Total</span>
        <span>Rs {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
