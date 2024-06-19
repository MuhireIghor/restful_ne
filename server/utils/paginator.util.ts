// Define a type for the pagination options.
type PaginateOptions = { page: number, limit: number, total: number };

/**
 * Generates pagination metadata based on the provided options.
 * @param options - The pagination options including page number, limit per page, and total items.
 * @returns An object containing pagination metadata such as total items, last page number, current page number,
 *          items per page, previous page number (if available), and next page number (if available).
 */
export const paginator = ({ page, limit, total }: PaginateOptions) => {

    // Calculate the last page number based on total items and items per page.
    const lastPage = Math.ceil(total / limit);

    // Return the pagination metadata.
    return {
        total,
        lastPage,
        currentPage: page,
        perPage: limit,
        prev: page > 0 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
    };
};
