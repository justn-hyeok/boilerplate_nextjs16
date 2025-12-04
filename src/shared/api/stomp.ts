import { Client, type IMessage } from "@stomp/stompjs";

import { env } from "@shared/config/env";

type MessageHandler = (message: IMessage) => void;

class StompClient {
  private client: Client | null = null;
  private subscriptions: Map<string, MessageHandler> = new Map();

  connect(onConnect?: () => void) {
    this.client = new Client({
      brokerURL: env.WS_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("STOMP Connected");
        // 재연결 시 기존 구독 복구
        this.subscriptions.forEach((handler, destination) => {
          this.client?.subscribe(destination, handler);
        });
        onConnect?.();
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers["message"]);
      },
    });

    this.client.activate();
  }

  disconnect() {
    this.client?.deactivate();
    this.subscriptions.clear();
  }

  subscribe(destination: string, handler: MessageHandler) {
    this.subscriptions.set(destination, handler);

    if (this.client?.connected) {
      this.client.subscribe(destination, handler);
    }
  }

  unsubscribe(destination: string) {
    this.subscriptions.delete(destination);
  }

  send(destination: string, body: unknown) {
    if (this.client?.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  }

  get isConnected() {
    return this.client?.connected ?? false;
  }
}

export const stompClient = new StompClient();
