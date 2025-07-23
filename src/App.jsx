import React, { useLayoutEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Building2, ShieldCheck, Users, FileText, BarChart, Linkedin, Facebook, Twitter, Clock, Zap, Users2, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Data ---
const services = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
        title: "Fraud & Risk Management",
        description: "Comprehensive FRM services for the financial and insurance sectors, ensuring your operations are secure and compliant."
    },
    {
        icon: <Users className="w-10 h-10 text-blue-600" />,
        title: "Employee & Criminal Checks",
        description: "Thorough background and criminal record checks to ensure you hire with confidence and maintain a safe workplace."
    },
    {
        icon: <FileText className="w-10 h-10 text-blue-600" />,
        title: "Physical Field Verification",
        description: "Our experienced field team conducts on-site verifications with geo-tagging and photographic evidence for ultimate accuracy."
    },
    {
        icon: <Building2 className="w-10 h-10 text-blue-600" />,
        title: "Third-Party Audit Checks",
        description: "Specialized teams to assign and audit tasks as per client requirements, ensuring third-party compliance and performance."
    }
];

const testimonials = [
    {
        quote: "CRMS India has revolutionized our verification process. Their ZERO day TAT for bank statements is not just a promise, it's a reality. Their efficiency is unmatched.",
        name: "Ananya Sharma",
        title: "Operations Head, Fusion Microfinance",
        image: "https://placehold.co/100x100/E2E8F0/4A5568?text=AS"
    },
    {
        quote: "The professionalism and result-driven approach of the CRMS team are exceptional. They have become an indispensable partner for our risk management.",
        name: "Rohan Kapoor",
        title: "Risk Manager, PNB Housing",
        image: "https://placehold.co/100x100/E2E8F0/4A5568?text=RK"
    },
    {
        quote: "We rely on CRMS for all our background checks. Their reports are thorough, delivered on time, and have significantly improved the quality of our hires.",
        name: "Priya Singh",
        title: "HR Director, Shubham Housing",
        image: "https://placehold.co/100x100/E2E8F0/4A5568?text=PS"
    }
];

const clients = [
    { name: "Shubham", logo: "https://cmsindia.in/wp-content/uploads/2023/01/26.jpg" },
    { name: "PNB Housing", logo: "https://cmsindia.in/wp-content/uploads/2023/01/24.jpg" },
    { name: "InCred", logo: "https://cmsindia.in/wp-content/uploads/2023/01/25.jpg" },
    { name: "Fusion Microfinance", logo: "https://cmsindia.in/wp-content/uploads/2023/01/27.jpg" },
    { name: "U GRO Capital", logo: "https://cmsindia.in/wp-content/uploads/2023/01/28.jpg" }
];

const whyUsStats = [
    { icon: <Users2 className="w-8 h-8 text-blue-600"/>, value: "50+", label: "Happy Clients" },
    { icon: <Zap className="w-8 h-8 text-blue-600"/>, value: "90%+", label: "TAT on Key Checks" },
    { icon: <Target className="w-8 h-8 text-blue-600"/>, value: "500k+", label: "Cases Completed" },
    { icon: <BarChart className="w-8 h-8 text-blue-600"/>, value: "150+", label: "Team Strength" },
];


