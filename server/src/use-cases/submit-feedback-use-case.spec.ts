import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit Feedback', () => {
  it('Should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64-teste.jpg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('Should return an error if type does not exist', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64-teste.jpg',
    })).rejects.toThrow();
  });

  it('Should return an error if comment does not exist', async () => {
    await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: '',
      screenshot: 'data:image/png;base64-teste.jpg',
    })).rejects.toThrow();
  });

  it('Should return an error if screenshot format invalid', async () => {
    await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: 'example comment',
      screenshot: 'teste.jpg',
    })).rejects.toThrow();
  });
});
