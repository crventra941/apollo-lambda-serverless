import { ImageRepository } from "../../repository/ImageRepository";

const imageRepository = new ImageRepository();

const resolvers = {
  Query: {
    async getImages(_, __, context) {
      return imageRepository.getAllImages()
    },
  },
  Mutation: {
    async createImage(_, newImage, context) {
      return imageRepository.createImage(newImage);
    }
  }
};

export default resolvers;