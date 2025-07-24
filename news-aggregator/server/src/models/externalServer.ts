export interface ExternalServer {
  id: number;
  name: string;
  apiKey: string;
  status: "active" | "not_active";
  lastAccessed: Date | null;
}
