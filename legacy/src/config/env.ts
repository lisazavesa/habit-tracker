import "dotenv/config";

export const env = {
    port: Number(process.env.PORT) || 4540,
    nodeEnv: process.env.NODE_ENV ?? "development",
};

