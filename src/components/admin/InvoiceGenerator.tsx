'use client';

import React, { useState, useRef } from 'react';

export interface InvoiceItem {
  id: string;
  description: string;
  qty: number | string;
  rate: number | string;
}

export default function InvoiceGenerator() {
  const [companyName, setCompanyName] = useState('NARIVA INTERIORS');
  const [companyPhone, setCompanyPhone] = useState('+91 93538 75064');
  const [billedTo, setBilledTo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', qty: '', rate: '' },
  ]);

  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<'amount' | 'percent'>('amount');
  const [terms, setTerms] = useState(
    '1. Goods once sold will not be taken back.\n2. Subject to local jurisdiction.'
  );

  const previewRef = useRef<HTMLDivElement>(null);

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  // Add Item
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', qty: 1, rate: 0 },
    ]);
  };

  // Remove Item
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Update Item
  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Calculations
  const calculateItemAmount = (qty: number | string, rate: number | string) => {
    const q = typeof qty === 'string' ? parseFloat(qty) || 0 : qty;
    const r = typeof rate === 'string' ? parseFloat(rate) || 0 : rate;
    return q * r;
  };

  const subtotal = items.reduce(
    (acc, item) => acc + calculateItemAmount(item.qty, item.rate),
    0
  );

  const discountAmount =
    discountType === 'percent'
      ? (subtotal * (discount || 0)) / 100
      : discount || 0;

  const totalAmount = Math.max(0, subtotal - discountAmount);

  // Trigger Print / Save as PDF
  const handlePrint = () => {
    if (!previewRef.current) return;
    const printContent = previewRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download/print the invoice.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice_${invoiceNo.replace(/\//g, '_')}</title>
          <style>
            @page {
              size: A4;
              margin: 20mm 15mm 20mm 15mm;
            }
            body {
              font-family: 'Noto Sans', 'Inter', -apple-system, sans-serif;
              color: #000;
              background: #fff;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
            }
            .invoice-print-box {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              padding: 10px;
              box-sizing: border-box;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }
            th, td {
              padding: 8px 6px;
              text-align: left;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            .border-top { border-top: 1.5px solid #000; }
            .border-bottom { border-bottom: 1.5px solid #000; }
            .border-bottom-thin { border-bottom: 1px solid #ccc; }
            .header-title { font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 4px; }
            .header-subtitle { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 2px; }
            .header-phone { font-size: 13px; text-align: center; margin-bottom: 15px; }
            hr { border: none; border-top: 1px solid #000; margin: 15px 0; }
            .details-flex { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 25px; }
            .totals-flex { display: flex; justify-content: space-between; font-size: 12px; margin-top: 20px; }
            .signatory { text-align: right; font-size: 13px; margin-top: 60px; }
          </style>
        </head>
        <body>
          <div class="invoice-print-box">
            ${printContent}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#25221d] p-6 rounded-2xl border border-[#9a7d46]/30">
        <div>
          <h2 className="font-serif text-2xl text-[#fdfcf9] font-light">Invoice Generator</h2>
          <p className="text-xs text-[#a09789] mt-0.5">
            Form output mirrors exact LaTeX document specifications for NARIVA INTERIORS
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all shadow-md shadow-[#9a7d46]/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Preview & Print / PDF</span>
        </button>
      </div>

      {/* Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (Spans 6 cols) */}
        <div className="lg:col-span-6 bg-[#25221d] p-6 rounded-2xl border border-[#9a7d46]/30 space-y-6">
          <h3 className="text-sm uppercase tracking-wider text-[#c4ab7c] font-semibold pb-2 border-b border-[#9a7d46]/20">
            Invoice Header & Client Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#a09789] mb-1 font-medium">Billed To (Customer Name)</label>
              <input
                type="text"
                value={billedTo}
                onChange={(e) => setBilledTo(e.target.value)}
                placeholder="e.g. Gopalakrishna D S"
                className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
                required
              />
            </div>
            <div>
              <label className="block text-[#a09789] mb-1 font-medium">Invoice No</label>
              <input
                type="text"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder="e.g. INV/26-27/001"
                className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
                required
              />
            </div>
            <div>
              <label className="block text-[#a09789] mb-1 font-medium">Invoice Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 26-Aug-2026"
                className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
                required
              />
            </div>
            <div>
              <label className="block text-[#a09789] mb-1 font-medium">Phone</label>
              <input
                type="text"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
              />
            </div>
          </div>

          {/* Line Items Section */}
          <div className="space-y-4 pt-2 border-t border-[#9a7d46]/20">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-wider text-[#c4ab7c] font-semibold">
                Items & Rate Specification
              </h3>
              <button
                type="button"
                onClick={addItem}
                className="text-xs bg-[#9a7d46]/20 hover:bg-[#9a7d46] text-[#c4ab7c] hover:text-white px-3 py-1.5 rounded-lg border border-[#9a7d46]/40 transition-colors flex items-center gap-1 font-medium"
              >
                + Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => {
                const itemAmount = calculateItemAmount(item.qty, item.rate);
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#1c1a17] border border-[#9a7d46]/20 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#9a7d46] font-semibold">Item #{idx + 1}</span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Description of Goods (e.g. 10mm Tuffan Glass)"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full bg-[#25221d] border border-[#9a7d46]/30 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#9a7d46]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-[#a09789]">Qty</label>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          className="w-full bg-[#25221d] border border-[#9a7d46]/30 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-[#9a7d46]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#a09789]">Rate (Rs.)</label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                          className="w-full bg-[#25221d] border border-[#9a7d46]/30 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-[#9a7d46]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#a09789]">Amount (Rs.)</label>
                        <div className="bg-[#25221d] border border-[#9a7d46]/20 rounded-lg px-2 py-1 text-[#c4ab7c] font-mono font-medium text-right truncate">
                          {formatCurrency(itemAmount)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Discount & Terms Section */}
          <div className="space-y-4 pt-2 border-t border-[#9a7d46]/20 text-xs">
            <h3 className="text-sm uppercase tracking-wider text-[#c4ab7c] font-semibold">
              Discount & Terms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a09789] mb-1 font-medium">Discount (If any)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
                  />
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'amount' | 'percent')}
                    className="bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-2 py-2 text-white text-xs focus:outline-none focus:border-[#9a7d46]"
                  >
                    <option value="amount">Rs.</option>
                    <option value="percent">%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#a09789] mb-1 font-medium">Terms & Conditions</label>
                <textarea
                  rows={3}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#9a7d46] text-xs resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Preview (Spans 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs uppercase tracking-wider text-[#c4ab7c] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Live Printable Document Preview
            </span>
            <span className="text-[11px] text-[#a09789]">A4 Paper Layout</span>
          </div>

          {/* Paper Container matching exact LaTeX output */}
          <div className="bg-white text-black p-8 rounded-xl shadow-2xl border border-gray-300 font-sans text-xs min-h-[580px] flex flex-col justify-between select-none">
            <div ref={previewRef}>
              {/* HEADER SECTION */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold tracking-wide uppercase text-black mb-1">INVOICE</h1>
                <h2 className="text-lg font-bold uppercase text-black mb-0.5">{companyName || 'NARIVA INTERIORS'}</h2>
                <p className="text-xs text-gray-800">Phone: {companyPhone}</p>
              </div>

              <hr className="border-t border-black my-4" />

              {/* INVOICE DETAILS */}
              <div className="flex justify-between items-start my-4 text-xs font-sans">
                <div>
                  <div className="font-bold text-black">Billed To:</div>
                  <div className="font-bold text-black text-sm mt-0.5">{billedTo || '—'}</div>
                </div>
                <div className="text-right">
                  <div>
                    <span className="font-bold">Invoice No:</span> {invoiceNo || '—'}
                  </div>
                  <div className="mt-0.5">
                    <span className="font-bold">Date:</span> {date || '—'}
                  </div>
                </div>
              </div>

              {/* ITEMS TABLE (Booktabs style) */}
              <table className="w-full my-6 text-xs border-collapse">
                <thead>
                  <tr className="border-t-2 border-b-2 border-black">
                    <th className="py-2 px-1 text-center font-bold w-12">S.No.</th>
                    <th className="py-2 px-2 text-left font-bold">Description of Goods</th>
                    <th className="py-2 px-1 text-center font-bold w-14">Qty</th>
                    <th className="py-2 px-2 text-right font-bold w-24">Rate (Rs.)</th>
                    <th className="py-2 px-2 text-right font-bold w-28">Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    const amt = calculateItemAmount(item.qty, item.rate);
                    return (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-2 px-1 text-center">{index + 1}</td>
                        <td className="py-2 px-2 text-left font-medium">{item.description || '—'}</td>
                        <td className="py-2 px-1 text-center">{item.qty}</td>
                        <td className="py-2 px-2 text-right">{formatCurrency(typeof item.rate === 'string' ? parseFloat(item.rate) || 0 : item.rate)}</td>
                        <td className="py-2 px-2 text-right font-semibold">{formatCurrency(amt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* TOTALS & TERMS SECTION */}
              <div className="flex justify-between items-start mt-6 pt-2">
                {/* Left: Terms */}
                <div className="w-1/2 pr-4">
                  <div className="font-bold mb-1">Terms & Conditions:</div>
                  <div className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">
                    {terms}
                  </div>
                </div>

                {/* Right: Subtotal, Discount & Total */}
                <div className="w-1/2 pl-4">
                  <div className="border-t-2 border-b-2 border-black py-2 space-y-1">
                    {discount > 0 && (
                      <>
                        <div className="flex justify-between text-xs">
                          <span>Subtotal (Rs.):</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-red-600">
                          <span>Discount ({discountType === 'percent' ? `${discount}%` : 'Rs.'}):</span>
                          <span>- {formatCurrency(discountAmount)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-sm font-bold pt-1">
                      <span>Total Amount (Rs.):</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIGNATURE FOOTER */}
            <div className="flex justify-between items-end mt-16 pt-8">
              <div className="w-1/2">
                {/* Left side blank for stamp/notes as per LaTeX spec */}
              </div>
              <div className="w-1/2 text-right">
                <div className="font-bold text-xs">For {companyName || 'NARIVA INTERIORS'}</div>
                <div className="h-12" /> {/* Spacing for authorized signature */}
                <div className="text-xs text-gray-800">Authorized Signatory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
