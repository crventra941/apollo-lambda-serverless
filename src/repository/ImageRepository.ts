
import AWS from "aws-sdk";
import { generateId } from "../utils";
import { CreateImage, IImageRepository, Image, NewImage } from "../interfaces/images";


export class ImageRepository implements IImageRepository {

    private tableName;
    private dynamoDb;

    constructor() {
        this.tableName = process.env.DYNAMODB_IMAGES_TABLE;
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }

    async createImage(newImage: NewImage): Promise<CreateImage> {

        const { width, height, isGrayScale, isYoung } = newImage;

        if (width <= 0 || height <= 0) {
            return { error: 'Width and height must be positive integers' };
        }

        const imageUrl = `https://placekeanu.com/${width}/${height}/${isGrayScale ? 'g' : ''}${isYoung ? 'y' : ''}`;
        const createdAt = new Date().toISOString();


        if (!this.tableName) {
            return { error: "DYNAMODB_IMAGES_TABLE environment variable is not set" }
        }

        const PutParams = {
            TableName: this.tableName,
            Item: { primary_key: generateId(), imageUrl, createdAt }
        }

        try {
            await this.dynamoDb.put(PutParams).promise();
            return { imageUrl };
        } catch (error) {
            console.error('Error inserting into DynamoDB', error);
            return { error: 'Failed to insert image data into DynamoDB' };
        }
    }
    async getAllImages(): Promise<Image[] | number | unknown> {
        try {
            const params = {
                TableName: this.tableName
            };

            const result = await this.dynamoDb.scan(params).promise()

            if (result.Count === 0) {
                return {
                    error: "Does not exist records"
                }
            }
            const results: Image[] = await result.Items.map((image: Image) => ({
                imageUrl: image.imageUrl,
                createdAt: image.createdAt,
            }));
            return results;
        } catch (error) {
            console.error('Error getting images', error);
            return {
                error: "Error getting Records"
            }
        }
    }

}

