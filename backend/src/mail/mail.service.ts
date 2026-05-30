import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT');
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });
  }

  async sendAdminNotification(lead: {
    name: string;
    mobile: string;
    email: string;
    state: string;
    city?: string;
    quantity: number;
  }) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const fromEmail = this.configService.get<string>('SMTP_FROM', 'no-reply@bambootissuebox.com');

    const htmlContent = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #fafaf9;">
        <div style="text-align: center; border-bottom: 2px solid #e7e5e4; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #78350f; margin: 0; font-size: 24px;">New Lead Reserved!</h2>
          <p style="color: #78716c; margin: 4px 0 0 0; font-size: 14px;">Market Demand Validation Log</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #e7e5e4;">
            <td style="padding: 12px 0; font-weight: 600; color: #44403c; width: 40%;">Customer Name:</td>
            <td style="padding: 12px 0; color: #1c1917;">${lead.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e7e5e4;">
            <td style="padding: 12px 0; font-weight: 600; color: #44403c;">Mobile Number:</td>
            <td style="padding: 12px 0; color: #1c1917;">${lead.mobile}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e7e5e4;">
            <td style="padding: 12px 0; font-weight: 600; color: #44403c;">Email Address:</td>
            <td style="padding: 12px 0; color: #1c1917;"><a href="mailto:${lead.email}" style="color: #b45309; text-decoration: none;">${lead.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e7e5e4;">
            <td style="padding: 12px 0; font-weight: 600; color: #44403c;">State / City:</td>
            <td style="padding: 12px 0; color: #1c1917;">${lead.state} ${lead.city ? `/ ${lead.city}` : ''}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e7e5e4;">
            <td style="padding: 12px 0; font-weight: 600; color: #44403c;">Quantity Requested:</td>
            <td style="padding: 12px 0; font-weight: 700; color: #78350f; font-size: 16px;">${lead.quantity} units</td>
          </tr>
        </table>
        
        <div style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 12px; border-radius: 4px; margin-bottom: 24px;">
          <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
            <strong>Business Insight:</strong> Each reservation represents high intent since payment was bypassed only due to stock constraints. Maintain this lead for the launch broadcast list.
          </p>
        </div>
        
        <div style="text-align: center; font-size: 12px; color: #a8a29e; border-top: 1px solid #e7e5e4; padding-top: 16px;">
          Premium Bamboo Tissue Box Validation Landing Page Dashboard
        </div>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Lead Tracker" <${fromEmail}>`,
        to: adminEmail,
        subject: `🚨 New Reservation: ${lead.quantity} Units by ${lead.name}`,
        html: htmlContent,
      });
      this.logger.log(`Admin notification sent for lead: ${lead.email}`);
    } catch (error) {
      this.logger.error(`Failed to send admin notification email: ${error.message}`);
    }
  }

  async sendCustomerConfirmation(customerEmail: string, name: string, quantity: number) {
    const fromEmail = this.configService.get<string>('SMTP_FROM', 'no-reply@bambootissuebox.com');

    const htmlContent = `
      <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e7e5e4; border-radius: 16px; background-color: #ffffff; color: #1c1917; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #d97706; margin-bottom: 8px;">
            Reservations Registered
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 400; color: #1c1917; margin: 0;">
            Premium Bamboo Tissue Box
          </h2>
        </div>
        
        <p style="font-size: 16px; color: #44403c;">Dear ${name},</p>
        
        <p style="font-size: 15px; color: #44403c; margin-bottom: 24px;">
          Thank you for your interest in our <strong>Premium Bamboo Tissue Box</strong>. We are pleased to confirm that we have successfully reserved your requested quantity of <strong>${quantity} ${quantity === 1 ? 'unit' : 'units'}</strong>.
        </p>

        <div style="background-color: #fafaf9; border-radius: 12px; padding: 20px; border: 1px solid #f5f5f4; margin-bottom: 28px;">
          <h3 style="margin-top: 0; font-size: 15px; font-weight: 600; color: #78350f;">Your Reservation Summary</h3>
          <ul style="margin: 0; padding-left: 20px; color: #57534e; font-size: 14px; line-height: 1.8;">
            <li>Product: Premium Bamboo Tissue Box</li>
            <li>Launch Price: ₹449 per unit</li>
            <li>Quantity Reserved: ${quantity}</li>
            <li>Status: First Batch - Production Preparation</li>
            <li><strong>Amount Due Today: ₹0 (No payment required until stock is ready)</strong></li>
          </ul>
        </div>
        
        <p style="font-size: 15px; color: #44403c; margin-bottom: 24px;">
          We are currently preparing our very first exclusive batch using sustainably sourced premium bamboo. Because demand has been incredibly high, reservations will be served strictly in the order they were received.
        </p>

        <p style="font-size: 15px; color: #44403c; margin-bottom: 32px;">
          We will contact you via email and mobile with a custom payment link as soon as your units are crafted and ready to ship.
        </p>
        
        <div style="border-top: 1px solid #f5f5f4; padding-top: 24px; text-align: center;">
          <p style="font-size: 13px; color: #78716c; margin: 0 0 8px 0;">
            Designing modern details for premium spaces.
          </p>
          <div style="font-size: 11px; color: #a8a29e;">
            If you did not make this request, please ignore this email.
          </div>
        </div>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Premium Bamboo Home" <${fromEmail}>`,
        to: customerEmail,
        subject: `Your Reservation is Confirmed: Premium Bamboo Tissue Box`,
        html: htmlContent,
      });
      this.logger.log(`Customer confirmation sent to: ${customerEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send customer confirmation email: ${error.message}`);
    }
  }
}
