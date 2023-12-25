import { ChatGPTAPI } from "chatgpt";

async function Chatgptcal(findUser) {
  const api = new ChatGPTAPI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    completionParams: {
      model: "gpt-4-0314",
      temperature: 0.5,
      top_p: 0.8,
    },
  });
  const res = await api.sendMessage(`오늘이 무슨날이니`);
  return res.text;
}

export default Chatgptcal;
