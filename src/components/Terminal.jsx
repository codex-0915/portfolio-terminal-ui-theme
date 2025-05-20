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
      "about, skills, projects, articles, clear"
    ],
    about: () => [`${about.name} - ${about.title}`, about.description],
    skills: () => [...skills.languages, ...skills.tools],
    projects: () =>
      projects.map(p => `${p.name}: ${p.description} [${p.link}]`),
    clear: () => [],
    articles: async () => {
      const res = await fetch('/src/content/articles/article1.md');
      const text = await res.text();
      return marked.parse(text).split('\n').filter(line => line.trim() !== '');
    }
  };

  const handleCommand = async () => {
    const cmd = input.trim();

    if (cmd === 'clear') {
      setLines([]);
    } else if (commands[cmd]) {
      const result = await commands[cmd]();
      setLines(prev => [...prev, `> ${cmd}`, ...(result || [])]);
    } else {
      setLines(prev => [...prev, `> ${cmd}`, `Command not found: ${cmd}`]);
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
