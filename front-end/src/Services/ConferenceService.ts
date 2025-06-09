// src/services/ConferenceService.ts
import { getData, postFormData, deleteData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";

interface Conference {
  id: number;
  conferenceName: string;
  locationDate: string;
  articleTitle: string;
  fileName: string;
  awards: string;
  awardsProofUrl: string;
  awardsProofFileName: string;
}

export const ConferenceService = {
  async getAll(): Promise<Conference[]> {
    try {
      const res: { content: Conference[] } | undefined = await getData(
        appConfig.API_PATHS.CONFERENCES.getAll.path
      );
      return res?.content || []; // Adjust based on your pagination response
    } catch (error) {
      console.error("Error fetching conferences:", error);
      throw error;
    }
  },

  async create(formData: FormData): Promise<Conference> {
    try {
      const res = await postFormData(
        appConfig.API_PATHS.CONFERENCES.create.path,
        formData
      );
      return res as Conference;
    } catch (error) {
      console.error("Error creating conference:", error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await deleteData(`${appConfig.API_PATHS.CONFERENCES.delete.path}/${id}`);
    } catch (error) {
      console.error("Error deleting conference:", error);
      throw error;
    }
  },
};
