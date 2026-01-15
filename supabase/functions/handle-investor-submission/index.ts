import { corsHeaders } from '../_shared/cors.ts'
import { getImmediateEmail } from './email-templates.ts'

interface InvestorSubmission {
  firstName: string
  lastName: string
  email: string
  companyName?: string
  phone?: string
  investmentAmountRange?: string
  investmentTimeline?: string
  investmentType?: string
  industryExperience?: string
  contactPreference?: string
  additionalNotes?: string
  source?: string
}

interface EmailNotification {
  to: string
  subject: string
  html: string
  text: string
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    const submission: InvestorSubmission = await req.json()
    
    // Validate required fields
    if (!submission.firstName || !submission.lastName || !submission.email) {
      throw new Error('Missing required fields: firstName, lastName, email')
    }

    // Get client info for tracking
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'
    
    // Insert into database
    const { data: investorContact, error: dbError } = await insertInvestorContact({
      ...submission,
      ipAddress,
      userAgent
    })

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    // Send email notifications
    await Promise.all([
      sendWelcomeEmail(submission),
      sendNotificationEmail(submission, investorContact.id)
    ])

    // Log email to database
    await logEmailNotification({
      investorContactId: investorContact.id,
      emailType: 'welcome',
      sentTo: submission.email,
      subject: 'Welcome to Exotiq - Investment Interest',
      body: createWelcomeEmailHTML(submission)
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Investor submission received successfully',
        investorId: investorContact.id,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )

  } catch (error) {
    console.error('Investor submission error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An error occurred processing your submission' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )
  }
})

async function insertInvestorContact(data: InvestorSubmission & { ipAddress: string; userAgent: string }) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase credentials not configured')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/investor_contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'apikey': supabaseServiceKey,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      company_name: data.companyName,
      phone: data.phone,
      investment_amount_range: data.investmentAmountRange,
      investment_timeline: data.investmentTimeline,
      investment_type: data.investmentType,
      industry_experience: data.industryExperience,
      contact_preference: data.contactPreference,
      additional_notes: data.additionalNotes,
      source: data.source || 'website',
      ip_address: data.ipAddress,
      user_agent: data.userAgent
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Database insert error: ${response.status} - ${errorText}`)
  }

  const result = await response.json()
  return { data: result[0], error: null }
}

async function sendWelcomeEmail(submission: InvestorSubmission) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  
  if (!RESEND_API_KEY) {
    console.warn('Email service not configured')
    return
  }

  // Use premium email template
  const emailTemplate = getImmediateEmail(submission.firstName, submission.email)
  
  const emailData: EmailNotification = {
    to: submission.email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text
  }

  await sendEmail(emailData)
}

async function sendNotificationEmail(submission: InvestorSubmission, investorId: string) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  
  if (!RESEND_API_KEY) {
    console.warn('Email service not configured')
    return
  }

  const emailData: EmailNotification = {
    to: 'hello@exotiq.ai',
    subject: `New Investor Interest: ${submission.firstName} ${submission.lastName}`, 
    html: createNotificationEmailHTML(submission, investorId),
    text: createNotificationEmailText(submission, investorId)
  }

  await sendEmail(emailData)
}

async function sendEmail(emailData: EmailNotification) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Gregory @ Exotiq <hello@exotiq.ai>',
      to: [emailData.to],
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      tags: [
        { name: 'type', value: 'investor_immediate' },
        { name: 'campaign', value: 'pre_seed_raise' }
      ]
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Email service error: ${response.status} - ${errorText}`)
  }

  console.log(`Email sent successfully to ${emailData.to}`)
}

async function logEmailNotification(data: {
  investorContactId: string
  emailType: string
  sentTo: string
  subject: string
  body: string
}) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase credentials not configured for email logging')
    return
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/investor_emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'apikey': supabaseServiceKey
    },
    body: JSON.stringify({
      investor_contact_id: data.investorContactId,
      email_type: data.emailType,
      sent_to: data.sentTo,
      subject: data.subject,
      body: data.body
    })
  })

  if (!response.ok) {
    console.warn('Failed to log email notification')
  }
}

