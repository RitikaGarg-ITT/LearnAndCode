    import db from "../config/db";
    import { ExternalServer } from "../models/externalServer";
    import { RowDataPacket } from "mysql2";

    export class ExternalServerRepository {
    static async getAll(): Promise<ExternalServer[]> {
        const [rows] = await db.query<ExternalServer[] & RowDataPacket[]>("SELECT * FROM ext_server");
        return rows;
    }

    static async getById(id: number): Promise<ExternalServer | null> {
        const [rows] = await db.query<ExternalServer[] & RowDataPacket[]>("SELECT * FROM ext_server WHERE source_id = ?", [
        id,
        ]);
        return rows[0] || null;
    }

    static async updateApiKey(id: number, apiKey: string) {
        await db.query("UPDATE ext_server SET api_key = ? WHERE source_id = ?", [apiKey, id]);
    }

    static async addServer(server: { name: string; api_uri: string; api_key: string }) {
        await db.query(
        "INSERT INTO ext_server (name, api_uri, api_key, is_active) VALUES (?, ?, ?, ?)",
        [server.name, server.api_uri, server.api_key, 0]
        );
    }
    }
