/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import { MailAdapter, SendMailData } from '../mail-adapter';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class SendgridMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await sgMail.send({
      to: 'nlnadialigia@hotmail.com', // Change to your recipient
      from: 'nlnadialigia.nlw@gmail.com', // Change to your verified sender
      subject,
      text: 'Feedback Widget',
      html: body,
    });
  }
}
