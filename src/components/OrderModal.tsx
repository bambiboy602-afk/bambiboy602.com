import React, { useState } from 'react';
import { ProductItem } from '../types';
import { X, CheckCircle2, Package, ShieldCheck, ArrowRight, Sparkles, Phone, Mail } from 'lucide-react';

interface OrderModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAskAura: (prompt: string) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ product, onClose, onAskAura }) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [organization, setOrganization] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeOrderNum = `BAMBI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(fakeOrderNum);
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('form');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setShippingAddress('');
    setQuantity(1);
    setOrganization('');
    onClose();
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950/50">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
              {step === 'form' ? `Order ${product.title}` : 'Order Confirmed!'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {step === 'form' ? (
            <>
              {/* Product Preview Card */}
              <div className="flex gap-4 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 items-center">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-16 h-16 rounded-xl object-contain bg-white dark:bg-stone-900 p-1 shrink-0 border border-stone-200 dark:border-stone-700"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {product.badge}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                    {product.title}
                  </h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-stone-100">
                      ${product.price} each
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                      Direct Support Order
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Total Due
                    </label>
                    <div className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-extrabold text-sm">
                      ${totalPrice}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(602) 555-0199"
                      className="w-full py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Organization / Facility / Center (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Hope Recovery Home / Community Center"
                    className="w-full py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Mailing / Shipping Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street address, city, state, ZIP code"
                    className="w-full py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Confirm Order (${totalPrice})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-6 text-center space-y-4 text-xs">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                  Thank You for Your Order!
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Order Reference: <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{orderNumber}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-left space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                <p><strong>Item:</strong> {product.title} (x{quantity})</p>
                <p><strong>Total:</strong> ${totalPrice}</p>
                <p><strong>Name:</strong> {customerName}</p>
                <p><strong>Contact:</strong> {customerPhone} • {customerEmail}</p>
                <p><strong>Ship to:</strong> {shippingAddress}</p>
              </div>

              <p className="text-stone-500 dark:text-stone-400">
                Bambi will review your order and follow up directly via text or email with tracking and payment details.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:flex-1 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-900 font-bold transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    handleReset();
                    onAskAura(`Can you tell me how to get the most value out of the ${product.title}?`);
                  }}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800"
                >
                  Ask Tom for Tips
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
