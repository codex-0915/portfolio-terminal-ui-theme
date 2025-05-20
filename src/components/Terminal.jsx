import { useState, useEffect } from 'react';
import about from '../content/about.json';
import skills from '../content/skills.json';
import projects from '../content/projects.json';
import { marked } from 'marked';

export default function Terminal() {
  const [lines, setLines] = useState([
    "Welcome to [your_usernanme]'s portfolio!",
    "Type 'help' to see available commands."
  ]);
  const [input, setInput] = useState('');

  const commands = {
    help: () => [
      "Available commands:",
      "about, skills, projects, articles, article [slug], clear"
    ],

    about: () => [`${about.name} - ${about.title}`, about.description],

    skills: () => [...skills.languages, ...skills.tools],

    projects: () => projects.map(p => `${p.name}: ${p.description} [${p.link}]`),

    articles: async () => {
      try {
        const res = await fetch('public/articles/index.json');
        if (!res.ok) throw new Error("Missing index.json");
        const list = await res.json();
        return ["Available articles:"].concat(
          list.map(a => `- ${a.slug}  (${a.title})`)
        );
      } catch (err) {
        return [`Error: Unable to load articles list.`];
      }
    },

    article: async (slug) => {
      if (!slug) return ["Usage: article [slug]"];
      try {
        const res = await fetch(`public/articles/${slug}.md`);
        if (!res.ok) throw new Error("Not found");
        const text = await res.text();
        return marked.parse(text).split('\n').filter(l => l.trim() !== '');
      } catch {
        return [`Article '${slug}' not found.`];
      }
    },

    clear: () => []
  };


  const handleCommand = async () => {
    const cmd = input.trim();
    const [command, ...args] = cmd.split(" ");

    if (command === 'clear') {
      setLines([]);
    } else if (commands[command]) {
      const result = await commands[command](...args);
      setLines(prev => [...prev, `> ${cmd}`, ...(result || [])]);
    } else {
      setLines(prev => [...prev, `> ${cmd}`, `Command not found: ${command}`]);
    }

    setInput('');
  };

  return (
    <div className="terminal">
      {lines.map((line, idx) => (
        <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
      <div>
        <span>> </span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCommand()}
          autoFocus
        />
      </div>
    </div>
  );
}
