
import AWS from "aws-sdk";
import { generateId } from "../utils";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_IMAGES_TABLE;

type CreateImage = { imageUrl: string } | { error: unknown }

interface NewImage {
    width: number;
    height: number;
    isGrayScale?: boolean;
    isYoung?: boolean;
}

interface Image {
    imageUrl: string;
    createdAt: string
}

export const createNewImage = async (newImage: NewImage): Promise<CreateImage> => {

    const { width, height, isGrayScale, isYoung } = newImage;

    if (width <= 0 || height <= 0) {
        return { error: 'Width and height must be positive integers' };
    }

    const imageUrl = `https://placekeanu.com/${width}/${height}/${isGrayScale ? 'g' : ''}${isYoung ? 'y' : ''}`;
    const createdAt = new Date().toISOString();


    if (!tableName) {
        return { error: "DYNAMODB_IMAGES_TABLE environment variable is not set" }
    }

    const PutParams = {
        TableName: tableName,
        Item: { primary_key: generateId(), imageUrl, createdAt }
    }

    try {
        await dynamoDb.put(PutParams).promise();
        return { imageUrl };
    } catch (error) {
        console.error('Error inserting into DynamoDB', error);
        return { error: 'Failed to insert image data into DynamoDB' };
    }
}

export const getAllImages = async (): Promise<Image[] | number | unknown> => {
    try {
        const params = {
            TableName: tableName
        };

        const result = await dynamoDb.scan(params).promise()

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
