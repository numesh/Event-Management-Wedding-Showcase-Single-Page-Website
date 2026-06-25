"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { 
  Camera, 
  Video, 
  Sparkles, 
  CircleUser, 
  Car, 
  Music, 
  Utensils, 
  Calendar,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  X,
  Youtube
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { registerAction } from "./actions/register";

const services = [
  { icon: <Calendar className="w-8 h-8" />, name: "Event Planning", desc: "Meticulous planning for your perfect day." },
  { icon: <Sparkles className="w-8 h-8" />, name: "Luxury Decorations", desc: "Transforming venues into mythic spaces." },
  { icon: <Camera className="w-8 h-8" />, name: "Photography", desc: "Capturing timeless emotions forever." },
  { icon: <Video className="w-8 h-8" />, name: "Videography", desc: "Cinematic storytelling of your love." },
  { icon: <CircleUser className="w-8 h-8" />, name: "Bride & Groom Saloon", desc: "Expert styling for the royal look." },
  { icon: <Car className="w-8 h-8" />, name: "Wedding Cars", desc: "Arrive in style with our luxury fleet." },
  { icon: <Music className="w-8 h-8" />, name: "Sounds & Entertainment", desc: "Set the mood with premium audio." },
  { icon: <Utensils className="w-8 h-8" />, name: "Catering Service", desc: "Exquisite flavors for your guests." },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
];

