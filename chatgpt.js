import OpenAI from "openai";
import axios from "axios";
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

//First retrieve data from mongodb -> process into a CSV (a big string) -> send it to chatgpt
//Ask chatgpt to return a json, also specify fields so i can process it every time

export async function agenda(req, res) {
  const response = await axios.get(
    "https://todolist-react-srv.onrender.com/api/loadAll"
  );

  const tasks = JSONToCSV(response);
  console.log(tasks);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "generate an hourly daily agenda given this CSV of tasks without any formatting characters" + tasks }
        ],
      },
    ],
  });

  console.log(completion.choices[0].message);
  res.send(completion.choices[0].message);
}

function JSONToCSV(data) {
  let ans = "name,duedate\n";

  data.data.forEach((element) => {
    const row = element.name + "," + element.dueDate + "\n";
    ans += row;
  });

  return ans;
}
//"generate a daily agenda given this CSV of tasks" + tasks