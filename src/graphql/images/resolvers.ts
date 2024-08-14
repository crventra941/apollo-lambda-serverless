import { createNewImage, getAllImages } from "../../database/images";

const resolvers = {
  Query: {
    async getImages(_, __, context) {
      return getAllImages()
    },
  },
  Mutation: {
    async createImage(_, newImage, context) {
      return createNewImage({ ...newImage });
    }
  }
};

export default resolvers;