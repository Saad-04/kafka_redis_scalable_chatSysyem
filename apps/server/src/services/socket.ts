import { Server } from "socket.io";
// import Redis from "ioredis";
// import prismaClient from "./prisma";
// import { produceMessage } from "./kafka";

// const pub = new Redis({
//   host: "",
//   port: 0,
//   username: "default",
//   password: "",
// });

// const sub = new Redis({
//   host: "",
//   port: 0,
//   username: "",
//   password: "",
// });

class SocketService {
  private _io: Server; // this is the property just like we create a property using this.name =  '''

  constructor() {
    console.log("init start Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    // sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;

    console.log("Init start Socket Listeners...");

    io.on("connection", (soc) => {
      console.log(`New Socket Connected`, soc.id);

      soc.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message Received: ", message);
        // publish this message to redis
        // await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);
        await produceMessage(message);
        console.log("Message Produced to Kafka Broker");
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
