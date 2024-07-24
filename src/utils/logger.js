const fs = require("fs");
const path = require("path");
const config = require("./config");
const { format } = require('date-fns');

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../request.log"),
  { flags: "a" },
);

let logToConsole = true;
if (config.NODE_ENV === "production") {
  logToConsole = false;
}

const writeLogToFile = (data) => {
  fs.appendFileSync(path.join(__dirname, "../applog.md"), data, "utf8");
};

const time = () => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};

const formatData = (data) => {
  let logEntry = `##${time()}\n.\n`;

  if (typeof data === "object") {
    try {
      logEntry += `\`\`\`javascript\n${JSON.stringify(data, null, 2)}\n\`\`\`\n`;
    } catch (error) {
      logEntry += ` | data: [Error serializing data: ${error.message}]`;
    }
    return logEntry
  } else {
    return `${data}\n`;
  }
};

const infoLogger = (data) => {
  let logEntry = `## Info \n.\n` + formatData(data);

  if (logToConsole) {
    console.info(logEntry);
  }

  writeLogToFile(logEntry);
};

const errorLogger = (data) => {
  let logEntry = `## Error\n.\n` + formatData(data);

  if (logToConsole) {
    console.error(logEntry);
  }

  writeLogToFile(logEntry);
};

module.exports = {
  infoLogger,
  errorLogger,
  accessLogStream,
};
