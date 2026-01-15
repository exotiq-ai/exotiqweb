// Email templates for investor sequence

export const getImmediateEmail = (investorName: string, investorEmail: string) => ({
    subject: 'Your Exotiq Investment Materials',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #000000 0%, #1B1B1B 100%);
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      color: #6BB8E5;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: #6BB8E5;
      color: #000000 !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 10px 5px;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .highlight {
      background: #f5f5f5;
      padding: 20px;
      border-left: 4px solid #6BB8E5;
      margin: 20px 0;
    }
    .footer {
      background: #f9f9f9;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-radius: 0 0 8px 8px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    ul li:before {
      content: "✓ ";
      color: #6BB8E5;
      font-weight: bold;
      margin-right: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">EXOTIQ</div>
    <p style="color: #A0A0A0; margin: 0;">The Operating System for Exotic Car Rentals</p>
  </div>
  
  <div class="content">
    <p>Hi ${investorName},</p>
    
    <p>Thanks for your interest in Exotiq's $2.5M pre-seed round.</p>
    
    <p><strong>Here's what you need:</strong></p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://deck.exotiq.ai" class="button">📊 Full Investment Deck</a>
      <a href="https://summary.exotiq.ai" class="button">📈 Summary Deck</a>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.angellist.com/exotiq" class="button">💼 View on AngelList</a>
      <a href="https://calendly.com/hello-exotiq/30min" class="button">📅 Book a Call</a>
    </div>
    
    <div class="highlight">
      <p><strong>Quick Highlights:</strong></p>
      <ul>
        <li>30+ operator workflows automated</li>
        <li>15+ hours saved per operator weekly</li>
        <li>$2.45B market, 15.8% annual growth</li>
        <li>85% gross margin, 8.5:1 LTV:CAC</li>
      </ul>
    </div>
    
    <p>Let's talk this week?</p>
    
    <p>Best,<br>
    <strong>Gregory Ringler</strong><br>
    Founder & CEO, Exotiq<br>
    <a href="mailto:hello@exotiq.ai">hello@exotiq.ai</a></p>
  </div>
  
  <div class="footer">
    <p>Exotiq Inc. | Confidential Information | Accredited Investors Only</p>
    <p>© 2025 Exotiq Inc. All rights reserved.</p>
  </div>
</body>
</html>
  `,
    text: `Hi ${investorName},

Thanks for your interest in Exotiq's $2.5M pre-seed round.

Here's what you need:

📊 Full Investment Deck: https://deck.exotiq.ai
📈 Summary Deck: https://summary.exotiq.ai
💼 AngelList: https://www.angellist.com/exotiq
📅 Book a Call: https://calendly.com/hello-exotiq/30min

Quick Highlights:
• 30+ operator workflows automated
• 15+ hours saved per operator weekly
• $2.45B market, 15.8% annual growth
• 85% gross margin, 8.5:1 LTV:CAC

Let's talk this week?

Best,
Gregory Ringler
Founder & CEO, Exotiq
hello@exotiq.ai

---
Exotiq Inc. | Confidential Information | Accredited Investors Only
© 2025 Exotiq Inc. All rights reserved.`
});

export const getFollowUpEmail = (investorName: string) => ({
    subject: 'Quick question about Exotiq',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: #6BB8E5;
      color: #000000 !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 20px 0;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="content">
    <p>Hi ${investorName},</p>
    
    <p>Did you get a chance to review the materials?</p>
    
    <p>I'd love to hear your thoughts and answer any questions you might have about:</p>
    
    <ul>
      <li>Our go-to-market strategy</li>
      <li>Unit economics and projections</li>
      <li>The competitive landscape</li>
      <li>Our technology stack and AI capabilities</li>
    </ul>
    
    <p>Are you available for a 20-minute call this week?</p>
    
    <div style="text-align: center;">
      <a href="https://calendly.com/hello-exotiq/30min" class="button">Book a Call</a>
    </div>
    
    <p>Best,<br>
    Gregory</p>
  </div>
</body>
</html>
  `,
    text: `Hi ${investorName},

Did you get a chance to review the materials?

I'd love to hear your thoughts and answer any questions you might have about:
• Our go-to-market strategy
• Unit economics and projections
• The competitive landscape
• Our technology stack and AI capabilities

Are you available for a 20-minute call this week?

Book a call: https://calendly.com/hello-exotiq/30min

Best,
Gregory`
});

