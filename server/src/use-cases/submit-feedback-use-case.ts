import { MailAdapter } from '../adapters/mail-adapter';
import { FeedBacksRepository } from '../repositories/feedbacks-repository';

export interface SubmitFeedbackUseCaseRequest {
  type: string,
  comment: string,
  screenshot?: string,
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedBacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      return ('Type is required.');
    }

    if (!comment) {
      return ('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      return ('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    const mail = await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        '</div>',
      ].join('\n'),
    });

    return mail;
  }
}
