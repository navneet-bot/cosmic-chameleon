import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Services, OurApproach } from '@/entities';
import { useHead } from '@/components/Head';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  CheckCircle,
  Send
} from 'lucide-react';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
} as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      delay: i * 0.1,
      ease: "easeOut"
    }
  })
};

// Animated section wrapper component
const AnimatedSection: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}> = ({ children, className = "", id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={shouldReduceMotion ? {} : sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
};

// Product data - hardcoded products
const PRODUCTS = [
  {
    _id: 'product-1',
    name: 'CRM Dashboard',
    description: 'Comprehensive customer relationship management platform with real-time analytics and automated workflows.',
    image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png',
    ctaLabel: 'Get Started',
    ctaLink: '#'
  },
  {
    _id: 'product-2',
    name: 'AI Calling Agent',
    description: 'Intelligent voice assistant powered by advanced AI for seamless customer interactions and support.',
    image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png',
    ctaLabel: 'Get Started',
    ctaLink: '#'
  },
  {
    _id: 'product-3',
    name: 'Billing & Invoicing Software',
    description: 'Streamlined billing solution with automated invoicing, payment tracking, and financial reporting.',
    image: 'https://static.wixstatic.com/media/46b2f1_aad4ffcf7a0d4eb99c27773abda3c5fb~mv2.png?originWidth=384&originHeight=256',
    ctaLabel: 'Get Started',
    ctaLink: '#'
  }
];

export default function HomePage() {
  const [services, setServices] = useState<Services[]>([]);
  const [approach, setApproach] = useState<OurApproach[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize SEO head
  useHead({
    title: "Cosmic Chameleon - Adaptive Digital Solutions",
    description: "Transform your business with Cosmic Chameleon's adaptive digital solutions."
  });

  // Load services and approach data from CMS
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, approachData] = await Promise.all([
          BaseCrudService.getAll<Services>('services'),
          BaseCrudService.getAll<OurApproach>('ourapproach')
        ]);
        setServices(servicesData.items);
        setApproach(approachData.items);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual form handling)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation - Non-sticky as requested */}
      <nav className="w-full max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-lg">C</span>
            </div>
            <span className="font-heading text-xl text-foreground">Cosmic Chameleon</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('approach')}
              className="text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            >
              Approach
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section - Following brand book specifications */}
      <section className="relative h-screen w-full max-w-[1200px] mx-auto px-4 grid place-items-center overflow-hidden">
        {/* Purple gradient background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(135deg, #673AB7 0%, #9C27B0 100%)'
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-7xl md:text-8xl font-heading text-foreground mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Cosmic Chameleon
          </motion.h1>
          <motion.p 
            className="text-2xl md:text-3xl font-paragraph text-foreground/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Adapt and Thrive in the Digital Universe
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button 
              onClick={() => scrollToSection('services')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-paragraph rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Explore Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Chameleon Image - Following brand book animation specs */}
        <motion.div 
          className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-30"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image 
            src="https://static.wixstatic.com/media/46b2f1_5a14111e1ab744358459508e2d497c71~mv2.png?originWidth=576&originHeight=576"
            alt="Cosmic Chameleon - Adaptable digital solutions"
            width={600}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </section>

      {/* About Section - Brand Story */}
      <AnimatedSection id="about" className="w-full max-w-[1200px] mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-6">
              <p className="text-lg font-paragraph text-foreground/90 leading-relaxed">
                Like the chameleon that adapts to its environment, Cosmic Chameleon transforms 
                businesses to thrive in the ever-changing digital landscape. We blend creativity 
                with technology to create solutions that are both beautiful and functional.
              </p>
              <p className="text-lg font-paragraph text-foreground/90 leading-relaxed">
                Our mission is to help businesses evolve, adapt, and succeed in the digital 
                universe through innovative design, strategic thinking, and cutting-edge technology.
              </p>
              <p className="text-lg font-paragraph text-foreground/90 leading-relaxed">
                From brand creation to performance management, we provide comprehensive solutions 
                that help your business not just survive, but thrive in today's competitive market.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image 
              src="https://static.wixstatic.com/media/46b2f1_5d5dd2c0af604e2394f226be64546cd0~mv2.png?originWidth=448&originHeight=448"
              alt="Cosmic Chameleon brand story - Digital transformation and adaptation"
              width={500}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section - Card Grid */}
      <AnimatedSection id="services" className="w-full max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-xl font-paragraph text-foreground/80 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to transform your business and 
            help you adapt to the ever-changing digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <CardContent className="p-6">
                  {service.serviceImage && (
                    <div className="mb-6 overflow-hidden rounded-lg">
                      <Image 
                        src={service.serviceImage}
                        alt={`${service.serviceName} - Professional digital service`}
                        width={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-heading text-foreground mb-4">
                    {service.serviceName}
                  </h3>
                  <p className="text-foreground/80 font-paragraph mb-6 leading-relaxed">
                    {service.serviceDescription}
                  </p>
                  {service.ctaLabel && service.ctaLink && (
                    <Button 
                      asChild
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-colors duration-200"
                    >
                      <a 
                        href={service.ctaLink}
                        className="inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
                      >
                        {service.ctaLabel}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Products Section - Card Grid (Same layout as Services) */}
      <AnimatedSection id="products" className="w-full max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
            Our Products
          </h2>
          <p className="text-xl font-paragraph text-foreground/80 max-w-3xl mx-auto">
            Powerful tools and solutions built to streamline your business operations 
            and drive growth in the digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product._id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="bg-[#1E1E1E] border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <CardContent className="p-6">
                  {product.image && (
                    <div className="mb-6 overflow-hidden rounded-lg">
                      <Image 
                        src={product.image}
                        alt={`${product.name} - Business software solution`}
                        width={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-heading text-foreground mb-4">
                    {product.name}
                  </h3>
                  <p className="text-foreground/80 font-paragraph mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  {product.ctaLabel && product.ctaLink && (
                    <Button 
                      asChild
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-colors duration-200"
                    >
                      <a 
                        href={product.ctaLink}
                        className="inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
                      >
                        {product.ctaLabel}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Approach Section - 5 Bullet Points */}
      <AnimatedSection id="approach" className="w-full max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
            Our Approach
          </h2>
          <p className="text-xl font-paragraph text-foreground/80 max-w-3xl mx-auto">
            Our proven methodology ensures your business adapts and thrives in the digital ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approach.map((point, index) => {
            const points = [
              point.point1,
              point.point2,
              point.point3,
              point.point4,
              point.point5
            ].filter(Boolean);

            return points.map((pointText, pointIndex) => (
              <motion.div
                key={`${point._id}-${pointIndex}`}
                custom={pointIndex}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 bg-[#1E1E1E] rounded-lg"
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                </div>
                <p className="text-lg font-paragraph text-foreground/90 leading-relaxed">
                  {pointText}
                </p>
              </motion.div>
            ));
          })}
        </div>
      </AnimatedSection>

      {/* Contact Section - Info + Accessible Form */}
      <AnimatedSection id="contact" className="w-full max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="text-xl font-paragraph text-foreground/80 max-w-3xl mx-auto">
            Ready to transform your business? Let's discuss how we can help you adapt and thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-heading text-foreground mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-foreground">Email</p>
                  <a 
                    href="mailto:hello@cosmichameleon.com"
                    className="text-foreground/80 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                  >
                    hello@cosmichameleon.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-heading text-foreground">Phone</p>
                  <a 
                    href="tel:+1234567890"
                    className="text-foreground/80 hover:text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-foreground">Location</p>
                  <p className="text-foreground/80">
                    Digital Universe, Web 3.0
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-8">
              <h4 className="text-lg font-heading text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`Follow us on ${label}`}
                    className="w-10 h-10 bg-foreground/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <Icon className="w-5 h-5 text-foreground hover:text-primary transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1E1E1E] p-8 rounded-lg">
            <h3 className="text-2xl font-heading text-foreground mb-6">
              Send us a message
            </h3>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-primary font-paragraph">
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-foreground font-paragraph mb-2 block">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background border-foreground/20 text-foreground focus:border-primary focus:ring-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground font-paragraph mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background border-foreground/20 text-foreground focus:border-primary focus:ring-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-foreground font-paragraph mb-2 block">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-background border-foreground/20 text-foreground focus:border-primary focus:ring-primary"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground font-paragraph mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-background border-foreground/20 text-foreground focus:border-primary focus:ring-primary resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 transition-colors duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="w-full bg-[#1E1E1E] mt-20">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-heading text-lg">C</span>
                </div>
                <span className="font-heading text-xl text-foreground">Cosmic Chameleon</span>
              </div>
              <p className="text-foreground/80 font-paragraph leading-relaxed max-w-md">
                Transforming businesses through adaptive digital solutions. 
                We help you evolve, adapt, and thrive in the digital universe.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'About', href: '#about' },
                  { label: 'Services', href: '#services' },
                  { label: 'Products', href: '#products' },
                  { label: 'Approach', href: '#approach' },
                  { label: 'Contact', href: '#contact' }
                ].map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToSection(href.replace('#', ''))}
                      className="text-foreground/80 hover:text-primary transition-colors duration-200 font-paragraph focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#1E1E1E] rounded-sm"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-heading text-foreground mb-4">Connect</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`Follow us on ${label}`}
                    className="w-10 h-10 bg-foreground/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
                  >
                    <Icon className="w-5 h-5 text-foreground hover:text-primary transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-foreground/20 mt-8 pt-8 text-center">
            <p className="text-foreground/60 font-paragraph">
              © {new Date().getFullYear()} Cosmic Chameleon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}