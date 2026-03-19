import { useEffect, useRef, useState } from 'react';
import {
  certificates,
  education,
  experience,
  profile,
  projects,
  skillGroups
} from '../data/portfolio';

const quotes = [
  'Keep building. Small progress compounds fast.',
  'Clean work creates confidence.',
  'Every section you finish is momentum.',
  'Consistency turns practice into skill.'
];

const commandMap = {
  home: 'home',
  top: 'home',
  about: 'about',
  skills: 'skills',
  skill: 'skills',
  certificates: 'certificates',
  certificate: 'certificates',
  projects: 'projects',
  project: 'projects',
  contact: 'contact',
  resume: 'contact',
  mail: 'contact'
};

const initialMessages = [
  {
    role: 'bot',
    text: `Hello, welcome to ${profile.name}'s portfolio. I can share a professional summary of the profile, experience, skills, projects, certificates, and contact details.`
  }
];

const suggestionPrompts = [
  'Ask about skills',
  'Show project summary',
  'Tell me about internships',
  'How to contact'
];

function getProjectsSummary() {
  const names = projects.map((project) => project.title).join(', ');
  return `${profile.name} has ${projects.length} featured projects: ${names}.`;
}

function getSkillsSummary() {
  const names = skillGroups.flatMap((group) => group.items.map((item) => item.name));
  return `Core skills include ${names.slice(0, 8).join(', ')}${names.length > 8 ? ', and more.' : '.'}`;
}

function getCertificatesSummary() {
  const names = certificates.map((certificate) => certificate.title).join(', ');
  return `Certificates include ${names}.`;
}

function getExperienceSummary() {
  const items = experience.map((item) => `${item.role} at ${item.company} (${item.period})`);
  return `Internship experience includes ${items.join('; ')}.`;
}

function getEducationSummary() {
  const items = education.map((item) => `${item.degree} at ${item.institution} (${item.period})`);
  return `Education: ${items.join('; ')}.`;
}

function getFullPortfolioSummary() {
  const profileSummary = `${profile.name} is a ${profile.title} based in ${profile.location}. ${profile.summary}`;
  const skillsSummary = getSkillsSummary();
  const projectsSummary = getProjectsSummary();
  const certificatesSummary = getCertificatesSummary();
  const experienceSummary = getExperienceSummary();
  const educationSummary = getEducationSummary();
  const contactSummary = `Contact: ${profile.email}. Resume and social links are in the contact section.`;

  return [
    profileSummary,
    educationSummary,
    experienceSummary,
    skillsSummary,
    projectsSummary,
    certificatesSummary,
    contactSummary
  ].join(' ');
}

function getProfessionalGreetingReply() {
  return `Hello! Thank you for visiting ${profile.name}'s portfolio. ${getFullPortfolioSummary()}`;
}

function getPoliteAcknowledgeReply() {
  return `Thank you for your message. ${getFullPortfolioSummary()}`;
}

function detectSectionRequest(message) {
  const normalized = message.toLowerCase();
  const sectionId = Object.entries(commandMap).find(([key]) => normalized.includes(key))?.[1];

  if (!sectionId) {
    return null;
  }

  if (
    normalized.startsWith('go ') ||
    normalized.startsWith('open ') ||
    normalized.startsWith('show ') ||
    normalized.includes('go to') ||
    normalized.includes('take me') ||
    normalized.includes('scroll')
  ) {
    return sectionId;
  }

  return null;
}

function getBotReply(message) {
  const normalized = message.trim().toLowerCase();

  if (!normalized) {
    return {
      text: getProfessionalGreetingReply()
    };
  }

  if (normalized === 'clear') {
    return {
      clear: true,
      text: `Chat cleared. ${getFullPortfolioSummary()}`
    };
  }

  if (normalized === 'help') {
    return {
      text: getFullPortfolioSummary()
    };
  }

  if (normalized === 'quote') {
    return {
      text: quotes[Math.floor(Math.random() * quotes.length)]
    };
  }

  const sectionToOpen = detectSectionRequest(normalized);
  if (sectionToOpen) {
    return {
      text: `Opening ${sectionToOpen}. ${getFullPortfolioSummary()}`,
      navigateTo: sectionToOpen
    };
  }

  if (
    normalized === 'hi' ||
    normalized === 'hello' ||
    normalized === 'hey' ||
    normalized === 'good morning' ||
    normalized === 'good afternoon' ||
    normalized === 'good evening'
  ) {
    return {
      text: getProfessionalGreetingReply()
    };
  }

  if (
    normalized === 'no' ||
    normalized === 'nope' ||
    normalized === 'nah' ||
    normalized === 'okay' ||
    normalized === 'ok' ||
    normalized === 'thanks' ||
    normalized === 'thank you'
  ) {
    return {
      text: getPoliteAcknowledgeReply()
    };
  }

  return {
    text: getFullPortfolioSummary()
  };
}