function createWelcomeEmailHTML(submission: InvestorSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Exotiq - Investment Interest</title>
    </head>
    <body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #ea580c 100%); padding: 30px; text-align: center;">
          <img src="https://exotiq.ai/exotiq_4k_transparent_background.png" alt="Exotiq.ai" style="height: 40px; width: auto; filter: brightness(0) invert(1);">
          <h1 style="color: white; margin: 20px 0 10px 0; font-size: 24px; font-weight: bold;">Welcome to Exotiq! 🚀</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px;">Thank you for your investment interest</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <p style="margin: 0 0 20px 0; font-size: 16px;">Hi ${submission.firstName},</p>
          
          <p style="margin: 0 0 20px 0; font-size: 16px;">Thank you for expressing interest in investing in Exotiq! We're excited about the opportunity to connect with potential investors who share our vision for revolutionizing fleet management.</p>
          
          <p style="margin: 0 0 20px 0; font-size: 16px;">Our team will review your information and reach out within 24-48 hours to discuss your investment interests and answer any questions you may have.</p>
          
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
              <li style="margin-bottom: 8px;">We'll schedule a call to discuss your investment criteria</li>
              <li style="margin-bottom: 8px;">Share our detailed business plan and financial projections</li>
              <li style="margin-bottom: 8px;">Discuss potential investment terms and structure</li>
              <li style="margin-bottom: 0;">Answer any questions about our market opportunity</li>
            </ul>
          </div>
          
          <p style="margin: 20px 0; font-size: 16px;">In the meantime, feel free to explore our website to learn more about our platform and vision.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://exotiq.ai" style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Visit Exotiq.ai</a>
          </div>
          
          <p style="margin: 20px 0 0 0; font-size: 16px;">Best regards,<br>The Exotiq Team</p>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Questions? Reply to this email or contact us at hello@exotiq.ai</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

function createWelcomeEmailText(submission: InvestorSubmission): string {
  return `Hi ${submission.firstName},

Thank you for expressing interest in investing in Exotiq! We're excited about the opportunity to connect with potential investors who share our vision for revolutionizing fleet management.

Our team will review your information and reach out within 24-48 hours to discuss your investment interests and answer any questions you may have.

What's Next?
- We'll schedule a call to discuss your investment criteria
- Share our detailed business plan and financial projections
- Discuss potential investment terms and structure
- Answer any questions about our market opportunity

In the meantime, feel free to explore our website to learn more about our platform and vision: https://exotiq.ai

Best regards,
The Exotiq Team

Questions? Reply to this email or contact us at hello@exotiq.ai`
}

function createNotificationEmailHTML(submission: InvestorSubmission, investorId: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Investor Interest - Exotiq.ai</title>
    </head>
    <body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #ea580c 100%); padding: 30px; text-align: center;">
          <img src="https://exotiq.ai/exotiq_4k_transparent_background.png" alt="Exotiq.ai" style="height: 40px; width: auto; filter: brightness(0) invert(1);">
          <h1 style="color: white; margin: 20px 0 10px 0; font-size: 24px; font-weight: bold;">New Investor Interest! 💰</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px;">Someone wants to invest in Exotiq</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Investor Information</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${submission.email}" style="color: #2563eb;">${submission.email}</a></p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${submission.companyName || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${submission.phone || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Investment Amount:</strong> ${submission.investmentAmountRange || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Timeline:</strong> ${submission.investmentTimeline || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Investment Type:</strong> ${submission.investmentType || 'Not specified'}</p>
          </div>
          
          ${submission.additionalNotes ? `
          <div style="background-color: #dbeafe; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Additional Notes</h3>
            <p style="color: #1e3a8a; margin: 0; white-space: pre-wrap;">${submission.additionalNotes}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${submission.email}" style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; margin-right: 10px;">Reply to ${submission.firstName}</a>
            <a href="https://calendly.com/hello-exotiq/30min" style="background-color: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Schedule Call</a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Investor ID: ${investorId} | Submitted: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

function createNotificationEmailText(submission: InvestorSubmission, investorId: string): string {
  return `New Investor Interest!

Investor Information:
- Name: ${submission.firstName} ${submission.lastName}
- Email: ${submission.email}
- Company: ${submission.companyName || 'Not specified'}
- Phone: ${submission.phone || 'Not specified'}
- Investment Amount: ${submission.investmentAmountRange || 'Not specified'}
- Timeline: ${submission.investmentTimeline || 'Not specified'}
- Investment Type: ${submission.investmentType || 'Not specified'}

${submission.additionalNotes ? `Additional Notes:
${submission.additionalNotes}

` : ''}Investor ID: ${investorId}
Submitted: ${new Date().toLocaleString()}

Reply to: ${submission.email}
Schedule call: https://calendly.com/hello-exotiq/30min`
} 