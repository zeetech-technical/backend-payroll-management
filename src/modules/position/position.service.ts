import { Position } from "./position.model";

export class PositionService {
  getAllPositions() {
    try {
      const positions = Position.findAll();
      return positions;
    } catch (error) {
      throw error;
    }
  }
  async createPosition(data: any) {
    try {
      const position = await Position.create(data);
      return position;
    } catch (error) {
      throw error;
    }
  }
}
