import { corsHeaders } from '../_shared/cors.ts'

interface FormSubmission {
  type: 'beta' | 'contact'
  timestamp: string
  data: Record<string, any>
}

interface GoogleSheetsRow {
  values: (string | number)[]
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
    const { type, formData } = await req.json()
    
    if (!type || !formData) {
      throw new Error('Missing required fields: type and formData')
    }

    const timestamp = new Date().toISOString()
    const submission: FormSubmission = {
      type,
      timestamp,
      data: formData
    }

    // Prepare data for Google Sheets
    let sheetData: GoogleSheetsRow
    let emailSubject: string
    let emailBody: string

    if (type === 'beta') {
      // Beta signup data
      sheetData = {
        values: [
          timestamp,
          'Beta Signup',
          formData.fullName || '',
          formData.email || '',
          formData.fleetSize || '',
          formData.currentPlatform || '',
          formData.challenge || ''
        ]
      }
      
      emailSubject = `New Beta Signup: ${formData.fullName}`
      emailBody = createBetaSignupEmailHTML(formData, timestamp)
    } else if (type === 'contact') {
      // Contact form: keep original column order, append phone/SMS at end for existing Sheets layouts
      const smsTx = formData.smsConsentTransactional === true ? 'yes' : formData.phone ? 'no' : ''
      const smsMkt = formData.smsConsentMarketing === true ? 'yes' : formData.phone ? 'no' : ''
      sheetData = {
        values: [
          timestamp,
          'Contact Form',
          `${formData.firstName} ${formData.lastName}`,
          formData.email || '',
          formData.subject || '',
          formData.fleetSize || '',
          formData.company || '',
          formData.message || '',
          formData.phone || '',
          smsTx,
          smsMkt,
          formData.smsConsentTimestamp || '',
        ]
      }
      
      emailSubject = `New Contact Form: ${formData.subject} - ${formData.firstName} ${formData.lastName}`
      emailBody = createContactFormEmailHTML(formData, timestamp)
    } else {
      throw new Error('Invalid form type')
    }

    // Add to Google Sheets
    await addToGoogleSheets(sheetData)
    
    // Send email notification
    await sendEmailNotification(emailSubject, emailBody)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        timestamp 
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )

  } catch (error) {
    console.error('Form submission error:', error)
    
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

async function addToGoogleSheets(data: GoogleSheetsRow) {
  const GOOGLE_SHEETS_API_KEY = Deno.env.get('GOOGLE_SHEETS_API_KEY')
  const GOOGLE_SHEET_ID = Deno.env.get('GOOGLE_SHEET_ID')
  
  if (!GOOGLE_SHEETS_API_KEY || !GOOGLE_SHEET_ID) {
    console.warn('Google Sheets credentials not configured')
    return
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Form Submissions:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_API_KEY}`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [data.values]
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`)
  }

  console.log('Successfully added to Google Sheets')
}

async function sendEmailNotification(subject: string, body: string) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  
  if (!RESEND_API_KEY) {
    console.warn('Email service not configured')
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Exotiq Forms <noreply@exotiq.ai>',
      to: ['hello@exotiq.ai'],
      subject: subject,
      text: body,
      html: body.replace(/\n/g, '<br>')
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Email service error: ${response.status} - ${errorText}`)
  }

  console.log('Email notification sent successfully')
}

function createBetaSignupEmailHTML(formData: any, timestamp: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Beta Signup - Exotiq.ai</title>
    </head>
    <body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #ea580c 100%); padding: 30px; text-align: center;">
          <img src="https://exotiq.ai/Exotiq%20Lockup.png" alt="Exotiq.ai" style="height: 40px; width: auto; filter: brightness(0) invert(1);">
          <h1 style="color: white; margin: 20px 0 10px 0; font-size: 24px; font-weight: bold;">New Beta Signup! 🚀</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px;">Someone wants to join the Exotiq.ai beta program</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Contact Information</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${formData.fullName}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #2563eb;">${formData.email}</a></p>
            <p style="margin: 8px 0;"><strong>Fleet Size:</strong> ${formData.fleetSize}</p>
            <p style="margin: 8px 0;"><strong>Current Platform:</strong> ${formData.currentPlatform || 'Not specified'}</p>
          </div>
          
          <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Main Challenge</h3>
            <p style="color: #78350f; margin: 0; font-style: italic;">"${formData.challenge}"</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${formData.email}" style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Reply to ${formData.fullName}</a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Submitted: ${new Date(timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function createContactFormEmailHTML(formData: any, timestamp: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form - Exotiq.ai</title>
    </head>
    <body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #ea580c 100%); padding: 30px; text-align: center;">
          <img src="https://exotiq.ai/Exotiq%20Lockup.png" alt="Exotiq.ai" style="height: 40px; width: auto; filter: brightness(0) invert(1);">
          <h1 style="color: white; margin: 20px 0 10px 0; font-size: 24px; font-weight: bold;">New Contact Form 📧</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px;">Someone reached out through the contact form</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Contact Information</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #2563eb;">${formData.email}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p style="margin: 8px 0;"><strong>SMS transactional consent:</strong> ${formData.smsConsentTransactional === true ? 'Yes' : formData.phone ? 'No' : 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>SMS marketing consent:</strong> ${formData.smsConsentMarketing === true ? 'Yes' : formData.phone ? 'No' : 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${formData.company || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${formData.subject}</p>
            <p style="margin: 8px 0;"><strong>Fleet Size:</strong> ${formData.fleetSize || 'Not specified'}</p>
          </div>
          
          <div style="background-color: #dbeafe; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Message</h3>
            <p style="color: #1e3a8a; margin: 0; white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${formData.email}" style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Reply to ${formData.firstName}</a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Submitted: ${new Date(timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}