export const getCaseStudyEmail = (investorName: string) => ({
    subject: 'How operators save 15+ hours/week with Exotiq',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .case-study {
      background: #f5f5f5;
      padding: 20px;
      border-left: 4px solid #6BB8E5;
      margin: 20px 0;
    }
    .metric {
      display: inline-block;
      text-align: center;
      margin: 10px 20px;
    }
    .metric-value {
      font-size: 32px;
      font-weight: bold;
      color: #6BB8E5;
    }
    .metric-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: #6BB8E5;
      color: #000000 !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 20px 0;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="content">
    <p>Hi ${investorName},</p>
    
    <p>Thought you'd find this interesting...</p>
    
    <div class="case-study">
      <h3 style="margin-top: 0;">Denver Exotic Rental Cars</h3>
      <p><strong>Challenge:</strong> Managing 12 luxury vehicles across Turo, direct bookings, and corporate clients. Spending 20+ hours/week on pricing, messaging, and maintenance scheduling.</p>
      
      <p><strong>Solution:</strong> Implemented Exotiq's FleetCopilot and MotorIQ modules.</p>
      
      <p><strong>Results after 30 days:</strong></p>
      <div style="text-align: center; margin: 20px 0;">
        <div class="metric">
          <div class="metric-value">18 hrs</div>
          <div class="metric-label">Time Saved Weekly</div>
        </div>
        <div class="metric">
          <div class="metric-value">23%</div>
          <div class="metric-label">Revenue Increase</div>
        </div>
        <div class="metric">
          <div class="metric-value">94%</div>
          <div class="metric-label">Utilization Rate</div>
        </div>
      </div>
      
      <p><em>"Exotiq pays for itself in the first week. The AI pricing alone increased our revenue by 23%, and I got my weekends back."</em></p>
      <p style="margin: 0;"><strong>— Jay, Founder</strong></p>
    </div>
    
    <p>This is the ROI we're delivering to operators today.</p>
    
    <p>Want to discuss the investment opportunity?</p>
    
    <div style="text-align: center;">
      <a href="https://calendly.com/hello-exotiq/30min" class="button">Book a Call</a>
    </div>
    
    <p>Best,<br>
    Gregory</p>
  </div>
</body>
</html>
  `,
    text: `Hi ${investorName},

Thought you'd find this interesting...

CASE STUDY: Denver Exotic Rental Cars

Challenge: Managing 12 luxury vehicles across Turo, direct bookings, and corporate clients. Spending 20+ hours/week on pricing, messaging, and maintenance scheduling.

Solution: Implemented Exotiq's FleetCopilot and MotorIQ modules.

Results after 30 days:
• 18 hours saved weekly
• 23% revenue increase
• 94% utilization rate

"Exotiq pays for itself in the first week. The AI pricing alone increased our revenue by 23%, and I got my weekends back." — Jay, Founder

This is the ROI we're delivering to operators today.

Want to discuss the investment opportunity?

Book a call: https://calendly.com/hello-exotiq/30min

Best,
Gregory`
});

export const getFinalNudgeEmail = (investorName: string) => ({
    subject: 'Closing soon - still interested?',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .urgency {
      background: #FFF5F5;
      border: 2px solid #FF5733;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: #FF5733;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 20px 0;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="content">
    <p>Hi ${investorName},</p>
    
    <div class="urgency">
      <h3 style="margin-top: 0; color: #FF5733;">Round Closing Soon</h3>
      <p style="margin-bottom: 0;">We're closing our $2.5M pre-seed round in the next few weeks.</p>
    </div>
    
    <p>We've had strong interest from strategic investors and are on track to be fully subscribed ahead of schedule.</p>
    
    <p>If you're still interested in joining this round, let's connect before the remaining allocation is committed.</p>
    
    <p><strong>What's left:</strong></p>
    <ul>
      <li>Limited spots for strategic investors</li>
      <li>Opportunity to shape product roadmap</li>
      <li>Early access to platform and data</li>
      <li>Preferred terms for Series A participation</li>
    </ul>
    
    <div style="text-align: center;">
      <a href="https://calendly.com/hello-exotiq/30min" class="button">Schedule Final Call</a>
    </div>
    
    <p>Best,<br>
    Gregory</p>
    
    <p style="font-size: 12px; color: #666; margin-top: 30px;">
      P.S. If you're no longer interested, no worries at all. Just let me know and I'll remove you from this sequence.
    </p>
  </div>
</body>
</html>
  `,
    text: `Hi ${investorName},

ROUND CLOSING SOON

We're closing our $2.5M pre-seed round in the next few weeks.

We've had strong interest from strategic investors and are on track to be fully subscribed ahead of schedule.

If you're still interested in joining this round, let's connect before the remaining allocation is committed.

What's left:
• Limited spots for strategic investors
• Opportunity to shape product roadmap
• Early access to platform and data
• Preferred terms for Series A participation

Schedule a final call: https://calendly.com/hello-exotiq/30min

Best,
Gregory

P.S. If you're no longer interested, no worries at all. Just let me know and I'll remove you from this sequence.`
});

