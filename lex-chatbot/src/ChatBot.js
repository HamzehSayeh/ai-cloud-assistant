import React, { useState, useRef, useEffect } from "react";
import { getLexRuntime } from "./aws-config";
import { sendMessageToGraphQL, fetchUserMessages } from "./graphql/mutations";

const botId      = "TMOFOS22GJ";
const botAliasId = "TSTALIASID";
const localeId   = "en_US";

const SUGGESTIONS = [
  "List EC2 instances",
  "What EC2 instances are running?",
  "List S3 buckets",
  "What S3 buckets are running?"
];

const ChatBot = () => {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState("");
  const [dark, setDark]           = useState(false);
  const [showChips, setShowChips] = useState(true);
  const bodyRef                   = useRef(null);

  useEffect(()=>{
    bodyRef.current?.lastElementChild?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  useEffect(()=>{
    (async()=>{
      const hist = await fetchUserMessages();
      const formatted = hist.map(m=>({type:m.sender,text:m.message}));

      const greet = hist.length
        ? "Can I help you with anything else?"
        : "Hi there! 👋  How can I help you today?";

      formatted.push({type:"bot",text:greet});
      setMessages(formatted);
      setShowChips(true);
    })();
  },[]);

  const followUp = async ()=>{
    const follow = "Can I help you with anything else?";
    setMessages(p=>[...p,{type:"bot",text:follow}]);
    await sendMessageToGraphQL(follow,"bot");
    setShowChips(true);
  };

  const dispatchText = async txt=>{
    if(!txt) return;
    setInput("");
    setShowChips(false);
    setMessages(p=>[...p,{type:"user",text:txt}]);
    await sendMessageToGraphQL(txt,"user");

    let reply;
    try{
      const lex = await getLexRuntime();
      const res = await lex.recognizeText({
        botId,botAliasId,localeId,
        sessionId:"user-"+Date.now(), text:txt
      }).promise();
      reply = res.messages[0]?.content || "No response";
    }catch{
      reply = "⚠️  couldn't reach the bot";
    }

    setMessages(p=>[...p,{type:"bot",text:reply}]);
    await sendMessageToGraphQL(reply,"bot");
    await followUp();
  };
  const sendMessage = ()=>dispatchText(input.trim());

  useEffect(()=>{
    document.documentElement.classList.toggle("dark-mode",dark);
  },[dark]);

  return(
    <div className="chat-root">
      {/* header */}
      <header className="chat-header">
        <h1>AI Assistant</h1>
        <button onClick={()=>setDark(d=>!d)} aria-label="toggle theme">
          {dark?"🌞":"🌙"}
        </button>
      </header>

      {/* body */}
      <section className="chat-body" ref={bodyRef}>
        {messages.map((m,i)=>(
          <div key={i} className={`bubble-row ${m.type}`}>
            <div className="avatar">
              {m.type==="user"?"🧑":"🤖"}
            </div>
            <div className="bubble">
              {m.text}
            </div>
          </div>
        ))}
      </section>

      {/* footer */}
      <footer className="chat-footer">
        {showChips && (
          <div className="chips">
            {SUGGESTIONS.map((s,i)=>(
              <button key={i} onClick={()=>dispatchText(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="input-wrap">
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&sendMessage()}
            placeholder="Type a message…"
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        /* Root grid */
        .chat-root{
          position:fixed; inset:0; display:grid;
          grid-template-rows:auto 1fr auto;
          font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
          --bg:#ffffff; --fg:#1f2937; --bubble-user:#dcfce7; --bubble-bot:#e5e7eb;
        }
        .dark-mode .chat-root{
          --bg:#0f172a; --fg:#f8fafc; --bubble-user:#4b5563; --bubble-bot:#1e293b;
        }
        .chat-root{background:var(--bg); color:var(--fg);}
        /* Header */
        .chat-header{
          padding:12px 20px; display:flex;justify-content:space-between;align-items:center;
          border-bottom:1px solid rgba(0,0,0,.06);
        }
        .chat-header h1{font-size:17px;margin:0}
        .chat-header button{font-size:20px;background:none;border:none;cursor:pointer}
        /* Body */
        .chat-body{
          overflow-y:auto; padding:20px 24px; display:flex; flex-direction:column; gap:14px;
        }
        .bubble-row{display:flex; gap:8px; align-items:flex-start;}
        .bubble-row.user{flex-direction:row-reverse;}
        .avatar{
          width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;
          background:var(--bubble-user);
          font-size:17px;
        }
        .user .avatar{background:var(--bubble-user);}
        .bot .avatar{background:var(--bubble-bot);}
        .bubble{
          max-width:70%; padding:12px 14px;border-radius:16px;white-space:pre-wrap;line-height:1.45;
          background:var(--bubble-bot);
        }
        .user .bubble{background:var(--bubble-user);}
        /* Footer */
        .chat-footer{padding:14px 20px;border-top:1px solid rgba(0,0,0,.06);display:flex;flex-direction:column;gap:12px;}
        .chips{display:flex;flex-wrap:wrap;gap:8px;}
        .chips button{
          padding:6px 12px;border-radius:9999px;border:1px solid rgba(0,0,0,.1);
          background:#f1f5f9;font-size:13px;cursor:pointer;
        }
        .input-wrap{display:flex;gap:10px;}
        .input-wrap input{
          flex:1;padding:10px 14px;border-radius:9999px;border:1px solid rgba(0,0,0,.15);outline:none;
          background:var(--bg);color:var(--fg);
        }
        .input-wrap button{
          padding:0 22px;border-radius:9999px;border:none;background:#2563eb;color:#fff;font-size:18px;cursor:pointer;
        }
        /* Scrollbar hide (WebKit) */
        .chat-body::-webkit-scrollbar{width:0;height:0}
        /* Fade */
        @keyframes fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        .bubble{animation:fade .25s ease;}
      `}</style>
    </div>
  );
};

export default ChatBot;
