/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import sgMail from '@sendgrid/mail';
import { MailAdapter, SendMailData } from '../mail-adapter';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export class SendgridMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    sgMail.send({
      to: 'nlnadialigia@hotmail.com', // Change to your recipient
      from: 'nlnadialigia.nlw@gmail.com', // Change to your verified sender
      subject,
      text: 'Feedback Widget',
      html: body,
    }).then(() => {
      console.log('Email sent');
    })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
