import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns A promise that resolves to the hashed password.
 */

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of rounds to use for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

/**
 * Compares a password with a hashed password.
 * @param password - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}


/**
 * Generate JWT token for user authentication.
 * @param data - The data to encode in the JWT.
 * @returns A promise that resolves to the generated JWT token.
 */
export async function generateToken(data: object): Promise<string> {
    const secretKey = process.env.JWT_SECRET || "some-random-secret-key";
    const token = jwt.sign(data, secretKey, { expiresIn: '1h' });
    return token;     
}

/** * Verifies a JWT token.
 * @param token - The JWT token to verify.
 * @returns A promise that resolves to the decoded token data if valid, or null if invalid.
 */
export async function verifyToken(token: string): Promise<object | null> {
    const secretKey = process.env.JWT_SECRET || "some-random-secret-key";
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded as object;
    } catch (error) {
        return null;
    }
}
