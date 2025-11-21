import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';

const Error = () => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Create floating particles
    particlesRef.current = [];
    const container = containerRef.current;
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-primary rounded-full opacity-60';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Main animation timeline
    const tl = gsap.timeline();

    // Number animation - bouncy entrance
    tl.fromTo(numberRef.current, 
      {
        scale: 0,
        rotation: -180,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }
    );

    // Text animation - sequential fade in
    tl.fromTo(textRef.current.children,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)"
      },
      "-=0.5"
    );

    // Button animation - slide in with glow
    tl.fromTo(buttonRef.current,
      {
        x: -100,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    // Particles animation - floating movement
    particlesRef.current.forEach((particle, index) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });

    // Background pulse animation
    gsap.to('.error-bg', {
      backgroundPosition: '200% 200%',
      duration: 10,
      repeat: -1,
      ease: "none"
    });

    // Continuous number wobble
    gsap.to(numberRef.current, {
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Hover animations for button
    const button = buttonRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(74, 0, 224, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: "0 4px 15px rgba(74, 0, 224, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      particlesRef.current.forEach(particle => particle.remove());
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    
    // Click animation
    const tl = gsap.timeline();
    
    tl.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      ease: "power2.in"
    })
    .to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)"
    });

    // Navigate after animation
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden error-bg"
      style={{
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: '200% 200%'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border-4 border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border-4 border-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 border-4 border-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="text-center text-white relative z-10 px-6">
        {/* Animated 404 Number */}
        <div 
          ref={numberRef}
          className="text-9xl md:text-12xl font-bold mb-4 text-white drop-shadow-2xl"
          style={{
            textShadow: '0 10px 30px rgba(0,0,0,0.3)',
            fontFamily: 'monospace'
          }}
        >
          404
        </div>

        {/* Animated Text Content */}
        <div ref={textRef} className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Oops! Page Not Found
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best animations sometimes go off-script!
          </p>
        </div>

        {/* Animated Button */}
        <div className="space-y-6">
          <Link
            ref={buttonRef}
            to="/"
            onClick={handleButtonClick}
            className="inline-block px-8 py-4 bg-white text-primary text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 4px 15px rgba(74, 0, 224, 0.3)'
            }}
          >
            <span className="flex items-center justify-center space-x-2 text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Safety</span>
            </span>
          </Link>

          {/* Additional Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/80">
            <span>Or try these:</span>
            <div className="flex gap-4">
              <Link 
                to="/animations" 
                className="hover:text-white transition-colors duration-300 underline hover:no-underline"
              >
                Animations
              </Link>
              <Link 
                to="/tutorials" 
                className="hover:text-white transition-colors duration-300 underline hover:no-underline"
              >
                Tutorials
              </Link>
              <Link 
                to="/blog" 
                className="hover:text-white transition-colors duration-300 underline hover:no-underline"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Animation Message */}
        <div className="mt-12 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
          <p className="text-sm opacity-75">
            <span className="font-semibold">Pro Tip:</span> This 404 page uses GSAP animations! 
            Check our tutorials to learn how to create similar effects.
          </p>
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute bottom-10 left-10 text-4xl opacity-20 animate-bounce">🎬</div>
      <div className="absolute top-10 right-10 text-4xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
      <div className="absolute top-20 left-20 text-3xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>🚀</div>
    </div>
  );
};

export default Error;