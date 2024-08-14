const imageSchema = `#graphql
  type CosmoImage {
   imageUrl: String
   createdAt: String
  }

  type Query {
    getImages: [CosmoImage]
  }

  type Mutation {
    createImage(height: Int, width: Int, isGrayScale: Boolean, isYoung: Boolean): CosmoImage
  }
`;

export default imageSchema;