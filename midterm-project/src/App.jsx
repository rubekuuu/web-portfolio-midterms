import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Code, Briefcase, Mail, Home, User, Facebook, Linkedin, Github, Layers, Wrench } from 'lucide-react'; 
import ReactLogo from './assets/react.svg';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;

      this.size = Math.random() * 80 + 30;
      this.speedX = Math.random() * 1.8 - 0.9;
      this.speedY = Math.random() * 1.8 - 0.9;
      this.opacity = Math.random() * 0.25 + 0.75;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (typeof window !== 'undefined') {
        const w = Particle.canvasWidth || window.innerWidth;
        const h = Particle.canvasHeight || window.innerHeight;
        if (this.x - this.size > w) this.x = -this.size;
        if (this.x + this.size < 0) this.x = w + this.size;
        if (this.y - this.size > h) this.y = -this.size;
        if (this.y + this.size < 0) this.y = h + this.size;
      }
      if (this.opacity > 0.02) {
        this.opacity -= 0.0015;
      }
    }

    draw(ctx) {
      ctx.shadowBlur = Math.min(180, this.size * 2.5);
      ctx.shadowColor = 'rgba(139, 92, 246, 0.7)';
      const fillAlpha = Math.min(1, this.opacity * 1.15);
      ctx.fillStyle = `rgba(139, 92, 246, ${fillAlpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    reset(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 80 + 30;
      this.speedX = Math.random() * 1.8 - 0.9;
      this.speedY = Math.random() * 1.8 - 0.9;
      this.opacity = Math.random() * 0.25 + 0.75;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const createParticles = () => {
      const numberOfParticles = Math.max(4, Math.floor((canvas.width * canvas.height) / 600000));
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };
    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      Particle.canvasWidth = canvas.width;
      Particle.canvasHeight = canvas.height;

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);

        if (particle.opacity <= 0.02) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          particle.reset(x, y);
        }
      });

      particles.forEach(a => {
        particles.forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 420) {
            ctx.shadowBlur = Math.min(120, (a.size + b.size) * 0.6);
            ctx.shadowColor = 'rgba(139, 92, 246, 0.6)';
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 * (1 - distance / 420)})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-transparent"
      style={{ pointerEvents: 'none' }}
    />
  );
};

const PROJECTS = [
  {
    title: "My Very First Web Portfolio",
    image: "port1.png",
    tags: ["HTML", "CSS", "Javascript"],
    repoUrl: "https://github.com/rubekuuu/first-ever-web-portfolio",
  },
  {
    title: "Web Tribute for Itachi Uchiha",
    image: "tribute.png",
    tags: ["HTML", "CSS", "Javascript"],
    repoUrl: "https://github.com/rubekuuu/itachi-web-tribute",
  },
  {
    title: "My First Ever Python Game",
    image: "snake.png",
    tags: ["Python"],
    libraries: ["Pygame"],
    repoUrl: "https://github.com/rubekuuu/python-game-snake",
  },
  {
    title: "Checkers Game",
    image: "check.png",
    tags: ["Python"],
    libraries: ["Pygame"],
    repoUrl: "https://github.com/rubekuuu/python-game-checkers",
  },
];

const SKILLS = [
  "Java",
  "Python",
  "React",
  "Vite",
  "Tailwind CSS",
  "JavaScript (ES6+)",
  "HTML5",
  "CSS3",
];

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`
      px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
      bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-700/50
      border border-violet-500/50
      focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#0d0d0d]
      flex items-center justify-center
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = "", id }) => (
  <div
    id={id}
    className={`
      glass-card p-6 md:p-8 rounded-3xl transition-all duration-500
      shadow-2xl hover:shadow-violet-500/30
      ${className}
    `}
  >
    {children}
  </div>
);

