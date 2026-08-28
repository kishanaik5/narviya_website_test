import { siteConfig } from "@/config/site";

export async function downloadCardPdf(): Promise<boolean> {
  try {
    const { jsPDF } = await import("jspdf");

    // Standard business card size in mm: 88.9mm x 50.8mm (3.5" x 2")
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [88.9, 50.8],
      compress: true,
    });

    const w = 88.9;
    const h = 50.8;

    // ==========================================
    // PAGE 1: FRONT (Deep Obsidian Luxury Gold)
    // ==========================================
    // Background
    pdf.setFillColor(20, 19, 17); // #141311
    pdf.rect(0, 0, w, h, "F");

    // Gold border
    pdf.setDrawColor(196, 171, 124); // #c4ab7c
    pdf.setLineWidth(0.4);
    pdf.roundedRect(2.5, 2.5, w - 5, h - 5, 2, 2, "D");

    // Decorative subtle watermark circles
    pdf.setDrawColor(196, 171, 124);
    pdf.setLineWidth(0.15);
    pdf.circle(w - 2, 2, 12, "D");
    pdf.circle(2, h - 2, 10, "D");

    // Brand Name: NARVIA
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(253, 252, 249);
    pdf.text(siteConfig.brandShort || "NARVIA", 8, 14);

    // Studio Tag Badge
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6);
    pdf.setTextColor(196, 171, 124);
    pdf.text("STUDIO", 40, 10.5);

    // Subtitle
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(180, 175, 165);
    pdf.text("INTERIOR  •  EXTERIOR  •  MATERIALS", 8, 19);

    // Gold Accent Divider
    pdf.setDrawColor(196, 171, 124);
    pdf.setLineWidth(0.3);
    pdf.line(8, 23, 26, 23);

    // Tagline / Mission
    pdf.setFont("times", "italic");
    pdf.setFontSize(9);
    pdf.setTextColor(220, 215, 205);
    pdf.text(`"${siteConfig.tagline}"`, 8, 32);

    // Footer Info on Front
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6.5);
    pdf.setTextColor(196, 171, 124);
    pdf.text(siteConfig.domain.toUpperCase(), 8, 44);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.setTextColor(160, 155, 145);
    pdf.text(siteConfig.city, w - 8, 44, { align: "right" });

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

    // Header on Back: Brand & Visiting Card Label
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(28, 26, 23);
    pdf.text(siteConfig.brandShort || "NARVIA", 8, 10);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(5.5);
    pdf.setTextColor(154, 125, 70); // #9a7d46
    pdf.text("VISITING CARD", w - 8, 9.5, { align: "right" });

    // Divider
    pdf.setDrawColor(233, 228, 217);
    pdf.setLineWidth(0.2);
    pdf.line(8, 12.5, w - 8, 12.5);

    // Contact Details Rows
    const rows = [
      { label: "WEB", value: siteConfig.domain },
      { label: "EMAIL", value: siteConfig.email },
      { label: "PHONE", value: siteConfig.phone !== "Add phone number" ? siteConfig.phone : "+91 98765 43210" },
      { label: "STUDIO", value: siteConfig.address !== "Add studio address" ? siteConfig.address : `${siteConfig.city} — Karnataka` },
    ];

    let startY = 18;
    rows.forEach((row) => {
      // Label
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(6.5);
      pdf.setTextColor(154, 125, 70);
      pdf.text(row.label, 8, startY);

      // Value
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.setTextColor(40, 38, 35);
      pdf.text(row.value, 24, startY);

      startY += 6.5;
    });

    // Footer on Back
    pdf.setDrawColor(233, 228, 217);
    pdf.setLineWidth(0.2);
    pdf.line(8, 43, w - 8, 43);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(5.5);
    pdf.setTextColor(120, 115, 105);
    pdf.text("WOOD & GLASS ARCHITECTURAL STUDIO", 8, 46.5);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(5.5);
    pdf.setTextColor(154, 125, 70);
    pdf.text("OFFICIAL CREDENTIAL", w - 8, 46.5, { align: "right" });

    // Download PDF file as "narvia-card.pdf"
    pdf.save("narvia-card.pdf");
    return true;
  } catch (err) {
    console.error("PDF generation error:", err);
    return false;
  }
}
