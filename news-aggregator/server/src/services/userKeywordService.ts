import userKeywordRepo from "../repositories/userKeywordRepo";

class UserKeywordService {
  async getUserKeywords(userId: number) {
    return userKeywordRepo.getKeywordsByUser(userId);
  }
  async addKeyword(userId: number, keyword: string) {
    return userKeywordRepo.addKeyword(userId, keyword);
  }
  async deleteKeyword(userId: number, keyword: string) {
    return userKeywordRepo.deleteKeyword(userId, keyword);
  }
}

export default new UserKeywordService();
