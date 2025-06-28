import clientPromise from "../mongodb";
import {
  Institution,
  CreateInstitutionData,
  UpdateInstitutionData,
} from "../models/Institution";

const DATABASE_NAME = "globalassetrail";
const COLLECTION_NAME = "institutions";

export class InstitutionService {
  private static async getCollection() {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    return db.collection<Institution>(COLLECTION_NAME);
  }

  static async createInstitution(
    data: CreateInstitutionData
  ): Promise<Institution> {
    const collection = await this.getCollection();

    const institution: Omit<Institution, "_id"> = {
      ...data,
      isApproved: false,
      requestPhase: 0, // REQUESTED
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(institution);
    return { ...institution, _id: result.insertedId };
  }

  static async getInstitutionByParticipant(
    participant: string
  ): Promise<Institution | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ participant });
  }

  static async updateInstitution(
    participant: string,
    data: UpdateInstitutionData
  ): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { participant },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );
    return result.modifiedCount > 0;
  }

  static async getAllInstitutions(): Promise<Institution[]> {
    const collection = await this.getCollection();
    return await collection.find({}).toArray();
  }

  static async deleteInstitution(participant: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ participant });
    return result.deletedCount > 0;
  }
}
