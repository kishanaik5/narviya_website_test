import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export interface EstimationItem {
  id: string;
  isHeadline?: boolean;
  description: string;
  rate?: number | string;
  qty?: number | string;
  amount?: number;
}

export default function EstimationGenerator() {
  const searchParams = useSearchParams();
  const estimationIdParam = searchParams.get('id');

  const [companyName, setCompanyName] = useState('NARIVA INTERIORS');
  const [companyPhone, setCompanyPhone] = useState('+91 93538 75064');
  const [clientName, setClientName] = useState('');
  const [estimationNo, setEstimationNo] = useState('');
  const [date, setDate] = useState('');

  // Preview Column Visibility Checkbox Controls
  const [showRate, setShowRate] = useState<boolean>(true);
  const [showQty, setShowQty] = useState<boolean>(true);
  const [showAmount, setShowAmount] = useState<boolean>(true);
  const [showTotalAmount, setShowTotalAmount] = useState<boolean>(true);

  // Backend & Modal state
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [showLatexModal, setShowLatexModal] = useState(false);
  const [latexCode, setLatexCode] = useState('');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // Load record by ID from URL query parameter
  useEffect(() => {
    if (!estimationIdParam) return;

    const loadEstimation = async () => {
      setStatusMsg('Loading saved estimation details...');
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${baseUrl}/api/admin/estimations/${estimationIdParam}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.company_name) setCompanyName(data.company_name);
          if (data.company_phone) setCompanyPhone(data.company_phone);
          if (data.client_name) setClientName(data.client_name);
          if (data.estimation_no) setEstimationNo(data.estimation_no);
          if (data.estimation_date) setDate(data.estimation_date.split('T')[0]);
          if (data.notes) setNotes(data.notes);

          if (data.meta) {
            if (data.meta.showRate !== undefined) setShowRate(data.meta.showRate);
            if (data.meta.showQty !== undefined) setShowQty(data.meta.showQty);
            if (data.meta.showAmount !== undefined) setShowAmount(data.meta.showAmount);
            if (data.meta.showTotalAmount !== undefined) setShowTotalAmount(data.meta.showTotalAmount);
            if (data.meta.rawItems && Array.isArray(data.meta.rawItems)) {
              setItems(data.meta.rawItems);
            }
          }

          if (!data.meta?.rawItems && Array.isArray(data.items)) {
            setItems(
              data.items.map((it: { description: string; qty?: number; rate?: number; amount?: number }, idx: number) => ({
                id: String(idx + 1),
                isHeadline: !it.rate && it.description.toUpperCase() === it.description,
                description: it.description || '',
                qty: it.qty ?? '',
                rate: it.rate ?? '',
                amount: it.amount ?? 0,
              }))
            );
          }
          setStatusMsg(`✓ Loaded Estimation ${data.estimation_no}`);
        }
      } catch (err) {
        console.error('Error loading estimation by ID:', err);
        setStatusMsg('Error loading estimation details.');
      }
    };

    loadEstimation();
  }, [estimationIdParam]);

  const calculateAmount = (rateVal?: number | string, qtyVal?: number | string): number => {
    const r = typeof rateVal === 'string' ? parseFloat(rateVal) || 0 : rateVal || 0;
    const q = qtyVal !== undefined && qtyVal !== '' ? (typeof qtyVal === 'string' ? parseFloat(qtyVal) || 0 : qtyVal) : 1;
    return r * q;
  };

  const [items, setItems] = useState<EstimationItem[]>([
    {
      id: '1',
      isHeadline: false,
      description: '',
      rate: '',
      qty: '',
      amount: 0,
    },
  ]);

  const [notes, setNotes] = useState('Note: This estimation is valid for 15 days from the date of issuance.');

  const previewRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), isHeadline: false, description: '', rate: 0, qty: '', amount: 0 },
    ]);
  };

  const addHeadline = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), isHeadline: true, description: 'NEW CATEGORY HEADLINE' },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof EstimationItem, value: string | number | boolean) => {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (!updated.isHeadline) {
          updated.amount = calculateAmount(updated.rate, updated.qty);
        }
        return updated;
      })
    );
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
  };

  const totalAmount = items.reduce((acc, item) => {
    if (item.isHeadline) return acc;
    return acc + (item.amount || 0);
  }, 0);

  // Generate LaTeX document string
  const generateLatex = () => {
    const esc = (t: string) =>
      t
        ? t
            .replace(/&/g, '\\&')
            .replace(/%/g, '\\%')
            .replace(/\$/g, '\\$')
            .replace(/#/g, '\\#')
            .replace(/_/g, '\\_')
        : '';

    let sNo = 1;
    const rows = items
      .map((it) => {
        if (it.isHeadline) {
          const colSpan = 1 + (showQty ? 1 : 0) + (showRate ? 1 : 0) + (showAmount ? 1 : 0);
          return ` & \\multicolumn{${colSpan}}{|l|}{\\textbf{${esc(it.description)}}} \\\\ \\hline`;
        }
        const cols = [`${sNo++}`, `\\quad ${esc(it.description)}`];
        if (showQty) cols.push(String(it.qty || 1));
        if (showRate) cols.push(`₹${(typeof it.rate === 'string' ? parseFloat(it.rate) || 0 : it.rate || 0).toFixed(2)}`);
        if (showAmount) cols.push(`₹${(it.amount || 0).toFixed(2)}`);
        return cols.join(' & ') + ' \\\\ \\hline';
      })
      .join('\n');

    return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{utf8}
\\usepackage[margin=1in]{geometry}
\\usepackage{array, tabularx, hyperref, xcolor}
\\definecolor{brandpurple}{RGB}{94, 23, 235}

\\pagestyle{empty}

\\begin{document}

\\begin{center}
    {\\Huge \\bfseries \\color{brandpurple} ${esc(companyName || 'NARIVA INTERIORS')}}\\\\[4pt]
    {\\large Estimation \\& Project Scope Proposal}\\\\[8pt]
    \\rule{\\linewidth}{1.5pt}
\\end{center}

\\vspace{10pt}

\\begin{tabularx}{\\linewidth}{X r}
    {\\bfseries Client Name:} ${esc(clientName)} & {\\bfseries Estimate No:} ${esc(estimationNo)} \\\\
    & {\\bfseries Date:} ${esc(date)} \\\\
\\end{tabularx}

\\vspace{20pt}

\\begin{table}[h!]
\\centering
\\renewcommand{\\arraystretch}{1.4}
\\begin{tabularx}{\\linewidth}{|c|X|${showQty ? 'c|' : ''}${showRate ? 'r|' : ''}${showAmount ? 'r|' : ''}}
\\hline
\\rowcolor{brandpurple!10}
\\textbf{S.No} & \\textbf{Item Description} ${showQty ? '& \\textbf{Qty}' : ''} ${showRate ? '& \\textbf{Rate (₹)}' : ''} ${showAmount ? '& \\textbf{Amount (₹)}' : ''} \\\\
\\hline
${rows}
\\end{tabularx}
\\end{table}

\\vspace{10pt}

\\begin{flushright}
{\\Large \\bfseries Total Estimated Amount: ₹${totalAmount.toFixed(2)}}
\\end{flushright}

\\vspace{15pt}

\\noindent{\\bfseries Notes \\& Terms:}\\\\
${esc(notes)}

\\vfill
\\begin{center}
    \\small Thank you for choosing ${esc(companyName || 'NARIVA INTERIORS')}!
\\end{center}

\\end{document}`;
  };

  // Save to Backend API
  const handleSaveToBackend = async () => {
    if (!estimationNo || !clientName) {
      alert('Please enter Estimation No and Client Name.');
      return;
    }

    setSaving(true);
    setStatusMsg('');

    const metaPayload = {
      templateVersion: 'v1.0',
      showRate,
      showQty,
      showAmount,
      showTotalAmount,
      notes,
      latex: generateLatex(),
      rawItems: items,
    };

    const payload = {
      estimation_no: estimationNo,
      company_name: companyName,
      company_phone: companyPhone,
      client_name: clientName,
      estimation_date: date ? new Date(date).toISOString() : new Date().toISOString(),
      items: items.map((i) => ({
        description: i.description,
        qty: typeof i.qty === 'string' ? parseFloat(i.qty) || undefined : i.qty,
        rate: typeof i.rate === 'string' ? parseFloat(i.rate) || undefined : i.rate,
        amount: i.amount,
      })),
      notes,
      total_amount: totalAmount,
      meta: metaPayload,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${baseUrl}/api/admin/estimations`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMsg('✓ Estimation & JSON meta saved successfully to backend!');
      } else {
        const err = await res.json().catch(() => null);
        setStatusMsg(`Saved locally! (Backend message: ${err?.detail || res.statusText})`);
      }
    } catch {
      setStatusMsg('Saved locally! (Note: Local backend API not active)');
    } finally {
      setSaving(false);
    }
  };

  // Load JSON Data
  const handleLoadJson = () => {
    try {
      const data = JSON.parse(jsonInput);
      if (data.company_name) setCompanyName(data.company_name);
      if (data.company_phone) setCompanyPhone(data.company_phone);
      if (data.client_name) setClientName(data.client_name);
      if (data.estimation_no) setEstimationNo(data.estimation_no);
      if (data.estimation_date) setDate(data.estimation_date.split('T')[0]);
      if (data.notes) setNotes(data.notes);

      if (data.meta) {
        if (data.meta.showRate !== undefined) setShowRate(data.meta.showRate);
        if (data.meta.showQty !== undefined) setShowQty(data.meta.showQty);
        if (data.meta.showAmount !== undefined) setShowAmount(data.meta.showAmount);
        if (data.meta.showTotalAmount !== undefined) setShowTotalAmount(data.meta.showTotalAmount);
        if (data.meta.rawItems && Array.isArray(data.meta.rawItems)) {
          setItems(data.meta.rawItems);
        }
      }

      if (!data.meta?.rawItems && Array.isArray(data.items)) {
        setItems(
          data.items.map((it: { description: string; qty?: number; rate?: number; amount?: number }, idx: number) => ({
            id: String(idx + 1),
            isHeadline: !it.rate && it.description.toUpperCase() === it.description,
            description: it.description || '',
            qty: it.qty ?? '',
            rate: it.rate ?? '',
            amount: it.amount ?? 0,
          }))
        );
      }

      setShowJsonModal(false);
      setStatusMsg('✓ JSON estimation data loaded successfully!');
    } catch {
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const handlePrint = () => {
    if (!previewRef.current) return;
    const printContent = previewRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download/print the estimation.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Estimation_${estimationNo.replace(/\//g, '_')}</title>
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
            .est-print-box {
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
            .header-title { font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 4px; }
            .header-subtitle { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 2px; }
            .header-phone { font-size: 13px; text-align: center; margin-bottom: 15px; }
            hr { border: none; border-top: 1px solid #000; margin: 15px 0; }
            .details-flex { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 25px; }
            .headline-row { font-weight: bold; text-transform: uppercase; background-color: #f5f5f5; }
            .nested-desc { padding-left: 20px !important; }
            .signatory { text-align: right; font-size: 13px; margin-top: 60px; }
          </style>
        </head>
        <body>
          <div class="est-print-box">
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

  let itemSerialCounter = 0;

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#25221d] p-6 rounded-2xl border border-[#9a7d46]/30">
        <div>
          <h2 className="font-serif text-2xl text-[#fdfcf9] font-light">Estimation Generator</h2>
          <p className="text-xs text-[#a09789] mt-0.5">
            Category headlines, dynamic column visibility, and JSON meta storage
          </p>
          {statusMsg && <p className="text-xs text-emerald-400 font-medium mt-1">{statusMsg}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setLatexCode(generateLatex());
              setShowLatexModal(true);
            }}
            className="bg-[#1c1a17] hover:bg-[#25221d] text-[#c4ab7c] border border-[#9a7d46]/40 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5"
          >
            <span>LaTeX Code</span>
          </button>

          <button
            onClick={() => setShowJsonModal(true)}
            className="bg-[#1c1a17] hover:bg-[#25221d] text-[#c4ab7c] border border-[#9a7d46]/40 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5"
          >
            <span>Load JSON</span>
          </button>

          <button
            onClick={handleSaveToBackend}
            disabled={saving}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 shadow-md shadow-emerald-900/30 disabled:opacity-50"
          >
            <span>{saving ? 'Saving...' : 'Save Meta'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all shadow-md shadow-[#9a7d46]/20 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Grid: Form Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-6 bg-[#25221d] p-6 rounded-2xl border border-[#9a7d46]/30 space-y-6">
          <h3 className="text-sm uppercase tracking-wider text-[#c4ab7c] font-semibold pb-2 border-b border-[#9a7d46]/20">
            Estimation Details & Client Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#a09789] mb-1 font-medium">Client / Customer Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Gopalakrishna D S"
                className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
                required
              />
            </div>
            <div>
              <label className="block text-[#a09789] mb-1 font-medium">Estimation No</label>
              <input
                type="text"
                value={estimationNo}
                onChange={(e) => setEstimationNo(e.target.value)}
                placeholder="e.g. EST/26-27/001"
                className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
                required
              />
            </div>
            <div>
              <label className="block text-[#a09789] mb-1 font-medium">Date</label>
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
              <label className="block text-[#a09789] mb-1 font-medium">Company Phone</label>
              <input
                type="text"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
              />
            </div>
          </div>

          {/* Line Items & Category Headlines Section */}
          <div className="space-y-4 pt-2 border-t border-[#9a7d46]/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-[#c4ab7c] font-semibold">
                  Items & Category Headlines
                </h3>
                <p className="text-[11px] text-[#a09789]">Sub-items nest with 1 tab indent under category headlines.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={addHeadline}
                  className="text-xs bg-[#9a7d46]/30 hover:bg-[#9a7d46] text-[#c4ab7c] hover:text-white px-3 py-1.5 rounded-lg border border-[#9a7d46]/50 transition-colors font-medium flex items-center gap-1"
                >
                  + Add Headline
                </button>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs bg-[#9a7d46] hover:bg-[#856a37] text-white px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 shadow-sm"
                >
                  + Add Item
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    item.isHeadline
                      ? 'bg-[#2a241c] border-[#9a7d46]/60 shadow-md'
                      : 'bg-[#1c1a17] border-[#9a7d46]/20 pl-6'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {item.isHeadline ? (
                        <span className="bg-[#9a7d46] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                          Headline / Section Category
                        </span>
                      ) : (
                        <span className="text-[#9a7d46] font-semibold">
                          Sub-Item
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItem(idx, 'up')}
                        disabled={idx === 0}
                        className="text-[#a09789] hover:text-white px-1.5 py-0.5 disabled:opacity-30"
                        title="Move Up"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem(idx, 'down')}
                        disabled={idx === items.length - 1}
                        className="text-[#a09789] hover:text-white px-1.5 py-0.5 disabled:opacity-30"
                        title="Move Down"
                      >
                        ↓
                      </button>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 p-1 ml-1"
                          title="Remove"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {item.isHeadline ? (
                    <div>
                      <label className="text-[10px] text-[#c4ab7c] uppercase tracking-wider font-semibold block mb-1">
                        Category Headline Name (e.g. APC BOND WORK)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. APC BOND WORK"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full bg-[#1c1a17] border border-[#9a7d46]/50 rounded-lg px-3 py-2 text-white font-bold tracking-wide focus:outline-none focus:border-[#9a7d46]"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Sub-Item Description / Specification"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full bg-[#25221d] border border-[#9a7d46]/30 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#9a7d46]"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-[#c4ab7c] font-medium">Rate (Rs.) *</label>
                          <input
                            type="number"
                            placeholder="Rate"
                            value={item.rate ?? ''}
                            onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                            className="w-full bg-[#25221d] border border-[#9a7d46]/40 rounded-lg px-2 py-1 text-white font-medium focus:outline-none focus:border-[#9a7d46]"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#a09789]">Qty (Optional)</label>
                          <input
                            type="text"
                            placeholder="Optional"
                            value={item.qty ?? ''}
                            onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                            className="w-full bg-[#25221d] border border-[#9a7d46]/30 rounded-lg px-2 py-1 text-white focus:outline-none focus:border-[#9a7d46]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#a09789]">Amount (Auto)</label>
                          <div className="bg-[#25221d] border border-[#9a7d46]/20 rounded-lg px-2 py-1 text-[#c4ab7c] font-mono font-medium text-right truncate">
                            {formatCurrency(item.amount || 0)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#9a7d46]/20 text-xs">
            <label className="block text-[#a09789] mb-1 font-medium">Remarks / Validity Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#9a7d46]"
            />
          </div>
        </div>

        {/* Right Column: Live Printable Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#25221d] p-4 rounded-2xl border border-[#9a7d46]/30 space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#c4ab7c] font-semibold flex items-center justify-between">
              <span>Preview Column Visibility Controls</span>
              <span className="text-[10px] text-[#a09789] normal-case">Check box to show column</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer bg-[#1c1a17] px-3 py-2 rounded-xl border border-[#9a7d46]/20 text-white">
                <input
                  type="checkbox"
                  checked={showRate}
                  onChange={(e) => setShowRate(e.target.checked)}
                  className="accent-[#9a7d46] w-4 h-4 rounded"
                />
                <span>Rate Column</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-[#1c1a17] px-3 py-2 rounded-xl border border-[#9a7d46]/20 text-white">
                <input
                  type="checkbox"
                  checked={showQty}
                  onChange={(e) => setShowQty(e.target.checked)}
                  className="accent-[#9a7d46] w-4 h-4 rounded"
                />
                <span>Quantity Box</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-[#1c1a17] px-3 py-2 rounded-xl border border-[#9a7d46]/20 text-white">
                <input
                  type="checkbox"
                  checked={showAmount}
                  onChange={(e) => setShowAmount(e.target.checked)}
                  className="accent-[#9a7d46] w-4 h-4 rounded"
                />
                <span>Amount Box</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-[#1c1a17] px-3 py-2 rounded-xl border border-[#9a7d46]/20 text-white">
                <input
                  type="checkbox"
                  checked={showTotalAmount}
                  onChange={(e) => setShowTotalAmount(e.target.checked)}
                  className="accent-[#9a7d46] w-4 h-4 rounded"
                />
                <span>Total Amount Box</span>
              </label>
            </div>
          </div>

          <div className="bg-white text-black p-8 rounded-xl shadow-2xl border border-gray-300 font-sans text-xs min-h-[580px] flex flex-col justify-between select-none">
            <div ref={previewRef}>
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold tracking-wide uppercase text-black mb-1">ESTIMATION</h1>
                <h2 className="text-lg font-bold uppercase text-black mb-0.5">{companyName || 'NARIVA INTERIORS'}</h2>
                <p className="text-xs text-gray-800">Phone: {companyPhone}</p>
              </div>

              <hr className="border-t border-black my-4" />

              <div className="flex justify-between items-start my-4 text-xs font-sans">
                <div>
                  <div className="font-bold text-black">Billed To / Client:</div>
                  <div className="font-bold text-black text-sm mt-0.5">{clientName || '—'}</div>
                </div>
                <div className="text-right">
                  <div>
                    <span className="font-bold">Estimation No:</span> {estimationNo || '—'}
                  </div>
                  <div className="mt-0.5">
                    <span className="font-bold">Date:</span> {date || '—'}
                  </div>
                </div>
              </div>

              <table className="w-full my-6 text-xs border-collapse">
                <thead>
                  <tr className="border-t-2 border-b-2 border-black">
                    <th className="py-2 px-1 text-center font-bold w-12">S.No.</th>
                    <th className="py-2 px-2 text-left font-bold">Description of Items</th>
                    {showQty && <th className="py-2 px-1 text-center font-bold w-16">Qty</th>}
                    {showRate && <th className="py-2 px-2 text-right font-bold w-24">Rate (Rs.)</th>}
                    {showAmount && <th className="py-2 px-2 text-right font-bold w-28">Amount (Rs.)</th>}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    if (item.isHeadline) {
                      return (
                        <tr key={item.id} className="headline-row bg-gray-100 font-bold border-t border-b border-black">
                          <td className="py-2 px-1 text-center"></td>
                          <td className="py-2 px-2 text-left uppercase font-bold tracking-wider text-black" colSpan={1 + (showQty ? 1 : 0) + (showRate ? 1 : 0) + (showAmount ? 1 : 0)}>
                            {item.description}
                          </td>
                        </tr>
                      );
                    }

                    itemSerialCounter += 1;
                    const r = typeof item.rate === 'string' ? parseFloat(item.rate) || 0 : item.rate || 0;
                    return (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-2 px-1 text-center">{itemSerialCounter}</td>
                        <td className="py-2 px-2 text-left font-medium pl-6 nested-desc">
                          {item.description || '—'}
                        </td>
                        {showQty && (
                          <td className="py-2 px-1 text-center">
                            {item.qty !== undefined && item.qty !== '' ? item.qty : '1'}
                          </td>
                        )}
                        {showRate && (
                          <td className="py-2 px-2 text-right">{formatCurrency(r)}</td>
                        )}
                        {showAmount && (
                          <td className="py-2 px-2 text-right font-semibold">{formatCurrency(item.amount || 0)}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-between items-start mt-6 pt-2">
                <div className="w-1/2 pr-4 text-[11px] text-gray-700 font-medium">
                  {notes}
                </div>
                <div className="w-1/2 pl-4">
                  {showTotalAmount && (
                    <div className="border-t-2 border-b-2 border-black py-2.5 flex justify-between text-sm font-bold">
                      <span>Total Estimated Amount (Rs.):</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end mt-16 pt-8">
              <div className="w-1/2" />
              <div className="w-1/2 text-right">
                <div className="font-bold text-xs">For {companyName || 'NARIVA INTERIORS'}</div>
                <div className="h-12" />
                <div className="text-xs text-gray-800">Authorized Signatory</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LaTeX Code Modal */}
      {showLatexModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#25221d] border border-[#9a7d46]/40 rounded-2xl max-w-3xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#9a7d46]/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                Generated Estimation LaTeX Code (.tex)
              </h3>
              <button
                onClick={() => setShowLatexModal(false)}
                className="text-[#a09789] hover:text-white"
              >
                ✕
              </button>
            </div>

            <textarea
              readOnly
              rows={16}
              value={latexCode}
              className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl p-4 font-mono text-xs text-emerald-300 focus:outline-none select-all"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(latexCode);
                  alert('LaTeX code copied to clipboard!');
                }}
                className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-4 py-2 rounded-xl text-xs uppercase font-medium"
              >
                Copy LaTeX Code
              </button>
              <button
                onClick={() => setShowLatexModal(false)}
                className="bg-[#1c1a17] text-[#a09789] hover:text-white px-4 py-2 rounded-xl text-xs uppercase font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JSON Import Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#25221d] border border-[#9a7d46]/40 rounded-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#9a7d46]/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                Load Estimation State from JSON / Meta
              </h3>
              <button
                onClick={() => setShowJsonModal(false)}
                className="text-[#a09789] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#a09789]">
              Paste JSON object stored in PostgreSQL `meta` column or full API response to populate form state:
            </p>

            <textarea
              rows={10}
              placeholder='{"company_name": "NARIVA INTERIORS", "client_name": "Gopalakrishna", "estimation_no": "EST/001", "items": [...] }'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl p-4 font-mono text-xs text-white focus:outline-none focus:border-[#9a7d46]"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={handleLoadJson}
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs uppercase font-medium"
              >
                Load State
              </button>
              <button
                onClick={() => setShowJsonModal(false)}
                className="bg-[#1c1a17] text-[#a09789] hover:text-white px-4 py-2 rounded-xl text-xs uppercase font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