// --- Main Components ---

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const scrollToSection = (id) => {
        gsap.to(window, {duration: 1.5, scrollTo: `#${id}`, ease: "power2.inOut"});
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Services', id: 'services' },
        { name: 'About', id: 'about' },
        { name: 'Testimonials', id: 'testimonials' },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a 
                        href="#home" 
                        onClick={(e) => { e.preventDefault(); scrollToSection('home');}} 
                        className="flex items-center space-x-2"
                    >
                        <svg className="w-9 h-9 text-blue-600" viewBox="0 0 202 191" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M101 0C156.746 0 202 42.7124 202 95.5C202 148.288 156.746 191 101 191C45.2542 191 0 148.288 0 95.5C0 42.7124 45.2542 0 101 0ZM101 19.1C56.2644 19.1 20.2 54.1644 20.2 95.5C20.2 136.836 56.2644 171.9 101 171.9C145.736 171.9 181.8 136.836 181.8 95.5C181.8 54.1644 145.736 19.1 101 19.1Z" fill="currentColor"/><path d="M124.23 133.891L101.485 112.11L78.7397 133.891L85.7347 107.13L66.75 88.9091L93.8947 84.9295L105.26 60.8L116.625 84.9295L143.77 88.9091L124.785 107.13L131.78 133.891H124.23Z" fill="rgba(59, 130, 246, 0.7)"/><path d="M60.6 66.85C60.6 54.1644 70.3144 44.45 83.0001 44.45H101V63.55H83.0001C80.8899 63.55 79.7 64.7356 79.7 66.85V124.15C79.7 126.264 80.8899 127.45 83.0001 127.45H101V146.55H83.0001C70.3144 146.55 60.6 136.836 60.6 124.15V66.85Z" fill="currentColor"/></svg>
                        <span className="font-bold text-xl text-gray-800">CRMS</span>
                    </a>

                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a 
                                key={link.id} 
                                href={`#${link.id}`} 
                                onClick={(e) => { e.preventDefault(); scrollToSection(link.id);}} 
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 px-4 py-2 rounded-md hover:bg-gray-100"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    
                    <div className="hidden md:block">
                        <button 
                            onClick={() => scrollToSection('contact')}
                            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                           Contact Us
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <nav className="flex flex-col items-center space-y-4 py-6">
                        {navLinks.map(link => (
                            <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(link.id);}} className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 text-lg">
                                {link.name}
                            </a>
                        ))}
                        <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-4/5">
                           Contact Us
                        </button>
                    </nav>
                </motion.div>
            )}
            </AnimatePresence>
        </header>
    );
};