function RobotIcon() {
  return (
    <svg viewBox="0 0 64 64" className="robot-nav__icon" fill="none" aria-hidden="true">
      <rect x="14" y="18" width="36" height="28" rx="12" fill="currentColor" opacity="0.12" />
      <path
        className="robot-nav__outline"
        d="M32 10v8M22 7h20M20 24h24a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8v-6a8 8 0 0 1 8-8Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="robot-nav__eye robot-nav__eye--left" cx="25" cy="35" r="3" fill="currentColor" />
      <circle className="robot-nav__eye robot-nav__eye--right" cx="39" cy="35" r="3" fill="currentColor" />
      <path
        className="robot-nav__mouth"
        d="M26 44c1.8 1.3 3.7 2 6 2s4.2-.7 6-2M12 31H7m50 0h-5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RobotNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [command, setCommand] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 2800);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const messageList = messagesRef.current;

      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    }
  }, [isOpen, messages]);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    const headerOffset = 76;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(elementPosition - headerOffset, 0);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsOpen(false);
  };

  const appendMessage = (role, text) => {
    setMessages((current) => [...current, { role, text }].slice(-6));
  };

  const handleCommandSubmit = (event) => {
    event.preventDefault();

    const normalizedCommand = command.trim().toLowerCase();

    if (!normalizedCommand) {
      appendMessage('bot', 'Ask me something about the portfolio, or say "open projects".');
      return;
    }

    appendMessage('user', normalizedCommand);
    setCommand('');
    const reply = getBotReply(normalizedCommand);

    if (reply.clear) {
      setMessages([{ role: 'bot', text: reply.text }]);
      return;
    }

    appendMessage('bot', reply.text);

    if (normalizedCommand.includes('quote')) {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }

    if (reply.navigateTo) {
      window.setTimeout(() => {
        handleScroll(reply.navigateTo);
      }, 320);
    }
  };

  return (
    <div ref={containerRef} className={`robot-nav${isOpen ? ' robot-nav--open' : ''}`}>
      <div id="robot-nav-panel" className="robot-nav__panel" aria-hidden={!isOpen}>
        <div className="robot-nav__card">
          <div className="robot-nav__card-top">
            <div className="robot-nav__identity">
              <div className="robot-nav__avatar" aria-hidden="true">
                <RobotIcon />
              </div>
              <div>
                <p className="robot-nav__label">Portfolio Bot</p>
                <p className="robot-nav__title">Chat assistant</p>
              </div>
            </div>
            <span className="robot-nav__status" aria-hidden="true">
              Online
            </span>
          </div>

          <div className="robot-nav__chat-shell">
            <p className="robot-nav__chat-label">Ask about this portfolio</p>
            <div ref={messagesRef} className="robot-nav__messages" aria-live="polite">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`robot-nav__message robot-nav__message--${message.role}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <p className="robot-nav__chat-hint">
              Try: <span>{suggestionPrompts[quoteIndex]}</span>
            </p>
            <form className="robot-nav__chat-form" onSubmit={handleCommandSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                className="robot-nav__input"
                placeholder="Ask about skills, projects, contact..."
                aria-label="Type a question about the portfolio"
              />
              <button type="submit" className="robot-nav__send" aria-label="Send command">
                <svg viewBox="0 0 24 24" className="robot-nav__send-icon" fill="none" aria-hidden="true">
                  <path
                    d="M4 12 20 4l-4 16-3.5-5L4 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="robot-nav__trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="robot-nav-panel"
        aria-label={isOpen ? 'Close quick navigation' : 'Open quick navigation'}
      >
        <span className="robot-nav__spark robot-nav__spark--one" aria-hidden="true" />
        <span className="robot-nav__spark robot-nav__spark--two" aria-hidden="true" />
        <RobotIcon />
      </button>
    </div>
  );
}
