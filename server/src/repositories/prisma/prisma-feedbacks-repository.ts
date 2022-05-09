import { prisma } from '../../prisma';
import { FeedBackCreateData, FeedBacksRepository } from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedBacksRepository {
  async create({ type, comment, screenshot }: FeedBackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
