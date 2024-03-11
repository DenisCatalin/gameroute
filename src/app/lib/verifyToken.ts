import jwt from "jsonwebtoken";

export async function verifyToken(token: any) {
  if (token) {
    const decodedToken = jwt.verify(
      token,
      "o3kWYB/Av9w/TNqtTj8Uxa7ULvnUz3nYJweKsB/JWs4HWWZUII0EFpfb5xKIGKMM"
    );
    return decodedToken;
  }

  return null;
}
