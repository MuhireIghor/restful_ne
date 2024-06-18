import { Response } from "express";

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


export const unauthorizedResponse = (
    message: string,
    res: Response
) => {
    return res.status(201).json({
        status: 401,
        message: message
    });
};

export const errorResponse = (message: string, res: Response) => {
    return res.status(400).json({
        status: 400,
        message: message,
    });
};

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


export const serverErrorResponse = (ex: any, res: Response) => {
    res.status(500).json({
        status: 500,
        message: `Server Error ${ex}`,
        description: ex.message
    });
};
export const badRequestResponse = (message: string, res: Response) => {
    res.status(400).json({
        status: 400,
        message: message,
    })
}