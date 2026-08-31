/**
 * Represents a controlled application error
 * associated with an HTTP status code.
 */
export class AppError extends Error {

    public statusCode: number;

    constructor(
        message: string,
        statusCode: number
    ) {
        super(message);

        this.statusCode = statusCode;

        Object.setPrototypeOf(
            this,
            new.target.prototype
        );
    }
}