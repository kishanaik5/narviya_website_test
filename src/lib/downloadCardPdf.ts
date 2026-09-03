import { siteConfig } from "@/config/site";

export async function downloadCardPdf(): Promise<boolean> {
  try {
    let jsPDF;
    try {
      // @ts-ignore
      const module = await import(/* webpackIgnore: true */ "jspdf");
      jsPDF = module.jsPDF || module.default;
    } catch {
      console.warn("jsPDF module not dynamically loaded");
      return false;
    }

    // Standard business card dimensions in mm: 88.9mm x 50.8mm (3.5" x 2")
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [88.9, 50.8],
      compress: true,
    });

    const w = 88.9;
    const h = 50.8;

    // ==========================================
    // PAGE 1: FRONT (Deep Obsidian & Brushed Gold)
    // ==========================================
    pdf.setFillColor(20, 19, 17); // #141311
    pdf.rect(0, 0, w, h, "F");

    // Gold border
    pdf.setDrawColor(196, 171, 124); // #c4ab7c
    pdf.setLineWidth(0.4);
    pdf.roundedRect(2.5, 2.5, w - 5, h - 5, 2, 2, "D");

    // Circular accents
    pdf.setDrawColor(196, 171, 124);
    pdf.setLineWidth(0.15);
    pdf.circle(w - 2, 2, 12, "D");
    pdf.circle(2, h - 2, 10, "D");

    // Brand Name: NARVIA
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(253, 252, 249);
    pdf.text(siteConfig.brandShort || "NARVIA", 8, 14);

    // Subtitle
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(196, 171, 124);
    pdf.text("INTERIOR  •  EXTERIOR  •  MATERIALS", 8, 19);

    // Accent line
    pdf.setDrawColor(196, 171, 124);
    pdf.setLineWidth(0.3);
    pdf.line(8, 23, 28, 23);

    // Tagline: Where Vision Meets Space, Built Beautifully
    pdf.setFont("times", "italic");
    pdf.setFontSize(9);
    pdf.setTextColor(220, 215, 205);
    pdf.text(`"${siteConfig.tagline}"`, 8, 32);

    // Footer on Front
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.setTextColor(196, 171, 124);
    pdf.text(siteConfig.domain.toUpperCase(), 8, 44);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(196, 171, 124);
    pdf.text("ARCHITECTURAL LIVING", w - 8, 44, { align: "right" });

    // ==========================================
    // PAGE 2: BACK (Warm Linen / Ivory Contact Card)
    // ==========================================
    pdf.addPage([88.9, 50.8], "landscape");

    // Background
    pdf.setFillColor(253, 252, 249); // #fdfcf9
    pdf.rect(0, 0, w, h, "F");

    // Border
    pdf.setDrawColor(233, 228, 217); // #e9e4d9
    pdf.setLineWidth(0.4);
    pdf.roundedRect(2.5, 2.5, w - 5, h - 5, 2, 2, "D");

    // Header on Back: Brand
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(28, 26, 23);
    pdf.text(siteConfig.brandShort || "NARVIA", 8, 11);

    // Header divider
    pdf.setDrawColor(233, 228, 217);
    pdf.setLineWidth(0.25);
    pdf.line(8, 14, w - 8, 14);

    // 1. Phone + WhatsApp Combined Row
    let startY = 21;

    // Phone Circle
    pdf.setFillColor(245, 240, 230);
    pdf.setDrawColor(154, 125, 70);
    pdf.setLineWidth(0.25);
    pdf.circle(9.5, startY - 1, 1.8, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(4.5);
    pdf.setTextColor(154, 125, 70);
    pdf.text("P", 9.5, startY - 0.3, { align: "center" });

    // WhatsApp Circle
    pdf.circle(13.5, startY - 1, 1.8, "FD");
    pdf.text("W", 13.5, startY - 0.3, { align: "center" });

    // Value
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 28, 25);
    pdf.text(siteConfig.phone, 18, startY);

    // 2. Email Row
    startY += 7.5;
    pdf.circle(11.5, startY - 1, 2, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(5);
    pdf.text("@", 11.5, startY - 0.3, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 28, 25);
    pdf.text(siteConfig.email, 18, startY);

    // 3. Web Row
    startY += 7.5;
    pdf.circle(11.5, startY - 1, 2, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6);
    pdf.text("•", 11.5, startY - 0.3, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 28, 25);
    pdf.text(siteConfig.domain, 18, startY);

    // Footer on Back
    pdf.setDrawColor(233, 228, 217);
    pdf.setLineWidth(0.2);
    pdf.line(8, 43, w - 8, 43);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(5.5);
    pdf.setTextColor(120, 115, 105);
    pdf.text("LUXURY ARCHITECTURAL LIVING", 8, 46.5);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(5.5);
    pdf.setTextColor(154, 125, 70);
    pdf.text("VERIFIED", w - 8, 46.5, { align: "right" });

    // Save as narvia-card.pdf
    pdf.save("narvia-card.pdf");
    return true;
  } catch (err) {
    console.error("PDF generation error:", err);
    return false;
  }
}