const HeroSection = () => {
    const heroRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(heroRef.current.querySelectorAll(".gsap-reveal"), {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    const scrollToContact = () => gsap.to(window, {duration: 1.5, scrollTo: '#contact', ease: "power2.inOut"});

    return (
        <section id="home" ref={heroRef} className="relative bg-gray-50 text-gray-800 overflow-hidden">
             <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3">
                <div className="w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl"></div>
            </div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center min-h-screen pb-20">
                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight gsap-reveal">
                    Precision in Verification. <br/> Confidence in Decision.
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl gsap-reveal">
                    India's trusted partner in Fraud Risk Management. We deliver with integrity and unmatched speed, featuring our hallmark <span className="text-blue-600 font-semibold">ZERO Day TAT</span> on critical reports.
                </p>
                <div className="mt-10 gsap-reveal">
                    <button 
                        onClick={scrollToContact} 
                        className="group relative inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative">Request a Consultation</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

const ClientsSection = () => {
    const clientRef = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(clientRef.current.querySelectorAll(".gsap-client-logo"), {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: clientRef.current,
                    start: "top 85%",
                }
            });
        }, clientRef);
        return () => ctx.revert();
    }, []);

    return (
        <div id="clients" ref={clientRef} className="bg-gray-50 pb-16 sm:pb-24 -mt-1">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-xl font-bold text-gray-800 tracking-tight mb-12">
                    Trusted by India's Leading Financial Institutions
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 sm:gap-x-12">
                    {clients.map((client) => (
                        <motion.div 
                            key={client.name} 
                            className="flex justify-center gsap-client-logo"
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img 
                                className="max-h-10 w-auto object-contain"
                                src={client.logo} 
                                alt={client.name}
                                onError={(e) => { e.target.onerror = null; e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
                            />
                            <div style={{display: 'none'}} className="text-gray-500 font-semibold">{client.name}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const ServicesSection = () => {
    const serviceRef = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = serviceRef.current.querySelectorAll(".gsap-service-card");
            
            // This is a robust way to animate elements in on scroll.
            // We set their initial state (invisible and slightly moved)
            gsap.set(cards, { autoAlpha: 0, y: 50 });

            // Then we animate them TO their final state when the trigger is hit
            gsap.to(cards, {
                autoAlpha: 1, // Fades in and sets visibility
                y: 0,         // Moves to original position
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: serviceRef.current,
                    start: "top 80%",
                }
            });
        }, serviceRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={serviceRef} className="py-20 sm:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-blue-600 font-semibold tracking-wide uppercase">Our Expertise</p>
                    <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Comprehensive Solutions
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        A full suite of verification and risk management services tailored to your needs.
                    </p>
                </div>
                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => (
                        <div key={service.title} className="group bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 gsap-service-card">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-md mb-6 ring-1 ring-gray-100">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                            <p className="mt-2 text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutUsSection = () => {
     const aboutRef = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(aboutRef.current.querySelectorAll(".gsap-about-reveal"), {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: "top 80%",
                }
            });
        }, aboutRef);
        return () => ctx.revert();
    }, []);

    return (
    <section id="about" ref={aboutRef} className="py-20 sm:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Part 1: Our Story */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="gsap-about-reveal">
                    <p className="text-blue-600 font-semibold tracking-wide uppercase">Our Story</p>
                    <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Love What We Do
                    </h2>
                    <p className="mt-6 text-lg text-gray-600">
                        Founded in 2012 in Delhi with a vision to provide industry-best services, CRMS today is among the leading Third-Party Process Management & Investigation Companies. We cater to a varied clientele, from Fraud & Operational Risk Management to Employee Background Checks. Our endeavor to provide services based on clients’ requirements makes us stand out from the rest.
                    </p>
                </div>
                <div className="h-96 rounded-lg overflow-hidden gsap-about-reveal">
                    <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2400&auto=format&fit=crop" alt="Our Team" className="w-full h-full object-cover"/>
                </div>
            </div>

            {/* Part 2: Why Us */}
            <div className="mt-28 text-center">
                <p className="text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</p>
                <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Our Milestones & Strengths
                </h2>
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyUsStats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 gsap-about-reveal">
                            <div className="flex justify-center mb-4">{stat.icon}</div>
                            <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-gray-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Part 3: Meet Our Team */}
            <div className="mt-28">
                <div className="text-center">
                    <p className="text-blue-600 font-semibold tracking-wide uppercase">Meet Our Team</p>
                    <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                        The Minds Behind CRMS
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                        Great things are rarely achieved by one person. They are accomplished by a group of people committed to an overall goal. This philosophy helps us create innovative and client-oriented solutions.
                    </p>
                </div>
                <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center gsap-about-reveal">
                        <img className="w-28 h-28 rounded-full object-cover mx-auto -mt-20 border-4 border-white" src="https://placehold.co/200x200/E2E8F0/4A5568?text=MJ" alt="Mohammad Javed" />
                        <h3 className="text-2xl font-bold text-gray-900 mt-4">Mohammad Javed</h3>
                        <p className="text-blue-600 font-semibold">Founder</p>
                        <p className="mt-4 text-gray-600">A thorough professional with over 14 years of experience, Mohammad Javed founded CRMS in 2012. Humble and down to earth, Javed knows each team member and client personally and is available 24*7.</p>
                    </div>
                     <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center gsap-about-reveal">
                        <img className="w-28 h-28 rounded-full object-cover mx-auto -mt-20 border-4 border-white" src="https://placehold.co/200x200/E2E8F0/4A5568?text=N" alt="Navdeep" />
                        <h3 className="text-2xl font-bold text-gray-900 mt-4">Navdeep</h3>
                        <p className="text-blue-600 font-semibold">Head - Operations & Strategy</p>
                        <p className="mt-4 text-gray-600">An ex-banker with a track record of over 18 years, Navdeep handles various portfolios across products and verticals, overseeing Corporate Investigations and Employee Background Checks.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

const TestimonialsSection = () => {
    const [current, setCurrent] = React.useState(0);
    
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="py-20 sm:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-blue-600 font-semibold tracking-wide uppercase">Testimonials</p>
                    <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                        What Our Clients Say
                    </h2>
                </div>
                <div className="mt-16 relative h-64 sm:h-48">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            className="w-full h-full flex flex-col justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="text-gray-600 text-xl text-center max-w-3xl italic">"{testimonials[current].quote}"</p>
                            <div className="mt-6 flex items-center">
                                <img className="w-12 h-12 rounded-full object-cover" src={testimonials[current].image} alt={testimonials[current].name} />
                                <div className="ml-4 text-left">
                                    <p className="font-bold text-gray-900">{testimonials[current].name}</p>
                                    <p className="text-gray-500">{testimonials[current].title}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex justify-center mt-8 space-x-3">
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-colors ${current === i ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactSection = () => {
    const contactRef = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contactRef.current.querySelectorAll(".gsap-contact-reveal"), {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: "top 80%",
                }
            });
        }, contactRef);
        return () => ctx.revert();
    }, []);

    const [status, setStatus] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Sending...');
        setTimeout(() => {
            setStatus('Your message has been sent successfully!');
            e.target.reset();
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    const contactDetails = [
        { icon: <MapPin className="w-6 h-6 text-blue-600"/>, title: "Address", value: "New Delhi, India" },
        { icon: <Phone className="w-6 h-6 text-blue-600"/>, title: "Phone", value: "+91 9717431717", href: "tel:+919717431717" },
        { icon: <Mail className="w-6 h-6 text-blue-600"/>, title: "Email", value: "javed.mgt@crmsindia.in", href: "mailto:javed.mgt@crmsindia.in" },
        { icon: <Clock className="w-6 h-6 text-blue-600"/>, title: "Working Hours", value: "Mon - Sat / 10AM - 6PM" },
    ];

    return (
        <section id="contact" ref={contactRef} className="py-20 sm:py-28 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">Get In Touch</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Have a question or need a custom quote? We're here to help.</p>
                </div>
                <div className="mt-16 grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        {contactDetails.map(item => (
                            <div key={item.title} className="flex items-start gsap-contact-reveal">
                                <div className="flex-shrink-0 bg-blue-100 p-4 rounded-full">{item.icon}</div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                    {item.href ? (
                                        <a href={item.href} className="text-lg text-gray-600 hover:text-blue-600 transition-colors">{item.value}</a>
                                    ) : (
                                        <p className="text-lg text-gray-600">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 gsap-contact-reveal">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input type="text" name="name" id="name" required className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email" name="email" id="email" required className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Email Address" />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea name="message" id="message" rows="5" required className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Your Message"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300">Send Message</button>
                            </div>
                            {status && <p className="text-center text-green-600">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-white border-t border-gray-200 text-gray-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-sm">&copy; {new Date().getFullYear()} CRMS India Pvt Ltd. All Rights Reserved.</p>
                <div className="flex space-x-6 mt-6 md:mt-0">
                    <a href="#" className="hover:text-gray-900 transition-colors"><Twitter /></a>
                    <a href="#" className="hover:text-gray-900 transition-colors"><Facebook /></a>
                    <a href="#" className="hover:text-gray-900 transition-colors"><Linkedin /></a>
                </div>
            </div>
        </div>
    </footer>
);

// --- Main App Component ---
export default function App() {
    const main = useRef(null);
    
    return (
        <div ref={main} className="bg-white font-sans antialiased">
            <Header />
            <main>
                <div id="home-wrapper">
                    <HeroSection />
                    <ClientsSection />
                </div>
                <ServicesSection />
                <AboutUsSection />
                <TestimonialsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
