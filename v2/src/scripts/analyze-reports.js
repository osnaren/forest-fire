/* eslint-disable */
const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'lhci_reports');
const files = fs.readdirSync(reportsDir).filter((f) => f.endsWith('.json') && f !== 'manifest.json');

files.forEach((file) => {
  const content = fs.readFileSync(path.join(reportsDir, file), 'utf8');
  const report = JSON.parse(content);
  const url = report.finalUrl;
  const score = report.categories.accessibility.score;

  console.log(`\nURL: ${url}`);
  console.log(`Accessibility Score: ${score}`);

  if (score < 1) {
    console.log('Issues:');
    const audits = report.audits;
    Object.keys(audits).forEach((key) => {
      const audit = audits[key];
      if (
        audit.score !== 1 &&
        audit.score !== null &&
        report.categories.accessibility.auditRefs.some((ref) => ref.id === key)
      ) {
        console.log(`- ${audit.title} (${audit.id})`);
        console.log(`  Description: ${audit.description}`);
        if (audit.details && audit.details.items) {
          audit.details.items.forEach((item) => {
            if (item.node && item.node.snippet) {
              console.log(`    Node: ${item.node.snippet}`);
            }
          });
        }
      }
    });
  } else {
    console.log('No accessibility issues found.');
  }
});