const GlassmorphismStyles = () => (
  <style jsx="true">{`
    .glass-card {
      /* Base dark transparency */
      background-color: rgba(16, 16, 16, 0.6);
      /* Frosted effect - crucial for glassmorphism */
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      /* Neon/Tech border look */
      border: 1px solid rgba(139, 92, 246, 0.2); /* Violet-based border */
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.1); /* Subtle violet glow shadow */
    }

    /* Subtle Grid Pattern for the Background */
    .grid-background {
        background-image: linear-gradient(to right, #1a1a1a 1px, transparent 1px),
                          linear-gradient(to bottom, #1a1a1a 1px, transparent 1px);
        background-size: 40px 40px;
        opacity: 0.5;
    }

    /* Central Radial Glow */
    .radial-glow {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 80vh;
        height: 80vh;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(139, 92, 246, 0.1), rgba(13, 13, 13, 0) 70%); /* Violet glow */
        pointer-events: none;
        z-index: 5;
    }
  `}</style>
);

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log("Feedback Submitted:", formData);
      setStatus("Message sent successfully! Thank you for your feedback.");
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } else {
      setStatus("Please fill out all fields.");
    }
  };

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const Navigation = () => {
    const links = [
      { name: 'Home', ref: homeRef, icon: Home },
      { name: 'About', ref: aboutRef, icon: User },
      { name: 'Projects', ref: projectsRef, icon: Code },
      { name: 'Contact', ref: contactRef, icon: Mail },
    ];

    return (
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <Card className="flex space-x-2 p-3 !rounded-full">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.ref)}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-violet-700/20 flex items-center"
            >
              {}
              <link.icon className="w-4 h-4 mr-1.5" /> 
              {link.name}
            </button>
          ))}
        </Card>
      </nav>
    );
  };

  const HomeSection = () => (
    <section ref={homeRef} className="relative h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <Card className="max-w-4xl p-10 md:p-16">
          <p className="text-lg text-violet-400 mb-4 tracking-widest uppercase font-mono">
            Computer Science Student // Always Learning
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 drop-shadow-xl">
            RODRIGO VICTOR BELTRAN
          </h1>
          {}
          <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
          An enthusiastic CS student dedicated to building a strong foundation in modern software development. Actively learning and applying knowledge in a variety of programming languages and frameworks.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button onClick={() => scrollToSection(projectsRef)} className="shadow-2xl shadow-violet-700/50">
              <Code className="w-4 h-4 mr-2" /> View Projects
            </Button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-sm font-medium text-white/80 hover:text-violet-400 transition-colors px-6 py-3 rounded-xl border border-violet-500/30 hover:bg-white/10"
            >
              Get In Touch
            </button>
          </div>
        </Card>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section ref={aboutRef} id="about" className="min-h-screen py-24 md:py-32 flex items-center justify-center p-4">
      <Card className="max-w-6xl w-full !rounded-[2.5rem]">
        <h2 className="text-5xl font-bold text-violet-400 mb-8 text-center">About My Focus</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-semibold text-white mb-4">Current Journey</h3>
            {}
            <p className="text-white/80 text-lg leading-relaxed">
I'm a dedicated Computer Science student with a strong passion for full-stack development, actively mastering foundational Languages including Java, Python, JavaScript, HTML, and CSS. My development environment is centered around cutting-edge Frameworks like React.js for dynamic front-end architecture, complemented by Node.js for robust server-side applications. I prioritize creating efficient, well-designed user interfaces, utilizing TailwindCSS for rapid styling and Figma for pre-development design work. To ensure a smooth workflow and deployment process, I leverage Vite for fast bundling and Git & GitHub for version control. I am committed to leveraging this comprehensive toolkit to build innovative and high-quality software solutions.
            </p>
            <div className="my-6 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
            
            <p className="text-white/60 text-base italic">
Outside of coding, I'm a devoted cat lover and frequently decompress by jumping into fast-paced FPS games. Despite my technical collaborative nature, I admittedly thrive as a bit of a social loner, often finding my best concentration when working independently.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 p-4 bg-black/20">
              <h3 className="text-3xl font-semibold text-white mb-3 flex items-center">
                <Code className="w-6 h-6 mr-3 text-violet-400" aria-hidden="true" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">🟧</span>
                  HTML
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">🟦</span>
                  CSS
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">✨</span>
                  JavaScript
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">☕</span>
                  Java
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">🐍</span>
                  Python
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 p-4 bg-black/20">
              <h3 className="text-3xl font-semibold text-white mb-3 flex items-center">
                <Layers className="w-6 h-6 mr-3 text-violet-400" aria-hidden="true" />
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <img src={ReactLogo} alt="React" className="w-5 h-5 mr-2" />
                  React.js
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">🟩</span>
                  Node.js
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">🌬️</span>
                  TailwindCSS
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 p-4 bg-black/20">
              <h3 className="text-3xl font-semibold text-white mb-3 flex items-center">
                <Wrench className="w-6 h-6 mr-3 text-violet-400" aria-hidden="true" />
                Tools
              </h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {}
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">⚡</span>
                  Vite
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <span aria-hidden className="w-5 h-5 mr-2 flex items-center justify-center">🎨</span>
                  Figma
                </span>
                <span className="px-4 py-2 flex items-center text-sm text-white/90 bg-black/30 rounded-full border border-violet-500/30 font-mono transition-colors hover:bg-violet-900/40">
                  <Github className="w-4 h-4 mr-2" />
                  Git & Github
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );

  const ProjectsSection = () => (
    <section ref={projectsRef} id="projects" className="min-h-screen py-24 md:py-32 p-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-violet-400 mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PROJECTS.map((project, index) => (
            <Card key={index} className="flex flex-col hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={`/images/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-300">
                  {project.title}
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2 w-full">
                    <div className="w-full">
                      <span className="text-white/70 text-sm mb-2">Languages:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs text-white bg-violet-700/50 rounded-full font-medium border border-violet-500/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.libraries && (
                      <div className="w-full mt-2">
                        <span className="text-white/70 text-sm mb-2">Libraries:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {project.libraries.map((lib) => (
                            <span
                              key={lib}
                              className="px-3 py-1 text-xs text-white bg-violet-700/50 rounded-full font-medium border border-violet-500/50"
                            >
                              {lib}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {}
                  <div className="w-full">
                    <span
                      className="inline-block px-4 py-2 text-sm text-white/90 bg-violet-700/30 rounded-full font-medium border border-violet-500/50"
                    >
                      Project Status: Currently not Published
                    </span>
                  </div>
                  
                  {}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-violet-600 hover:bg-violet-700 text-white shadow-lg border border-violet-500/50"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View GitHub Repository
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section ref={contactRef} id="contact" className="min-h-screen py-24 md:py-32 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full">
        <h2 className="text-5xl font-bold text-violet-400 mb-8 text-center">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-10 border border-violet-500/20 rounded-xl p-6 bg-black/40">
            {}
            <div className="text-center md:col-span-2 space-y-2">
                <h3 className="text-2xl font-semibold text-pink-400 mb-2 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 mr-2" /> Current Availability
                </h3>
                <p className="text-2xl text-white font-bold">NOT YET OPEN TO FULL-TIME ROLES</p>
                <p className="text-white/70 text-sm italic">
                    I am actively seeking student projects, collaborations, and open-source opportunities only.
                </p>
            </div>
            <div className="text-center border-t border-white/10 pt-4 md:border-t-0 md:pt-0">
              <h3 className="text-xl font-semibold text-white/80 mb-2">My Email</h3>
              <a href="mailto:rodrigo.beltran@example.com" className="text-lg text-white font-mono hover:text-violet-400 transition-colors">
                rovic.beltran@gmail.com
              </a>
            </div>
            <div className="text-center border-t border-white/10 pt-4 md:border-t-0 md:pt-0">
              <h3 className="text-xl font-semibold text-white/80 mb-2">My Location</h3>
              <p className="text-lg text-white font-mono">Las Piñas City, 1740, PH</p>
            </div>
            <div className="text-center border-t border-white/10 pt-4 md:border-t-0 md:pt-0">
              <h3 className="text-xl font-semibold text-white/80 mb-2">My Number</h3>
              <p className="text-lg text-white font-mono">+63 928 657 2359</p>
            </div>
        </div>

        <h3 className="text-3xl font-semibold text-white mb-6 text-center border-t border-white/10 pt-8">Connect with me</h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <a
            href="https://facebook.com/rubekuuu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg border border-blue-500/50 items-center justify-center"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 mr-2" />
            Facebook
          </a>

          <a
            href="https://www.linkedin.com/in/rubekuuu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-sky-700 hover:bg-sky-800 text-white shadow-lg border border-sky-500/40 items-center justify-center"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </a>

          <a
            href="https://github.com/rubekuuu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-black/80 hover:bg-black text-white shadow-lg border border-white/10 items-center justify-center"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </a>
        </div>
      </Card>
    </section>
  );

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

      {}
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
            background-color: #0d0d0d;
            color: #ffffff;
            line-height: 1.6;
            overflow-x: hidden;
          }
          #app-root {
            min-height: 100vh;
            position: relative;
            z-index: 10;
            background-color: rgba(13, 13, 13, 0.7);
          }
        `}
      </style>
      <GlassmorphismStyles />
      
      {}
      <ParticleBackground />
      
      {}
      {}
      <div className="fixed inset-0 z-0 grid-background" />
      
      {}
      <div className="radial-glow" />


      <div id="app-root">
        <Navigation />
        <main className="pt-20 relative z-10">
          <HomeSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        
        {}
        <footer className="py-6 border-t border-white/10 text-center text-white/50 text-sm relative z-10 bg-black/30">
          <p className="font-mono">
            &copy; {new Date().getFullYear()} RODRIGO VICTOR BELTRAN | 
            <span className="text-violet-500"> STUDENT DEVELOPER</span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
