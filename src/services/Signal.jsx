import { HubConnectionBuilder } from "@microsoft/signalr";

const signal = new HubConnectionBuilder()
  .withUrl("https://stage-elect.tech231apps.net/votingresults")
  .withAutomaticReconnect()
  .build();
signal.start().catch((err) => console.log(err));

export default signal;
