import { Response } from "express";
/**
 * Sends a success response with status 200.
 * @param message - The message to include in the response.
 * @param body - The data to include in the response body.
 * @param res - The Express Response object.
 * @returns The JSON response with status 200, message, and data.
 */
export const successResponse = (
    message: string,
    body: Object,
    res: Response
) => {
    return res.status(200).json({
        status: 200,
        message: message,
        data: body,
    });
};

/**
 * Sends a success response for resource creation with status 201.
 * @param message - The message to include in the response.
 * @param body - The data to include in the response body.
 * @param res - The Express Response object.
 * @returns The JSON response with status 201, message, and data.
 */

export const createSuccessResponse = (
    message: string,
    body: Object,
    res: Response
) => {
    return res.status(201).json({
        status: 201,
        message: message,
        data: body,
    });
};

/**
 * Sends an unauthorized response with status 401.
 * @param message - The message to include in the response.
 * @param res - The Express Response object.
 * @returns The JSON response with status 401 and message.
 */
export const unauthorizedResponse = (
    message: string,
    res: Response
) => {
    return res.status(401).json({
        status: 401,
        message: message
    });
};

/**
 * Sends an error response with status 400.
 * @param message - The error message to include in the response.
 * @param res - The Express Response object.
 * @returns The JSON response with status 400 and error message.
 */
export const errorResponse = (message: string, res: Response) => {
    return res.status(400).json({
        status: 400,
        message: message,
    });
};


/**
 * Sends a not found response with status 404.
 * @param field - The field related to the not found entity.
 * @param value - The value of the field that was searched.
 * @param entity - The type of entity that was not found.
 * @param res - The Express Response object.
 * @returns The JSON response with status 404 and message indicating the entity was not found.
 */
export const notFoundResponse = (
    field: string,
    value: any,
    entity: any,
    res: Response
) => {
    return res.status(404).json({
        status: 404,
        message: entity + ' with ' + field + ' of [' + value + '] not found',
    });
};


/**
 * Sends a no content found response with status 204.
 * @param entity - The type of entity for which no content was found.
 * @param res - The Express Response object.
 * @returns The JSON response with status 204 and message indicating no content was found.
 */
export const noContentFoundResponse = (
    entity: any,
    res: Response
) => {
    return res.status(204).json({
        status: 404,
        message: 'No' + entity + 's Found! ',
        data:[]
    });
};

/**
 * Sends a server error response with status 500.
 * @param ex - The exception object representing the server error.
 * @param res - The Express Response object.
 * @returns The JSON response with status 500, a generic error message, and the exception message.
 */

export const serverErrorResponse = (ex: any, res: Response) => {
    res.status(500).json({
        status: 500,
        message: `Server Error `,
        description: ex.message
    });
};

/**
 * Sends a bad request response with status 400.
 * @param message - The error message to include in the response.
 * @param res - The Express Response object.
 * @returns The JSON response with status 400 and error message.
 */
export const badRequestResponse = (message: string, res: Response) => {
    res.status(400).json({
        status: 400,
        message: message,
    })
}