const telegraf = require("telegraf");

const token = "2037763666:AAFh2udNYEvDLOrZ9aw4ZPPn_lz2AVRiOK0";
const app = new telegraf(token);

const helpMessage = ` 
say somting
/start - start the bot
/help - commond reference
/echo - you tell me echo
/echo <msg> - echo a message
`;
app.use((ctx, next) => {
  ctx.updateSubTypes[0] == "text"
    ? app.telegram.sendMessage(
        -522955335,
        ctx.from.username + " said: " + ctx.message.text
      )
    : app.telegram.sendMessage(
        -522955335,
        ctx.from.username + " sent " + ctx.updateSubTypes[0]
      );

  next();
});

app.start((ctx) => {
  ctx.reply("welcome!");
  ctx.reply(helpMessage);
});

app.help((ctx) => {
  ctx.reply(helpMessage);
});

app.command("echo", (ctx) => {
  let userMessage = ctx.message.text;
  let inputArray = userMessage.split(" ");

  let message = "";
  if (inputArray.length == 1) {
    message = "you tell me echo";
  } else {
    inputArray.shift();
    message = inputArray.join(" ");
  }
  ctx.reply(message);
});

app.launch();

// const dog = {
//   name: "manman",
//   bread: "poodle",
//   color: "black",
// };

// const saveData = (data) => {
//   const finished = (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//   };
//   const jsonData = JSON.stringify(data, null, 2);
//   fs.writeFile("data.json", jsonData, finished);
// };
// saveData(dog);
