import type { jsPDF as JsPdfType } from "jspdf"

export const generatePDFReport = async (auditData: any, contractCode: string) => {
  const { jsPDF } = (await import("jspdf")) as { jsPDF: typeof JsPdfType }

  const doc = new jsPDF()

  const sections = Array.isArray(auditData) ? auditData : Object.values(auditData).flat()
  const auditReport = sections.find((section: any) => section.section === "Audit Report")
  const suggestions = sections.find((section: any) => section.section === "Suggestions for Improvement")
  const metrics = sections.find((section: any) => section.section === "Metric Scores")

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  let yPosition = 20
  const pageHeight = doc.internal.pageSize.height
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  const lineHeight = 6

  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
  }

  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10, lineSpacing = 6) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text || "", maxWidth)

    lines.forEach((line: string, index: number) => {
      checkNewPage(lineSpacing + 5)
      doc.text(line || "", x, y + index * lineSpacing)
    })

    return y + lines.length * lineSpacing
  }

  const addSectionHeader = (title: string, fontSize = 16) => {
    checkNewPage(25)
    doc.setFontSize(fontSize)
    doc.setFont(undefined, "bold")
    doc.setFillColor(16, 185, 129)
    doc.rect(margin, yPosition - 5, contentWidth, 12, "F")
    doc.setTextColor(255, 255, 255)
    doc.text(title || "", margin + 5, yPosition + 3)
    doc.setTextColor(0, 0, 0)
    yPosition += 20
  }

  const addMetric = (metric: any) => {
    checkNewPage(30)
    const score: number = metric?.score ?? 0
    const status = score >= 8 ? "EXCELLENT" : score >= 6 ? "GOOD" : score >= 4 ? "NEEDS IMPROVEMENT" : "CRITICAL"

    let statusColor: [number, number, number] = [0, 0, 0]
    if (status === "EXCELLENT") statusColor = [16, 185, 129]
    else if (status === "GOOD") statusColor = [59, 130, 246]
    else if (status === "NEEDS IMPROVEMENT") statusColor = [245, 158, 11]
    else if (status === "CRITICAL") statusColor = [239, 68, 68]

    doc.setFontSize(12)
    doc.setFont(undefined, "bold")
    doc.text(`${metric?.metric || "Unknown Metric"}: ${score}/10`, margin, yPosition)
    doc.setTextColor(...statusColor)
    doc.text(`(${status})`, margin + 120, yPosition)
    doc.setTextColor(0, 0, 0)
    yPosition += 8

    if (metric?.description) {
      doc.setFontSize(10)
      doc.setFont(undefined, "normal")
      doc.setTextColor(60, 60, 60)
      yPosition = addWrappedText(`• ${metric.description}`, margin + 10, yPosition, contentWidth - 20, 10, 5)
      doc.setTextColor(0, 0, 0)
    }

    yPosition += 8
  }

  const parseSuggestions = (suggestionsData: any): string[] => {
    if (!suggestionsData) return []

    const text = typeof suggestionsData === "string" ? suggestionsData : JSON.stringify(suggestionsData)

    try {
      const parsed = JSON.parse(text)
      if (Array.isArray(parsed)) {
        return parsed.map((item: string) => (item || "").replace(/^\$\$\d+\$\$\s*/, "").trim())
      }
    } catch {
      // continue
    }

    const numberedMatches = text.match(/\$\$\d+\$\$[^(]*/g)
    if (numberedMatches && numberedMatches.length > 1) {
      return numberedMatches.map((match: string) => (match || "").replace(/^\$\$\d+\$\$\s*/, "").trim())
    }

    return text
      .split(/\.\s+/)
      .filter((s: string) => s.trim())
      .map((s: string) => s.trim())
  }

  doc.setFillColor(39, 39, 42)
  doc.rect(0, 0, pageWidth, 40, "F")
  doc.setFontSize(24)
  doc.setFont(undefined, "bold")
  doc.setTextColor(255, 255, 255)
  doc.text("AUDITRONIX", margin, 25)
  doc.setFontSize(14)
  doc.setFont(undefined, "normal")
  doc.text("Smart Contract Audit Report", margin, 35)

  doc.setTextColor(0, 0, 0)
  yPosition = 55
  doc.setFontSize(11)
  doc.setFont(undefined, "normal")
  doc.text(`Generated: ${currentDate}`, margin, yPosition)
  yPosition += 6
  doc.text("Auditor: Auditronix AI (LLaMA-3-70B)", margin, yPosition)
  yPosition += 15

  addSectionHeader("EXECUTIVE SUMMARY", 14)
  const summaryText =
    "This report presents a comprehensive security audit of the submitted smart contract. The analysis covers security vulnerabilities, gas optimization opportunities, code quality, and provides actionable recommendations for improvement."
  yPosition = addWrappedText(summaryText, margin, yPosition, contentWidth, 10, 6)
  yPosition += 15

  if (metrics?.details && Array.isArray(metrics.details)) {
    addSectionHeader("SECURITY METRICS", 14)
    metrics.details.forEach((metric: any) => addMetric(metric))
    yPosition += 10
  }

  if (auditReport?.details) {
    addSectionHeader("DETAILED AUDIT FINDINGS", 14)
    const reportText = typeof auditReport.details === "string"
      ? auditReport.details
      : JSON.stringify(auditReport.details ?? "")
    const findings = reportText.split(/\.\s+/).filter((s: string) => s && s.trim())

    findings.forEach((finding: string, index: number) => {
      if (finding.trim()) {
        checkNewPage(20)
        doc.setFontSize(11)
        doc.setFont(undefined, "bold")
        doc.setTextColor(16, 185, 129)
        doc.text(`${index + 1}.`, margin, yPosition)

        doc.setFont(undefined, "normal")
        doc.setTextColor(0, 0, 0)
        yPosition = addWrappedText(`${finding.trim()}.`, margin + 15, yPosition, contentWidth - 25, 10, 6)
        yPosition += 5
      }
    })
    yPosition += 10
  }

  if (suggestions?.details) {
    addSectionHeader("RECOMMENDATIONS FOR IMPROVEMENT", 14)
    const suggestionsList = parseSuggestions(suggestions.details)

    suggestionsList.forEach((suggestion: string, index: number) => {
      if (suggestion.trim()) {
        checkNewPage(25)
        doc.setFillColor(16, 185, 129)
        doc.circle(margin + 5, yPosition - 2, 4, "F")

        doc.setFontSize(10)
        doc.setFont(undefined, "bold")
        doc.setTextColor(255, 255, 255)
        doc.text(`${index + 1}`, margin + 3, yPosition + 1)

        doc.setFont(undefined, "normal")
        doc.setTextColor(0, 0, 0)
        yPosition = addWrappedText(suggestion, margin + 15, yPosition, contentWidth - 25, 10, 6)
        yPosition += 8
      }
    })
    yPosition += 10
  }

  if (contractCode) {
    checkNewPage(30)
    addSectionHeader("ANALYZED CONTRACT CODE", 14)

    doc.setFontSize(8)
    doc.setFont("courier", "normal")
    doc.setTextColor(60, 60, 60)

    const codeLines = contractCode.split("\n")
    codeLines.forEach((line: string, index: number) => {
      checkNewPage(4)
      doc.text(`${(index + 1).toString().padStart(3, " ")} | ${line}`, margin, yPosition)
      yPosition += 4
    })
  }

  doc.addPage()
  yPosition = margin
  addSectionHeader("DISCLAIMER", 14)

  const disclaimerText =
    "This audit report is generated by Auditronix AI and should be used as a starting point for security analysis. It is recommended to have critical smart contracts reviewed by multiple security experts and undergo comprehensive testing before deployment."

  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  yPosition = addWrappedText(disclaimerText, margin, yPosition, contentWidth, 10, 6)
  yPosition += 20

  doc.setFillColor(39, 39, 42)
  doc.rect(margin, yPosition, contentWidth, 25, "F")
  doc.setFontSize(12)
  doc.setFont(undefined, "bold")
  doc.setTextColor(255, 255, 255)
  doc.text("Report generated by Auditronix AI", margin + 10, yPosition + 10)
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text("Powered by LLaMA-3-70B", margin + 10, yPosition + 20)

  doc.save(`auditronix-report-${new Date().toISOString().split("T")[0]}.pdf`)
}
export const generatePDFReportFromData = async (auditData: any, contractCode: string) => {
  try {
    await generatePDFReport(auditData, contractCode)
  } catch (error) {
    console.error("Error generating PDF report:", error)
    throw new Error("Failed to generate PDF report")
  }
}