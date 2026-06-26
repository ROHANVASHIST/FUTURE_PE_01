import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Ensure the target directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Frontend_Battle_2026_Guidelines.pdf');

function createGuidelinesPDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    bufferPages: true
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Colors
  const primaryColor = '#0052CC'; // Deep Aura Blue
  const secondaryColor = '#1A1C1E'; // Deep Slate
  const accentColor = '#5D3FD3'; // Purple Accent
  const lightBgColor = '#F2F4F8'; // Soft grey
  const darkGrey = '#4A4A4A';
  const lightGrey = '#999999';

  // Helper: Draw Header Block
  function drawHeader(titleText: string, subtitleText: string) {
    // Draw background block
    doc.rect(0, 0, doc.page.width, 130).fill(primaryColor);
    
    // Draw accent bar
    doc.rect(0, 130, doc.page.width, 5).fill(accentColor);

    // Text on header
    doc.fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .fontSize(22)
       .text(titleText.toUpperCase(), 50, 40, { characterSpacing: 1.5 });

    doc.fillColor('#E0E0E0')
       .font('Helvetica')
       .fontSize(11)
       .text(subtitleText, 50, 75, { characterSpacing: 1 });
       
    doc.fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .fontSize(9)
       .text('AURA INTELLIGENCE SYSTEMS • INITIATIVE', 50, 100, { characterSpacing: 2 });
  }

  // --- PAGE 1: TITLE & CORE REQS ---
  drawHeader('Build The Next Big UI', 'Frontend Battle 2026 — Official Competition Guidelines');

  let y = 160;

  // Overview
  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('1. COMPETITION OVERVIEW', 50, y);
  
  y += 20;
  
  doc.fillColor(darkGrey)
     .font('Helvetica')
     .fontSize(10)
     .lineGap(4)
     .text('Frontend Battle 2026 is a premier single-round design and development challenge where participants showcase creativity, problem-solving skills, and frontend development expertise. Teams must submit a comprehensive presentation highlighting their project idea, user experience, interface design, and technical implementation approach.', 50, y, { width: 495 });

  y += 55;

  // Format & Requirements Box
  doc.rect(50, y, 495, 85).fill(lightBgColor);
  doc.rect(50, y, 4, 85).fill(primaryColor);

  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text('SUBMISSION FORMAT & ENTRY RULES', 70, y + 12);

  doc.fillColor(darkGrey)
     .font('Helvetica')
     .fontSize(9.5)
     .lineGap(3)
     .text('• FORMAT: One cohesive PDF presentation (2 to 6 pages maximum).\n• PARTICIPATION: Open to both individual participants and collaborative teams.\n• FOCUS: High-priority frontend-focused solutions. Full backend implementations are optional.', 70, y + 28);

  y += 105;

  // Domains of application
  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('SUPPORTED DOMAINS & TRACKS', 50, y);
  
  y += 15;
  doc.fillColor(darkGrey)
     .font('Helvetica')
     .fontSize(9.5)
     .text('Participants have total autonomy to choose any domain or real-world challenge, including:', 50, y);

  y += 15;
  const tracks = ['Artificial Intelligence (AI)', 'Healthcare & MedTech', 'Financial Technology', 'Productivity Systems', 'SaaS Platforms', 'E-Commerce & Retail'];
  const tracksCol2 = ['Smart Cities & IoT', 'Sustainable Energy', 'Web3 & Decentralization', 'Creative Tools', 'AR/VR Interactivity', 'DevTools & Automation'];
  
  tracks.forEach((track, i) => {
    doc.fillColor(primaryColor).font('Helvetica-Bold').text('▪ ', 60, y + i * 14);
    doc.fillColor(darkGrey).font('Helvetica').text(track, 72, y + i * 14);
  });
  
  tracksCol2.forEach((track, i) => {
    doc.fillColor(primaryColor).font('Helvetica-Bold').text('▪ ', 300, y + i * 14);
    doc.fillColor(darkGrey).font('Helvetica').text(track, 312, y + i * 14);
  });

  y += 100;

  // REQUIRED SECTIONS HEADER
  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('2. REQUIRED SECTIONS FOR SUBMISSION', 50, y);

  y += 20;
  doc.fillColor(darkGrey)
     .font('Helvetica')
     .fontSize(9.5)
     .text('Your submission PDF is strictly required to contain the following structured sections:', 50, y);

  y += 18;

  // Table header
  doc.rect(50, y, 495, 20).fill(secondaryColor);
  doc.fillColor('#FFFFFF')
     .font('Helvetica-Bold')
     .fontSize(9)
     .text('SECTION', 60, y + 6)
     .text('CORE REQUIREMENT & DESCRIPTION', 180, y + 6);

  y += 20;

  const sections = [
    { name: '1. Problem Statement', desc: 'Clearly define the real-world problem, target audience, and challenges.' },
    { name: '2. Proposed Solution', desc: 'Describe key features, user flow, and visual design integration.' },
    { name: '3. Tech Stack Used', desc: 'Specify frontend frameworks, CSS libraries, and design tools used.' },
    { name: '4. Live Prototype', desc: 'Include interactive links (e.g., GitHub repo, Vercel, or live web URL).' },
    { name: '5. Expected Impact', desc: 'Detail the direct benefits, social value, and business application.' },
    { name: '6. Future Scope', desc: 'Highlight scalability opportunities, future integrations, and upcoming features.' }
  ];

  sections.forEach((sect, idx) => {
    // Zebra striping
    if (idx % 2 === 0) {
      doc.rect(50, y, 495, 24).fill('#FAFAFA');
    } else {
      doc.rect(50, y, 495, 24).fill(lightBgColor);
    }
    
    doc.fillColor(secondaryColor)
       .font('Helvetica-Bold')
       .fontSize(9)
       .text(sect.name, 60, y + 8);
       
    doc.fillColor(darkGrey)
       .font('Helvetica')
       .fontSize(8.5)
       .text(sect.desc, 180, y + 8);
       
    y += 24;
  });

  // --- ADD SECOND PAGE ---
  doc.addPage();
  
  drawHeader('Build The Next Big UI', 'Frontend Battle 2026 — Official Competition Guidelines');

  y = 160;

  // Judging Criteria
  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('3. JUDGING & EVALUATION PROTOCOL', 50, y);

  y += 20;
  
  doc.fillColor(darkGrey)
     .font('Helvetica')
     .fontSize(10)
     .text('Submissions will be formally evaluated by an expert jury pool on the following five critical vectors:', 50, y);

  y += 20;

  const criteria = [
    { title: 'UI/UX Design Quality', desc: 'Visual appeal, color theory, spacing harmony, layout consistency, accessibility (WCAG), and responsive ergonomics.' },
    { title: 'Innovation & Creativity', desc: 'Originality of concept, unique design elements, and pioneering approaches to interface interaction.' },
    { title: 'Problem-Solving Ability', desc: 'Relevance of the chosen real-world problem and how effectively the frontend solution addresses user paintpoints.' },
    { title: 'Prototype Quality', desc: 'Clarity, completeness, interactive fidelity, and overall presentation of the compiled design system.' },
    { title: 'Impact & Feasibility', desc: 'Potential real-world scalability, business utility, social value, and ease of engineering implementation.' }
  ];

  criteria.forEach((crit, idx) => {
    doc.rect(50, y, 495, 45).fill(lightBgColor);
    doc.rect(50, y, 4, 45).fill(accentColor);

    doc.fillColor(secondaryColor)
       .font('Helvetica-Bold')
       .fontSize(9.5)
       .text(crit.title.toUpperCase(), 70, y + 10);

    doc.fillColor(darkGrey)
       .font('Helvetica')
       .fontSize(8.5)
       .lineGap(2)
       .text(crit.desc, 70, y + 22, { width: 450 });

    y += 55;
  });

  y += 10;

  // Submission Guidelines
  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('4. SUBMISSION INSTRUCTIONS & ETHICS', 50, y);

  y += 20;

  doc.fillColor(darkGrey)
     .font('Helvetica')
     .fontSize(9.5)
     .lineGap(4)
     .text('• Figma designs, wireframes, mockups, and screenshots of developed frontends are fully accepted.\n• AI-assisted design, copywriting, and development tools are permitted, provided they support original concept scaling.\n• Plagiarism, copying, or uncredited reproduction of existing templates will lead to immediate disqualification.\n• All submitted assets must be original works compiled by the participating individual or team.', 50, y, { width: 495 });

  y += 75;

  // Deliverables Box
  doc.rect(50, y, 495, 75).fill('#1A1C1E');
  
  doc.fillColor('#FFFFFF')
     .font('Helvetica-Bold')
     .fontSize(10)
     .text('MANDATORY DELIVERABLE SUMMARY', 70, y + 15);

  doc.fillColor('#E0E0E0')
     .font('Helvetica')
     .fontSize(9)
     .lineGap(3)
     .text('ONE PDF PRESENTATION FILE (2 TO 6 PAGES MAXIMUM).\nThe focus is strictly on Design Thinking, User Experience, Frontend Development, Creativity, and Innovation. Complete server backend integrations are optional.', 70, y + 30, { width: 450 });

  // Add page numbers on all pages
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);
    
    // Bottom border line
    doc.rect(50, doc.page.height - 40, doc.page.width - 100, 1).fill('#DDE1E6');
    
    // Page footer text
    doc.fillColor(lightGrey)
       .font('Helvetica-Bold')
       .fontSize(8)
       .text('AURA INTELLIGENCE SYSTEMS • FRONTEND BATTLE 2026', 50, doc.page.height - 30)
       .text(`PAGE ${i + 1} OF ${range.count}`, doc.page.width - 120, doc.page.height - 30, { align: 'right' });
  }

  doc.end();

  writeStream.on('finish', () => {
    console.log('Guidelines PDF created successfully at:', outputPath);
  });
}

createGuidelinesPDF();
