/**
 * EmailJS Configuration for The Up And Up Chess Club
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a free EmailJS account at https://www.emailjs.com/signup/
 * 2. Add your email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables: {{to_name}}, {{subject}}, {{message}}
 * 4. Replace the placeholder values below with your actual EmailJS credentials
 * 5. Include this file in your HTML pages: <script src="emailjs-config.js"></script>
 */

// EmailJS Configuration Object
window.CHESS_CLUB_EMAIL_CONFIG = {
    // Replace these with your actual EmailJS credentials
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',    // Found in Account → API Keys
    serviceId: 'YOUR_SERVICE_ID',           // Found on Email Services page
    templateId: 'YOUR_TEMPLATE_ID',         // Found on your email template page
    
    // Email settings
    fromName: 'The Up And Up Chess Club',
    replyToEmail: 'theuauchessclub@gmail.com',
    
    // Configuration status
    isConfigured: function() {
        return this.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' && 
               this.serviceId !== 'YOUR_SERVICE_ID' && 
               this.templateId !== 'YOUR_TEMPLATE_ID';
    },
    
    // Initialize EmailJS with the configuration
    initialize: function() {
        if (this.isConfigured() && typeof emailjs !== 'undefined') {
            emailjs.init(this.publicKey);
            console.log('EmailJS initialized successfully');
            return true;
        } else if (!this.isConfigured()) {
            console.log('EmailJS not configured - please update emailjs-config.js with your credentials');
            return false;
        } else {
            console.error('EmailJS library not loaded');
            return false;
        }
    },
    
    // Send email using the configured settings
    sendEmail: async function(recipientName, recipientEmail, subject, message, additionalParams = {}) {
        if (!this.initialize()) {
            return { success: false, error: 'EmailJS not properly configured' };
        }
        
        try {
            const templateParams = {
                to_name: recipientName,
                to_email: recipientEmail,
                subject: subject,
                message: message,
                from_name: this.fromName,
                reply_to: this.replyToEmail,
                // Standard EmailJS parameters
                name: recipientName,
                email: recipientEmail,
                ...additionalParams
            };
            
            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams
            );
            
            if (response.status === 200) {
                return { success: true, response: response };
            } else {
                return { success: false, error: `EmailJS returned status: ${response.status}` };
            }
            
        } catch (error) {
            return { success: false, error: error.message || 'Unknown EmailJS error' };
        }
    }
};

// Auto-initialize when the page loads (if EmailJS is available)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        window.CHESS_CLUB_EMAIL_CONFIG.initialize();
    }
});

/**
 * TEMPLATE EXAMPLE for EmailJS:
 * 
 * Subject: {{subject}}
 * 
 * Hello {{to_name}},
 * 
 * {{message}}
 * 
 * Best regards,
 * {{from_name}}
 * 
 * ---
 * This email was sent from The Up And Up Chess Club enrollment system.
 * If you have any questions, please reply to {{reply_to}}
 */