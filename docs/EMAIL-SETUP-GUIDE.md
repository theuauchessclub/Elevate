# 📧 EmailJS Setup Guide for The Up And Up Chess Club

## Overview
This guide will help you set up reliable email confirmations for your chess club enrollment forms using EmailJS. This replaces the unreliable FormSubmit service with a professional email delivery system.

## What You've Got
✅ **EmailJS integration** added to both enrollment forms  
✅ **Centralized configuration** file for easy management  
✅ **Backup systems** in place (Edge Function + FormSubmit fallbacks)  
✅ **Professional email templates** with chess club branding  

## Quick Setup (10 minutes)

### Step 1: Create EmailJS Account
1. Go to [emailjs.com/signup](https://www.emailjs.com/signup/)
2. Sign up for a **free account** (200 emails/month)
3. Verify your email address

### Step 2: Connect Your Email Service
1. In your EmailJS dashboard, click **"Add New Service"**
2. Choose your email provider:
   - **Gmail** (recommended)
   - Outlook
   - Yahoo
   - Other SMTP services
3. Follow the connection wizard
4. **Important for Gmail users:** You may need to:
   - Enable "2-step verification" in your Google account
   - Create an "App password" specifically for EmailJS
   - Use the app password instead of your regular password

### Step 3: Create Email Template
1. Click **"Create Email Template"** in EmailJS dashboard
2. **Template Settings:**
   - **Template Name:** `Chess Club Enrollment Confirmation`
   - **Subject:** `{{subject}}`
   - **Content:** Copy and paste this template:

```
Hello {{to_name}},

{{message}}

Best regards,
{{from_name}}

---
The Up And Up Chess Club
Phone: (240) 360-0809
Email: theuauchessclub@gmail.com

This email was sent from our enrollment system.
```

3. Save the template and note the **Template ID**

### Step 4: Get Your Credentials
You need three pieces of information:

1. **Service ID** - Find this on your "Email Services" page
2. **Template ID** - Find this on your email template page  
3. **Public Key** - Find this in Account → API Keys

### Step 5: Update Configuration File
1. Open the file `emailjs-config.js` in your project
2. Replace the placeholder values with your actual credentials:

```javascript
window.CHESS_CLUB_EMAIL_CONFIG = {
    publicKey: 'YOUR_ACTUAL_PUBLIC_KEY_HERE',    // Replace this
    serviceId: 'YOUR_ACTUAL_SERVICE_ID_HERE',    // Replace this  
    templateId: 'YOUR_ACTUAL_TEMPLATE_ID_HERE',  // Replace this
    
    // Leave these settings as they are
    fromName: 'The Up And Up Chess Club',
    replyToEmail: 'theuauchessclub@gmail.com',
    // ... rest of the configuration
};
```

### Step 6: Test Your Setup
1. Open the `emailjs-test.html` file
2. Enter your EmailJS credentials
3. Send a test email to hall.truth@gmail.com
4. Check your inbox (and spam folder)

## What Happens Now

### For Private Enrollments:
- Parent fills out enrollment form
- Data saves to your Supabase database
- **EmailJS sends immediate confirmation** to parent's email
- Edge Function sends backup notification (if configured)
- FormSubmit sends additional backup (if EmailJS fails)

### For Group Partnerships:
- Organization fills out partnership form  
- Data saves to your Supabase database
- **EmailJS sends immediate confirmation** to contact person
- Edge Function sends backup notification (if configured)
- FormSubmit sends additional backup (if EmailJS fails)

## Email Content Examples

### Private Enrollment Confirmation:
```
Dear Sarah Johnson,

Thank you for enrolling Michael Johnson in The Up And Up Chess Club!

ENROLLMENT DETAILS:
• Student: Michael Johnson (Age: 8)
• Program: Beginner Program - $200/month
• Session Format: In-Person Individual Lessons
• Preferred Schedule: Weekdays After School

NEXT STEPS:
We will contact you within 24 hours to:
1. Schedule your first chess session
2. Provide program materials and preparation information
3. Answer any questions you may have

CONTACT INFORMATION:
• Email: theuauchessclub@gmail.com
• Phone: (240) 360-0809
```

### Group Partnership Confirmation:
```
Dear Principal Smith,

Thank you for your interest in partnering with The Up And Up Chess Club 
for Lincoln Elementary School!

PARTNERSHIP REQUEST DETAILS:
• Organization: Lincoln Elementary School
• Contact Person: John Smith (Principal)
• Program: School Essentials - $2,750
• Expected Participants: 25
• Participant Ages: 6-10 years old
• Preferred Schedule: After School Program

NEXT STEPS:
We will contact you within 24 hours to:
1. Schedule a consultation call to discuss your specific needs
2. Provide detailed program information and curriculum
3. Create a customized chess program for your organization
```

## Troubleshooting

### "Email not received"
1. **Check spam folder** - New senders often go to spam initially
2. **Verify credentials** - Make sure all three IDs are correct
3. **Check EmailJS quota** - Free plan has 200 emails/month limit
4. **Gmail users:** Ensure app password is used, not regular password

### "EmailJS not working"
1. **Browser console** - Check for error messages (F12 → Console)
2. **Test manually** - Use the emailjs-test.html tool
3. **Template variables** - Ensure template has {{to_name}}, {{subject}}, {{message}}
4. **Service connection** - Verify email service is properly connected

### "Form submits but no email"
- Form submission continues to work even if email fails
- Check browser console for EmailJS error messages
- Backup systems (Edge Function, FormSubmit) may still send emails

## Technical Details

### Files Modified:
- ✅ `enroll-private.html` - Added EmailJS integration
- ✅ `enroll-group.html` - Added EmailJS integration  
- ✅ `emailjs-config.js` - Centralized configuration file
- ✅ `emailjs-test.html` - Testing and setup tool

### Email Delivery Priority:
1. **EmailJS** (most reliable, immediate)
2. **Supabase Edge Function** (backup, may have API key issues)
3. **FormSubmit** (fallback, occasional delivery issues)

### Security Notes:
- EmailJS public key is safe to include in client-side code
- No sensitive passwords are stored in your website files
- Email authentication happens on EmailJS servers

## Support

### EmailJS Documentation:
- [Getting Started Guide](https://www.emailjs.com/docs/)
- [Gmail Setup](https://www.emailjs.com/docs/examples/gmail/)
- [Template Guide](https://www.emailjs.com/docs/user-guide/creating-email-template/)

### Chess Club Support:
If you need help with this setup, the configuration files include detailed comments and error messages to guide you through any issues.

---

**Ready to go live?** Once you've completed the setup and tested successfully, your enrollment forms will send reliable confirmation emails to all new enrollments and partnership requests!