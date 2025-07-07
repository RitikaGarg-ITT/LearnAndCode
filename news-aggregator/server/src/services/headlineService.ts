import headlineRepository from "../repositories/headlinerepository";
import { Headline } from "../models/headline";

class HeadlineService {
  public async getTodayHeadlines(): Promise<Headline[]> {
    const today = new Date().toISOString().split("T")[0];
    return await headlineRepository.getHeadlinesByDate(today);
  }

  public async getHeadline(news_id: number): Promise<Headline | undefined> {
    return await headlineRepository.getHeadlineById(news_id);
  }

  public async getHeadlinesByFilter(startDate: string, endDate: string, category?: string): Promise<Headline[]> {
    return await headlineRepository.getHeadlinesByFilter(startDate, endDate, category);
  }
}

export default new HeadlineService();