export default function Home() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  
  const servicesRef = useRef(null);
  const { scrollY } = useScroll();
  const isServicesInView = useInView(servicesRef, { amount: 0.1 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest === 0) {
      setShowBanner(true);
    }
  });

  useEffect(() => {
    if (isServicesInView) {
      setShowBanner(false);
    }
  }, [isServicesInView]);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    const formData = new FormData(e.currentTarget);
    const result = await registerAction(formData);

    if (result.success) {
      setFormStatus("Thank you for registering! We will contact you soon.");
      (e.target as HTMLFormElement).reset();
    } else {
      setFormStatus(result.error || "Something went wrong.");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="relative">
      {/* Sticky Offer Banner */}
      <AnimatePresence>
        {showBanner && (
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-gold text-black py-2 px-4 text-center font-bold shadow-lg"
            >
              🎁 Special Wedding Show Offer: 1st 10 couples registered for a Full Wedding Package get a FREE Pre-shoot coverage!
            </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-22 pb-2 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0">
          <Image 
            // src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000"
              src="/gallery/cover_1.jpg"
            alt="Luxury Wedding"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif mb-4"
          >
            <Image
                src="/gallery/company_logo.png"
                alt="Asgard Events Logo"
                width={400}
                height={160}
                className="mx-auto h-[236px] md:h-[380px] w-auto opacity-70 block mb-[-30px] md:mb-[-50px]"
                priority
            />
            Create <span className="gold-gradient">Mythic Moments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            Luxury Event Planning & Wedding Excellence<br/>
           <br/>
            <span className="text-gold">Don't Miss Our Special Wedding Show Offers at DoubleTree by Hilton Weerawila Rajawarna Resort</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <Image 
              src="/gallery/logo_wedding_show.png" 
              alt="Wedding Show Logo" 
              width={500} 
              height={250}
              className="w-64 md:w-76 h-auto"
            />
            <a href="#register" className="bg-gold hover:bg-gold-light text-black px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
              Claim Your Offer
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 text-gold">Our Services</h2>
            <div className="h-1 w-20 bg-gold mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-gold/20 bg-black/40 hover:border-gold/50 transition-all group"
              >
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 mb-16"
        >
          <div className="text-center">
            <h2 className="text-4xl font-serif mb-4 text-gold">Visual Showcase</h2>
            <div className="h-1 w-20 bg-gold mx-auto" />
          </div>
        </motion.div>
        
        {/* Auto Animating Marquee */}
        <div className="relative flex overflow-hidden w-full group">
          <motion.div 
            animate={{ x: [0, "-50%"] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear",
            }}
            className="flex gap-4 w-max px-2"
          >
            {[...galleryImages, ...galleryImages].map((src, index) => (
              <div
                key={index}
                className="relative h-64 md:h-80 w-64 md:w-96 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group/item"
                onClick={() => setSelectedImage(src)}
              >
                <Image 
                  src={src} 
                  alt={`Gallery ${index}`} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/0 transition-colors" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row (Reverse) */}
        <div className="relative flex overflow-hidden w-full mt-4">
          <motion.div 
            animate={{ x: ["-50%", 0] }}
            transition={{ 
              duration: 45, 
              repeat: Infinity, 
              ease: "linear",
            }}
            className="flex gap-4 w-max px-2"
          >
            {[...galleryImages, ...galleryImages].map((src, index) => (
              <div
                key={`rev-${index}`}
                className="relative h-64 md:h-80 w-64 md:w-96 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group/item"
                onClick={() => setSelectedImage(src)}
              >
                <Image 
                  src={src} 
                  alt={`Gallery Reverse ${index}`} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/0 transition-colors" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage} 
                alt="Enlarged gallery view" 
                fill 
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Section */}
      <section id="register" className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-gold/30 shadow-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl font-serif mb-4 text-gold">Join the Experience</h2>
              <p className="text-gray-400">Register now to secure your exclusive wedding show offer.</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Couple&apos;s Names</label>
                  <input name="names" required className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number</label>
                  <input name="phone" required type="tel" className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Date</label>
                <input name="date" required type="date" className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Interest</label>
                <select name="interest" className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-all">
                  <option className="bg-black">Full Wedding Package</option>
                  <option className="bg-black">Coordination</option>
                  <option className="bg-black">Photography & Videography</option>
                  <option className="bg-black">Decorations</option>
                  <option className="bg-black">Other Services</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-lg transition-all transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Register for Exclusive Offer"}
              </button>
              {formStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className={`text-center p-6 rounded-xl border mt-4 ${
                    formStatus.includes("Thank you") 
                      ? "bg-green-500/10 border-green-500/20 text-green-400" 
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  <p className="font-bold mb-4">{formStatus}</p>
                  {formStatus.includes("Thank you") && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-300">Join our WhatsApp channel to stay updated with more offers and mythic moments!</p>
                      <a 
                        href="https://whatsapp.com/channel/0029Vb0CrfAJENxzGYPkR71L" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Join WhatsApp Channel
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-gold/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-serif text-gold mb-6">Asgard Events</h3>
            <p className="text-gray-400 leading-relaxed">
              We specialize in creating mythic moments that last a lifetime. 
              Luxury and elegance in every detail.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="tel:+94779609907" className="flex items-center gap-3 hover:text-gold transition-colors">
                  <Phone className="text-gold w-5 h-5" /> +94 77 960 9907
                </a>
              </li>
              <li>
                <a href="mailto:asgardeventsl@gmail.com" className="flex items-center gap-3 hover:text-gold transition-colors">
                  <Mail className="text-gold w-5 h-5" /> asgardeventsl@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Follow Our Journey</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/asgardevents/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gold hover:text-black transition-all">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb0CrfAJENxzGYPkR71L" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gold hover:text-black transition-all">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/asgardevents?igsh=cmQ2dnl2NWFka3Vv" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gold hover:text-black transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@AsgardEvent" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gold hover:text-black transition-all">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@asgardevents" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gold hover:text-black transition-all flex items-center justify-center font-bold">
                <span className="text-xs">TikTok</span>
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">@asgardevents</p>
          </div>
        </div>
        <div className="text-center mt-20 pt-8 border-t border-white/5 text-gray-600 text-sm">
          © 2026 Asgard Events. Crafted for Mythic Moments.
        </div>
      </footer>
    </main>
  );
}
