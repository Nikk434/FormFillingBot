import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // WhatsApp API proxy route
  app.post("/api/send-message", async (req, res) => {
    try {
      const { message } = req.body;

      // Create the body structure expected by the Flask backend
      const body = {
        entry: [
          {
            changes: [
              {
                value: {
                  messages: [],
                },
              },
            ],
          },
        ],
      };

      // Add the message to the body if it exists
      if (message) {
        (body.entry[0].changes[0].value.messages as any[]).push({
          from: "917040017471", // Using number from sample code
          text: { body: message },
          type: "text",
          id: Date.now(), // Using timestamp as ID
        });
      }

      // Using the backend URL from the Flask code
      const backendUrl =
        "https://form-filling-bot-backend.nllnwr.easypanel.host/api/webhook";

      // Make the API request to the Flask backend
      const response = await axios.post(backendUrl, body, {
        headers: { "Content-Type": "application/json" },
      });

      // Check the response
      if (response.status === 200) {
        const responseData = response.data;

        if (responseData.status === "success") {
          // Detect known button format (Yes/No) and convert to WhatsApp-style interactive buttons
          if (
            typeof responseData.message === "string" &&
            responseData.message.includes("(Yes/No)")
          ) {
            const messageText = responseData.message
              .replace("(Yes/No)", "")
              .trim();

            const whatsappMessage = {
              messaging_product: "whatsapp",
              to: "917040017471",
              type: "interactive",
              text: {
                body: messageText,
              },
              interactive: {
                type: "button",
                action: {
                  buttons: [
                    { type: "reply", reply: { id: "yes", title: "Yes" } },
                    { type: "reply", reply: { id: "no", title: "No" } },
                  ],
                },
              },
            };

            return res.json({
              status: "success",
              message: whatsappMessage,
            });
          }

          // Detect general pattern like (Option1 / Option2 / Option3) and flag it
          if (typeof responseData.message === "string") {
            const messageText = responseData.message;
            const optionPattern = /\(([^)]+\/[^)]+)\)/; // Match anything like (A / B)

            const match = messageText.match(optionPattern);
            if (match) {
              return res.json({
                status: "success",
                message: {
                  text: {
                    body: messageText,
                    isOptionMessage: true,
                  },
                },
              });
            }
          }

          // Default: plain message
          return res.json({
            status: "success",
            message: responseData.message,
          });
        } else {
          return res.json({
            status: "error",
            message: responseData.message || "Error in processing",
          });
        }
      } else {
        return res.status(response.status).json({
          status: "error",
          message: `HTTP Error: ${response.status} - ${response.statusText}`,
        });
      }
    } catch (error) {
      console.error("Error communicating with bot:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(500).json({
        status: "error",
        message: errorMessage,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
