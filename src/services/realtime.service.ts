import { Client } from "@stomp/stompjs";

export type RealtimeTopic = "notifications" | "reports" | "medications";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "https://ehrbackend-production-a3a0.up.railway.app/api";
const WS_URL = API_BASE.replace(/\/api\/?$/, "/ws").replace(/^http/, "ws");

type Listener = (data: unknown) => void;

const TOPICS: RealtimeTopic[] = ["notifications", "reports", "medications"];

/**
 * STOMP-over-WebSocket client. The backend pushes saved entities to
 * /user/queue/<topic>; writes go to /app/<destination> and are persisted
 * server-side before being broadcast back.
 */
class RealtimeService {
  private client: Client | null = null;
  private listeners = new Map<RealtimeTopic, Set<Listener>>();

  connect(token: string) {
    this.disconnect();
    this.client = new Client({
      brokerURL: WS_URL,
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      onConnect: () => {
        TOPICS.forEach((topic) =>
          this.client?.subscribe(`/user/queue/${topic}`, (frame) => {
            try {
              this.emit(topic, JSON.parse(frame.body));
            } catch {
              /* ignore malformed frames */
            }
          })
        );
      },
    });
    this.client.activate();
  }

  disconnect() {
    void this.client?.deactivate();
    this.client = null;
  }

  /** Subscribe to a topic; returns the unsubscribe function. */
  on(topic: RealtimeTopic, listener: Listener): () => void {
    const set = this.listeners.get(topic) ?? new Set();
    set.add(listener);
    this.listeners.set(topic, set);
    return () => set.delete(listener);
  }

  /**
   * Send data through the websocket (stored in DB server-side).
   * Returns false when the socket is down so callers can fall back to REST.
   */
  publish(destination: string, body: unknown): boolean {
    if (!this.client?.connected) return false;
    this.client.publish({
      destination: `/app/${destination}`,
      body: JSON.stringify(body),
    });
    return true;
  }

  private emit(topic: RealtimeTopic, data: unknown) {
    this.listeners.get(topic)?.forEach((listener) => listener(data));
  }
}

export const realtime = new RealtimeService();
