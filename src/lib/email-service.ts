import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
};

// Validate email configuration
const validateEmailConfig = () => {
  if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
    console.warn('⚠️ Email configuration incomplete. EMAIL_USER and EMAIL_PASS environment variables are required.');
    return false;
  }
  return true;
};

// Create transporter
const createTransporter = () => {
  if (!validateEmailConfig()) {
    throw new Error('Email configuration is incomplete. Please set EMAIL_USER and EMAIL_PASS environment variables.');
  }
  return nodemailer.createTransport(EMAIL_CONFIG);
};

// Send welcome email
export const sendWelcomeEmail = async (userEmail: string) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"My Channel Sabse Tej News" <${EMAIL_CONFIG.auth.user}>`,
      to: userEmail,
      subject: '🎉 Welcome to My Channel Sabse Tej News!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to My Channel Sabse Tej News!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your trusted source for breaking news</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for subscribing!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Welcome to My Channel Sabse Tej News! You're now part of our community of informed readers who get the latest breaking news, 
              political updates, sports coverage, and entertainment news delivered directly to your inbox.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">What you'll receive:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>🔥 Breaking news alerts</li>
                <li>🏛️ Political updates and analysis</li>
                <li>⚽ Sports news and match results</li>
                <li>🎬 Entertainment and celebrity news</li>
                <li>💻 Technology and innovation updates</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We respect your privacy and will never share your email with third parties. 
              You can unsubscribe at any time by clicking the link at the bottom of our emails.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="http://localhost:3000" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Visit My Channel Sabse Tej News
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© 2024 My Channel Sabse Tej News. All rights reserved.</p>
            <p>This email was sent to ${userEmail}</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
  }
};

// Send notification to admin about new subscription
export const sendAdminNotification = async (userEmail: string) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"My Channel Sabse Tej News" <${EMAIL_CONFIG.auth.user}>`,
      to: EMAIL_CONFIG.auth.user, // Send to admin
      subject: '📧 New Email Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Email Subscription</h2>
          <p style="color: #666;">A new user has subscribed to My Channel Sabse Tej News:</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <strong>Email:</strong> ${userEmail}<br>
            <strong>Time:</strong> ${new Date().toLocaleString()}
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Admin notification failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send admin notification' };
  }
}; 