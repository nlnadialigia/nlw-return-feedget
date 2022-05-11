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
      throw new Error('Type is required.');
    }

    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p><b style="color: #8257E5;">Tipo do feedback: </b>${type}</p>`,
        `<p><b style="color: #8257E5;">Comentário: </b>${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        '</div>',
      ].join('\n'),
    });
  }
}
