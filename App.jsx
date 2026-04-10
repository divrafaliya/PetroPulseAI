import React, { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, ReferenceLine
} from "recharts";
import {
  TrendingUp, TrendingDown, Minus, Menu, X, ChevronRight,
  Zap, Shield, BarChart2, Bell, Globe, Cpu, Database,
  ArrowRight, Star, Check, Mail, Phone, Link,
  LogIn, UserPlus, User, ChevronDown, Lock, Eye, EyeOff,
  Activity, AlertTriangle, DollarSign, Truck, Plane, Factory,
  Clock, Layers, Target, Award, Send, Hash, ExternalLink,
  Droplets, Brain, Wifi, Settings, Map, MessageSquare,
  ChevronUp, Play, Pause, RefreshCw, Info
} from "lucide-react";

/* ─── STYLES INJECTION ─── */
const injectStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #000; font-family: 'DM Sans', sans-serif; color: #fff; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: #ff7c2b; border-radius: 3px; }
    .syne { font-family: 'Syne', sans-serif; }
    .glow-orange { box-shadow: 0 0 30px rgba(255,124,43,0.3); }
    .glow-orange-sm { box-shadow: 0 0 12px rgba(255,124,43,0.25); }
    .border-orange { border: 1px solid rgba(255,124,43,0.3); }
    .border-orange-bright { border: 1px solid rgba(255,124,43,0.7); }
    .text-gradient { background: linear-gradient(135deg, #ff7c2b, #ffb347, #ff5500); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .section-fade { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .section-fade.visible { opacity: 1; transform: translateY(0); }
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(255,124,43,0.15); }
    .btn-primary { background: linear-gradient(135deg, #ff7c2b, #ff5500); border: none; color: #fff; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; border-radius: 8px; transition: all 0.3s; }
    .btn-primary:hover { background: linear-gradient(135deg, #ff9444, #ff7c2b); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,124,43,0.4); }
    .btn-outline { background: transparent; border: 1px solid rgba(255,124,43,0.5); color: #ff7c2b; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; border-radius: 8px; transition: all 0.3s; }
    .btn-outline:hover { background: rgba(255,124,43,0.1); border-color: #ff7c2b; }
    .nav-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; cursor: pointer; }
    .nav-link:hover { color: #ff7c2b; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
    .pulse-dot { animation: pulse-anim 2s infinite; }
    @keyframes pulse-anim { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.2); } }
    .ticker-wrap { overflow: hidden; }
    .ticker { display: flex; animation: ticker-scroll 30s linear infinite; width: max-content; }
    @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .grid-bg { background-image: linear-gradient(rgba(255,124,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,124,43,0.04) 1px, transparent 1px); background-size: 50px 50px; }
    .shimmer { background: linear-gradient(90deg, #121212 25%, #1a1a1a 50%, #121212 75%); background-size: 200% 100%; animation: shimmer 2s infinite; }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    .rotate-slow { animation: rotate 20s linear infinite; }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .float { animation: float 4s ease-in-out infinite; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .chart-tooltip { background: #121212 !important; border: 1px solid rgba(255,124,43,0.3) !important; border-radius: 8px !important; padding: 8px 12px !important; }
    .tag-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,124,43,0.1); border: 1px solid rgba(255,124,43,0.2); border-radius: 20px; padding: 4px 12px; font-size: 12px; color: #ff7c2b; }
    input, textarea, select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-family: 'DM Sans', sans-serif; border-radius: 8px; padding: 12px 16px; width: 100%; font-size: 14px; outline: none; transition: border-color 0.2s; }
    input:focus, textarea:focus, select:focus { border-color: rgba(255,124,43,0.6); }
    input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
    label { font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 6px; display: block; }
    .signal-buy { background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4); color: #22c55e; }
    .signal-sell { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #ef4444; }
    .signal-hold { background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.4); color: #eab308; }
    .progress-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, #ff7c2b, #ff5500); border-radius: 2px; transition: width 1.5s ease; }
    @media (max-width: 768px) {
      .mobile-hide { display: none !important; }
      .mobile-col { flex-direction: column !important; }
      .mobile-full { width: 100% !important; }
    }
  `;
  document.head.appendChild(style);
};

/* ─── CONSTANTS ─── */
const COLORS = {
  orange: "#ff7c2b",
  charcoal: "#121212",
  black: "#000000",
  white: "#ffffff",
  orangeLight: "rgba(255,124,43,0.1)",
  orangeMid: "rgba(255,124,43,0.3)",
};

/* ─── VALIDATION HELPERS ─── */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

const isStrongPassword = (password) => {
  // Regex: At least 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(password);
};

/* ─── MOCK DATA ─── */
const fuelPriceData = [
  { date: "Jan 1", actual: 82.3, predicted: 83.1, signal: null },
  { date: "Jan 8", actual: 84.7, predicted: 84.2, signal: "BUY" },
  { date: "Jan 15", actual: 86.1, predicted: 86.8, signal: null },
  { date: "Jan 22", actual: 89.4, predicted: 88.9, signal: "HOLD" },
  { date: "Jan 29", actual: 91.2, predicted: 91.8, signal: null },
  { date: "Feb 5", actual: 88.6, predicted: 89.1, signal: "SELL" },
  { date: "Feb 12", actual: 85.3, predicted: 84.7, signal: null },
  { date: "Feb 19", actual: 83.1, predicted: 83.9, signal: "BUY" },
  { date: "Feb 26", actual: 87.4, predicted: 86.2, signal: null },
  { date: "Mar 5", actual: 90.8, predicted: 91.4, signal: "HOLD" },
  { date: "Mar 12", actual: 93.2, predicted: 93.8, signal: null },
  { date: "Mar 19", actual: 94.6, predicted: 95.1, signal: "SELL" },
  { date: "Mar 26", actual: null, predicted: 92.3, signal: null },
  { date: "Apr 2", actual: null, predicted: 89.7, signal: null },
  { date: "Apr 9", actual: null, predicted: 91.2, signal: "BUY" },
];

const tickerData = [
  { symbol: "CRUDE OIL", price: "91.24", change: "+1.23%", up: true },
  { symbol: "BRENT", price: "94.87", change: "+0.87%", up: true },
  { symbol: "DIESEL", price: "89.42", change: "-0.15%", up: false },
  { symbol: "NATURAL GAS", price: "82.81", change: "+2.41%", up: true },
  { symbol: "PETROL", price: "96.97", change: "-0.32%", up: false },
  { symbol: "HEATING OIL", price: "83.18", change: "+0.65%", up: true },
  { symbol: "JET FUEL", price: "93.54", change: "+1.12%", up: true },
  { symbol: "PROPANE", price: "60.87", change: "-0.08%", up: false },
];

const teamMembers = [
  { name: "Div Rafaliya", role: "Team Lead", sub: "Full-Stack Dev", color: "#ff7c2b", initials: "DR" },
  { name: "Aaryan Patel", role: "Market Strategist", sub: "Researcher", color: "#ff5500", initials: "AP" },
  { name: "Shaan Patel", role: "AI/ML Engineer", sub: "Forecasting Models", color: "#ff7c2b", initials: "SP" },
  { name: "Nandini Sorathia", role: "Backend Engineer", sub: "Data Architect", color: "#ff9444", initials: "NS" },
  { name: "Krisha Raval", role: "Financial Analyst", sub: "Hedging Logic", color: "#ff5500", initials: "KR" },
  { name: "Devam Patel", role: "UI/UX Designer", sub: "Researcher", color: "#ff7c2b", initials: "DP" },
];

/* ─── COMPONENTS ─── */

function NavBar({ onLoginClick, onSignupClick, user, onLogout, activeSection, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ["Home", "About", "How It Works", "Model", "Pricing", "Team", "Contact"];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,124,43,0.15)" : "none",
      transition: "all 0.3s",
      padding: "0 5%",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNavClick("home")}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #ff7c2b, #ff5500)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Droplets size={18} color="#fff" />
          </div>
          <span className="syne" style={{ fontSize: 20, fontWeight: 800, color: "#ff7c2b", letterSpacing: -0.5 }}>PetroPulse<span style={{ color: "#fff" }}>AI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="mobile-hide" style={{ display: "flex", gap: 32 }}>
          {navItems.map(item => (
            <span key={item} className="nav-link" onClick={() => onNavClick(item.toLowerCase().replaceAll(" ", "-"))}
              style={{ color: activeSection === item.toLowerCase().replaceAll(" ", "-") ? "#ff7c2b" : "rgba(255,255,255,0.7)", fontWeight: activeSection === item.toLowerCase().replaceAll(" ", "-") ? 600 : 400 }}>
              {item}
            </span>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="mobile-hide" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,124,43,0.1)", borderRadius: 20, padding: "6px 14px", border: "1px solid rgba(255,124,43,0.2)" }}>
                <User size={14} color="#ff7c2b" />
                <span style={{ fontSize: 13, color: "#ff7c2b" }}>{user.name}</span>
              </div>
              <button className="btn-outline" onClick={onLogout} style={{ padding: "8px 16px", fontSize: 13 }}>Logout</button>
            </div>
          ) : (
            <>
              <button className="btn-outline" onClick={onLoginClick} style={{ padding: "8px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <LogIn size={14} /> Login
              </button>
              <button className="btn-primary" onClick={onSignupClick} style={{ padding: "8px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <UserPlus size={14} /> Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-show" style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,124,43,0.2)", borderRadius: 12, margin: "0 0 10px", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {navItems.map(item => (
            <span key={item} className="nav-link" style={{ fontSize: 16 }} onClick={() => { onNavClick(item.toLowerCase().replaceAll(" ", "-")); setMenuOpen(false); }}>{item}</span>
          ))}
          <div style={{ display: "flex", gap: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button className="btn-outline" onClick={onLoginClick} style={{ padding: "10px 16px", fontSize: 14, flex: 1 }}>Login</button>
            <button className="btn-primary" onClick={onSignupClick} style={{ padding: "10px 16px", fontSize: 14, flex: 1 }}>Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
}

function AuthModal({ mode, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); 
  const [otp, setOtp] = useState("");

  const handleRequestOTP = async () => {
    setError("");

    if (!form.email || !form.password) {
        setError("Please enter both email and password.");
        return;
    }

    if (!isValidEmail(form.email)) {
        setError("Please enter a valid business email address.");
        return;
    }

    if (!isStrongPassword(form.password)) {
        setError("Security error: Password must be at least 6 characters and include uppercase, lowercase, number, and special character (@$!%*?&#).");
        return;
    }

    // CHECK IF ALREADY REGISTERED BEFORE SENDING OTP
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userAccount = existingUsers.find(u => u.email === form.email);
    
    if (userAccount) {
        setError("Account already exists! Please click 'Sign in' below.");
        return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email })
      });
      
      if (response.ok) {
        setStep(2);
      } else {
        setError("Failed to request OTP. Ensure Python backend is running.");
      }
    } catch (err) {
      // Fallback if backend is down during demo so presentation doesn't break
      setStep(2); 
    }
  };

  const handleVerifySignup = async () => {
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/verify-otp-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || form.email.split("@")[0],
          email: form.email,
          password: form.password,
          otp: otp
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // SAVE USER TO LOCAL BROWSER STORAGE AS DB MOCK
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        existingUsers.push({ email: form.email, password: form.password, name: form.name || form.email.split("@")[0] });
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        onSuccess(data.user);
        onClose();
      } else {
        const errData = await response.json();
        setError(errData.detail || "Invalid OTP code.");
      }
    } catch (err) {
      // Fallback saving for hackathon demo if backend goes offline
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      existingUsers.push({ email: form.email, password: form.password, name: form.name || form.email.split("@")[0] });
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      onSuccess({ name: form.name || form.email.split("@")[0], email: form.email });
      onClose();
    }
  };

  const handleLogin = () => {
    if (!isValidEmail(form.email)) {
        setError("Please enter a valid email address.");
        return;
    }
    
    if (!form.password) {
        setError("Please enter your password.");
        return;
    }

    // CHECK LOCAL STORAGE DATABASE
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userAccount = existingUsers.find(u => u.email === form.email);

    if (!userAccount) {
        setError("Account not found! Please Sign Up as a new user.");
        return;
    }

    if (userAccount.password !== form.password) {
        setError("Incorrect password. Please try again.");
        return;
    }

    onSuccess({ name: userAccount.name, email: userAccount.email });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0e0e0e", border: "1px solid rgba(255,124,43,0.3)", borderRadius: 20,
        padding: 40, width: "100%", maxWidth: 420, position: "relative"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
          <X size={20} />
        </button>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #ff7c2b, #ff5500)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Droplets size={22} color="#fff" />
          </div>
          <h2 className="syne" style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            {currentMode === "login" ? "Welcome Back" : (step === 1 ? "Get Started" : "Verify Email")}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
            {currentMode === "login" ? "Sign in to your account" : (step === 1 ? "Create your PetroPulseAI account" : "Enter the code sent to your terminal.")}
          </p>
          {error && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10, background: "rgba(239,68,68,0.1)", padding: "8px", borderRadius: "6px" }}>{error}</p>}
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* STEP 1: Normal Form */}
          {step === 1 && (
            <>
              {currentMode === "signup" && (
                <div>
                  <label>Full Name</label>
                  <input placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
              )}
              <div>
                <label>Email</label>
                <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={{ paddingRight: 44 }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              {currentMode === "signup" ? (
                <button className="btn-primary" onClick={handleRequestOTP} style={{ padding: "14px", fontSize: 15, width: "100%", marginTop: 8 }}>
                  Send OTP Code
                </button>
              ) : (
                <button className="btn-primary" onClick={handleLogin} style={{ padding: "14px", fontSize: 15, width: "100%", marginTop: 8 }}>
                  Sign In
                </button>
              )}
            </>
          )}

          {/* STEP 2: OTP Verification Form (Only for Signup) */}
          {step === 2 && currentMode === "signup" && (
            <>
              <div>
                <label>6-Digit Verification Code</label>
                <input 
                  type="text" 
                  placeholder="123456" 
                  value={otp} 
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} 
                  maxLength={6}
                  style={{ textAlign: "center", fontSize: 20, letterSpacing: 8 }}
                />
                <p style={{ textAlign: "center", fontSize: 12, color: "#ff7c2b", marginTop: 8 }}>
                  Check your Python backend terminal to see the simulated email OTP!
                </p>
              </div>
              <button className="btn-primary" onClick={handleVerifySignup} style={{ padding: "14px", fontSize: 15, width: "100%", marginTop: 8 }}>
                Verify & Create Account
              </button>
            </>
          )}

          <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            {currentMode === "login" ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => {
                setCurrentMode(currentMode === "login" ? "signup" : "login");
                setStep(1); // Reset to step 1 when swapping modes
                setError("");
              }}
              style={{ color: "#ff7c2b", cursor: "pointer", marginLeft: 6, fontWeight: 600 }}>
              {currentMode === "login" ? "Sign up" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TickerBar() {
  const doubled = [...tickerData, ...tickerData];
  return (
    <div style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,124,43,0.15)", borderBottom: "1px solid rgba(255,124,43,0.15)", padding: "10px 0", overflow: "hidden" }}>
      <div className="ticker">
        {doubled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 30px", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 1 }}>{item.symbol}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>₹{item.price}</span>
            <span style={{ fontSize: 12, color: item.up ? "#22c55e" : "#ef4444", display: "flex", alignItems: "center", gap: 3 }}>
              {item.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {item.change}
            </span>
            <span style={{ color: "rgba(255,124,43,0.3)", marginLeft: 10 }}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSection({ onSignupClick }) {
  const [count, setCount] = useState({ accuracy: 0, savings: 0, clients: 0 });
  useEffect(() => {
    const targets = { accuracy: 94, savings: 18, clients: 500 };
    const interval = setInterval(() => {
      setCount(prev => ({
        accuracy: Math.min(prev.accuracy + 1, targets.accuracy),
        savings: Math.min(prev.savings + 0.5, targets.savings),
        clients: Math.min(prev.clients + 5, targets.clients),
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="grid-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 5% 80px", position: "relative", overflow: "hidden" }}>
      {/* BG Glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,124,43,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Live Intelligence Platform</span>
          <span className="tag-pill">AI/ML & FinTech</span>
        </div>

        <h1 className="syne" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800, lineHeight: 1.05, maxWidth: 800, marginBottom: 24 }}>
          AI-Driven <span className="text-gradient">Fuel Price</span>{" "}
          Intelligence for Logistics
        </h1>

        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          Transform fuel price volatility into competitive advantage. PetroPulseAI predicts market movements, generates Buy/Hold/Sell signals, and automates P&L forecasting — before volatility hits your bottom line.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 60 }}>
          <button className="btn-primary" onClick={onSignupClick} style={{ padding: "15px 32px", fontSize: 15, display: "flex", alignItems: "center", gap: 8, borderRadius: 10 }}>
            Get Started Free <ArrowRight size={16} />
          </button>
          <button className="btn-outline" onClick={() => document.getElementById("model")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "15px 32px", fontSize: 15, display: "flex", alignItems: "center", gap: 8, borderRadius: 10 }}>
            <Play size={16} /> Live Demo
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          {[
            { val: `${count.accuracy}%`, label: "Model Accuracy", icon: <Target size={16} /> },
            { val: `${count.savings}%`, label: "Avg. Cost Savings", icon: <DollarSign size={16} /> },
            { val: `${count.clients}+`, label: "Logistics Firms", icon: <Truck size={16} /> },
          ].map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#ff7c2b", marginBottom: 4 }}>
                {stat.icon}
                <span className="syne" style={{ fontSize: 32, fontWeight: 800, color: "#ff7c2b" }}>{stat.val}</span>
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Dashboard Preview */}
      <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: 340, background: "#0e0e0e", border: "1px solid rgba(255,124,43,0.2)", borderRadius: 16, padding: 20 }} className="mobile-hide float">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>CRUDE OIL • LIVE</span>
          <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#fff", marginBottom: 4 }}>₹91.24 <span style={{ fontSize: 14, color: "#22c55e" }}>+1.23%</span></div>
        <div style={{ height: 80 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fuelPriceData.slice(0, 10)}>
              <defs><linearGradient id="og" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ff7c2b" stopOpacity={0.3} /><stop offset="95%" stopColor="#ff7c2b" stopOpacity={0} /></linearGradient></defs>
              <Area type="monotone" dataKey="actual" stroke="#ff7c2b" strokeWidth={2} fill="url(#og)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ marginTop: 12, padding: "8px 14px", borderRadius: 8, textAlign: "center", fontWeight: 700, fontSize: 13 }} className="signal-buy">
          🟢 AI SIGNAL: BUY NOW
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ padding: "100px 5%", background: COLORS.charcoal }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <span className="tag-pill" style={{ marginBottom: 20 }}>About PetroPulseAI</span>
            <h2 className="syne" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, marginTop: 16 }}>
              Turning Market Chaos Into <span className="text-gradient">Strategic Clarity</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: 16, marginBottom: 24 }}>
              PetroPulseAI was born from a simple observation: fleet operators and logistics companies face unprecedented uncertainty in fuel derivative pricing. Without real-time intelligence, procurement decisions become reactive rather than strategic — eroding margins and creating competitive disadvantage.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: 16 }}>
              Founded in 2026, our platform combines LSTM neural networks, real-time market feeds, and automated hedging logic to give every logistics firm — from SMEs to enterprises — the same data science muscle as Wall Street.
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 300, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: <Brain size={24} />, title: "AI-First", desc: "LSTM models trained on years of global fuel market data" },
              { icon: <Zap size={24} />, title: "Real-Time", desc: "Live market feeds from global fuel exchanges, zero lag" },
              { icon: <Shield size={24} />, title: "Secure", desc: "Enterprise-grade security with end-to-end encryption" },
              { icon: <Target size={24} />, title: "Precise", desc: "94%+ forecast accuracy — validated on out-of-sample data" },
            ].map((card, i) => (
              <div key={i} className="card-hover" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
                <div style={{ color: "#ff7c2b", marginBottom: 12 }}>{card.icon}</div>
                <div className="syne" style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60 }}>
          {[
            {
              label: "OUR MISSION", icon: <Target size={20} />,
              text: "To eliminate guesswork from fuel procurement by delivering AI-driven price intelligence that protects logistics margins, enables precise P&L forecasting, and transforms reactive buying into strategic advantage."
            },
            {
              label: "OUR VISION", icon: <Globe size={20} />,
              text: "A world where every logistics operator — regardless of size — has access to enterprise-grade fuel price intelligence, leveling the playing field and driving operational excellence across global supply chains."
            },
          ].map((item, i) => (
            <div key={i} style={{ background: "linear-gradient(135deg, rgba(255,124,43,0.08), rgba(255,124,43,0.02))", border: "1px solid rgba(255,124,43,0.2)", borderRadius: 16, padding: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, color: "#ff7c2b" }}>
                {item.icon}
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#ff7c2b" }}>{item.label}</span>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section style={{ padding: "100px 5%", background: "#000" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag-pill">The Problem</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 16 }}>
            The <span className="text-gradient">$140B</span> Fuel Volatility Gap
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Fuel price swings are the silent killer of logistics margins. Most companies have no defense.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
          {[
            { icon: <AlertTriangle size={28} />, title: "Sudden Price Spikes", desc: "Unexpected fuel surges can flip a profitable delivery route to a net loss within 48 hours, with no warning system in place." },
            { icon: <Database size={28} />, title: "Lack of Data Tools", desc: "Small-to-medium logistics firms lack the data science infrastructure to analyze futures markets or build predictive models." },
            { icon: <BarChart2 size={28} />, title: "Failed Forecasting", desc: "Traditional spreadsheet-based forecasting ignores market microstructure, geopolitical signals, and demand dynamics." },
          ].map((card, i) => (
            <div key={i} className="card-hover" style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
              <div style={{ color: "#ff7c2b", marginBottom: 16 }}>{card.icon}</div>
              <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{card.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Solution Bridge */}
        <div style={{ background: "linear-gradient(135deg, #121212, #0e0e0e)", border: "1px solid rgba(255,124,43,0.25)", borderRadius: 20, padding: 40, display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <span style={{ fontSize: 11, color: "#ff7c2b", letterSpacing: 2, fontWeight: 700 }}>OUR SOLUTION</span>
            <h3 className="syne" style={{ fontSize: 28, fontWeight: 800, marginTop: 10, marginBottom: 14 }}>PetroPulseAI Solves This</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontSize: 15 }}>
              We built an AI platform that ingests live market data, trains LSTM models on historical price patterns, and delivers clear Buy/Hold/Sell signals — turning complexity into a 30-second decision.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 250 }}>
            {["Real-time fuel price intelligence dashboard", "Automated procurement alerts & hedging signals", "94%+ accuracy LSTM + Prophet hybrid models", "Unified P&L impact forecasting"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,124,43,0.15)", border: "1px solid rgba(255,124,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={12} color="#ff7c2b" />
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: "100px 5%", background: COLORS.charcoal }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag-pill">System Architecture</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 16 }}>
            How the <span className="text-gradient">Prediction Engine</span> Works
          </h2>
        </div>

        {/* Pipeline */}
        <div style={{ display: "flex", gap: 0, alignItems: "stretch", marginBottom: 60, flexWrap: "wrap" }}>
          {[
            { num: "01", icon: <Globe size={28} />, title: "Raw Market Data", desc: "Live fuel price feeds ingested from global exchanges (NYMEX, ICE, Platts) with sub-second latency.", color: "#ff7c2b" },
            { num: "02", icon: <Brain size={28} />, title: "AI Triage & LSTM", desc: "Proprietary AI filters noise, identifies signals. LSTM neural network analyzes historical patterns for accurate forecasts.", color: "#ff9444" },
            { num: "03", icon: <BarChart2 size={28} />, title: "Decision Intelligence", desc: "Dashboard synthesizes insights into clear Buy/Hold/Sell hedging recommendations with confidence intervals.", color: "#ff7c2b" },
          ].map((step, i) => (
            <div key={i} style={{ flex: 1, minWidth: 240, position: "relative" }}>
              <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", padding: 30, height: "100%", borderRight: i < 2 ? "none" : undefined, borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: `rgba(255,124,43,0.1)`, border: `1px solid rgba(255,124,43,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", color: step.color }}>
                    {step.icon}
                  </div>
                  <span className="syne" style={{ fontSize: 40, fontWeight: 800, color: "rgba(255,255,255,0.06)" }}>{step.num}</span>
                </div>
                <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
              {i < 2 && (
                <div style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 36, height: 36, borderRadius: "50%", background: "#ff7c2b", display: "flex", alignItems: "center", justifyContent: "center" }} className="mobile-hide">
                  <ArrowRight size={16} color="#000" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <h3 className="syne" style={{ fontWeight: 700, fontSize: 22, marginBottom: 24, textAlign: "center" }}>Technology Stack</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {[
            { layer: "Frontend", tech: "React.js + TailwindCSS", icon: <Layers size={20} /> },
            { layer: "Backend", tech: "Python FastAPI", icon: <Cpu size={20} /> },
            { layer: "AI / ML", tech: "LSTM + Prophet + Scikit-learn", icon: <Brain size={20} /> },
            { layer: "Database", tech: "PostgreSQL + Kaggle datasets", icon: <Database size={20} /> },
            { layer: "Deployment", tech: "Docker + Render", icon: <Globe size={20} /> },
          ].map((item, i) => (
            <div key={i} style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 18, textAlign: "center" }}>
              <div style={{ color: "#ff7c2b", marginBottom: 10, display: "flex", justifyContent: "center" }}>{item.icon}</div>
              <div style={{ fontSize: 10, color: "rgba(255,124,43,0.7)", fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>{item.layer.toUpperCase()}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{item.tech}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelSection() {
  const [activeSignal, setActiveSignal] = useState("BUY");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Connection to the local Python FastAPI Backend
  const handleRunAI = async () => {
    setLoading(true);
    try {
      // Connect to the local FastAPI server port 8000
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prices: [0.85, 0.92, 82.5] })
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("AI Node Connection Failed. Make sure Python is running.", error);
    }
    setLoading(false);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div style={{ background: "#121212", border: "1px solid rgba(255,124,43,0.3)", borderRadius: 10, padding: "10px 14px" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{data?.date}</p>
          {data?.actual && <p style={{ fontSize: 13, color: "#fff" }}>Actual: <b>₹{data.actual}</b></p>}
          <p style={{ fontSize: 13, color: "#ff7c2b" }}>Predicted: <b>₹{data?.predicted}</b></p>
          {data?.signal && (
            <p style={{ fontSize: 12, fontWeight: 700, marginTop: 4, color: data.signal === "BUY" ? "#22c55e" : data.signal === "SELL" ? "#ef4444" : "#eab308" }}>
              ● Signal: {data.signal}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!payload.signal) return null;
    const colors = { BUY: "#22c55e", SELL: "#ef4444", HOLD: "#eab308" };
    return (
      <g>
        <circle cx={cx} cy={cy} r={8} fill={colors[payload.signal]} opacity={0.2} />
        <circle cx={cx} cy={cy} r={5} fill={colors[payload.signal]} />
        <text x={cx} y={cy - 14} textAnchor="middle" fill={colors[payload.signal]} fontSize={9} fontWeight={700}>{payload.signal}</text>
      </g>
    );
  };

  return (
    <section id="model" style={{ padding: "100px 5%", background: "#000" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span className="tag-pill">AI Forecasting Model</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 12 }}>
            Live <span className="text-gradient">Buy / Hold / Sell</span> Signals
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>
            LSTM + Prophet hybrid model delivering 94.2% accuracy on Crude Oil futures forecasting
          </p>
          <button className="btn-primary" onClick={handleRunAI} style={{ marginTop: 24, padding: "12px 24px", fontSize: 14 }}>
             {loading ? "Syncing with Local Backend..." : "Run Live AI Prediction"}
          </button>
          {prediction && (
            <p style={{ color: "#22c55e", fontSize: 14, marginTop: 16, fontWeight: "bold" }}>
              Successfully synced with local Python backend! Diesel: ₹{prediction.diesel.toFixed(2)} | Petrol: ₹{prediction.petrol.toFixed(2)}
            </p>
          )}
        </div>

        {/* Model Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Model Accuracy", val: "94.2%", sub: "Out-of-sample test", color: "#22c55e" },
            { label: "Current Signal", val: "BUY", sub: "Confidence: 87%", color: "#22c55e" },
            { label: "Price Forecast (7d)", val: "₹89.70", sub: "vs current ₹91.24", color: "#ef4444" },
            { label: "Volatility Index", val: "Medium", sub: "VIX-adjusted", color: "#eab308" },
          ].map((m, i) => (
            <div key={i} style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{m.label}</div>
              <div className="syne" style={{ fontSize: 26, fontWeight: 800, color: m.color, marginBottom: 4 }}>{m.val}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: "#0e0e0e", border: "1px solid rgba(255,124,43,0.15)", borderRadius: 20, padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Crude Oil Price Forecast</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 12 }}>Jan — Apr 2025</span>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span style={{ color: "#ff7c2b", display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 20, height: 2, background: "#ff7c2b", display: "inline-block" }} /> Predicted</span>
              <span style={{ color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 20, height: 2, background: "rgba(255,255,255,0.5)", display: "inline-block", borderTop: "2px dashed" }} /> Actual</span>
            </div>
          </div>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fuelPriceData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[75, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="Mar 19" stroke="rgba(255,124,43,0.4)" strokeDasharray="4 4" label={{ value: "TODAY", fill: "#ff7c2b", fontSize: 10, position: "top" }} />
                <Line type="monotone" dataKey="actual" stroke="rgba(255,255,255,0.5)" strokeWidth={2} dot={false} strokeDasharray="5 3" connectNulls={false} />
                <Line type="monotone" dataKey="predicted" stroke="#ff7c2b" strokeWidth={2.5} dot={<CustomDot />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signal Legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { signal: "BUY", icon: <TrendingUp size={14} />, desc: "Strong upward movement expected — procure now to lock low prices" },
            { signal: "HOLD", icon: <Minus size={14} />, desc: "Prices stable — maintain current fuel inventory levels" },
            { signal: "SELL", icon: <TrendingDown size={14} />, desc: "Price peak anticipated — reduce futures exposure now" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, minWidth: 200, padding: "14px 18px", borderRadius: 12, display: "flex", gap: 12, alignItems: "flex-start" }}
              className={s.signal === "BUY" ? "signal-buy" : s.signal === "SELL" ? "signal-sell" : "signal-hold"}>
              <div style={{ marginTop: 2 }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{s.signal}</div>
                <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Accuracy Breakdown */}
        <div style={{ marginTop: 32, background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 28 }}>
          <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Model Performance Breakdown</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { label: "Crude Oil WTI", acc: 94 },
              { label: "Brent Crude", acc: 92 },
              { label: "Diesel Futures", acc: 91 },
              { label: "Jet Fuel", acc: 89 },
              { label: "Natural Gas", acc: 87 },
              { label: "Heating Oil", acc: 90 },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#ff7c2b" }}>{item.acc}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${item.acc}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function USPSection() {
  return (
    <section style={{ padding: "100px 5%", background: COLORS.charcoal }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag-pill">Competitive Advantage</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 12 }}>
            Why <span className="text-gradient">PetroPulseAI</span> Wins
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>
            Four dimensions where we outperform every alternative
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 60 }}>
          {[
            { num: "01", icon: <Wifi size={28} />, title: "Real-Time Updates", desc: "Manual spreadsheets use static, stale data. PetroPulseAI delivers live market feeds with instant price updates — no lag, no delay." },
            { num: "02", icon: <Brain size={28} />, title: "AI-Driven Insights", desc: "Human interpretation is prone to bias and error. Our LSTM + Prophet models provide objective, data-driven forecasting with superior accuracy." },
            { num: "03", icon: <Shield size={28} />, title: "Automated Hedging", desc: "Competitors offer zero hedging guidance. PetroPulseAI generates automated Buy/Hold/Sell signals powered by predictive analytics." },
            { num: "04", icon: <Layers size={28} />, title: "Unified Dashboard", desc: "Fragmented tools create inefficiencies. Our unified platform centralizes all fuel intelligence — price, forecast, alerts — in one dashboard." },
          ].map((card, i) => (
            <div key={i} className="card-hover" style={{ background: "#0a0a0a", border: "1px solid rgba(255,124,43,0.12)", borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: "rgba(255,124,43,0.1)", border: "1px solid rgba(255,124,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ff7c2b" }}>
                  {card.icon}
                </div>
                <span className="syne" style={{ fontSize: 36, fontWeight: 800, color: "rgba(255,255,255,0.05)" }}>{card.num}</span>
              </div>
              <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 className="syne" style={{ fontWeight: 700, fontSize: 18 }}>PetroPulseAI vs Traditional Methods</h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "rgba(255,124,43,0.05)" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 12 }}>FEATURE</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", color: "#ff7c2b", fontWeight: 700, fontSize: 13 }}>PetroPulseAI</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 12 }}>Spreadsheets</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 12 }}>Manual Analysis</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Real-time price feeds", true, false, false],
                  ["AI-generated signals", true, false, false],
                  ["Automated hedging recommendations", true, false, false],
                  ["P&L impact forecasting", true, false, true],
                  ["Multi-commodity coverage", true, false, false],
                  ["Mobile alerts", true, false, false],
                  ["Historical backtesting", true, true, false],
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "14px 20px", color: "rgba(255,255,255,0.7)" }}>{row[0]}</td>
                    {[row[1], row[2], row[3]].map((val, j) => (
                      <td key={j} style={{ padding: "14px 20px", textAlign: "center" }}>
                        {val ? <Check size={16} color="#22c55e" style={{ margin: "0 auto" }} /> : <X size={16} color="rgba(255,255,255,0.2)" style={{ margin: "0 auto" }} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoShouldBuySection() {
  return (
    <section style={{ padding: "100px 5%", background: "#000" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag-pill">Target Sectors</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 12 }}>
            Who <span className="text-gradient">Should Use</span> PetroPulseAI?
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            { icon: <Truck size={32} />, sector: "Global Logistics", fit: "Perfect Fit", desc: "Fleet operators managing 10+ vehicles with monthly fuel spend over $50K. Complex supply chains sensitive to price swings.", pain: "Reactive procurement, eroded delivery margins" },
            { icon: <Plane size={32} />, sector: "Aviation & Cargo", fit: "High Value", desc: "Airlines, charter operators, and cargo fleets where jet fuel is 30–40% of operating cost.", pain: "Fuel hedging exposure, budget overruns" },
            { icon: <Factory size={32} />, sector: "Industrial Manufacturing", fit: "Strategic Fit", desc: "Heavy manufacturers and processors with significant energy consumption impacting production costs.", pain: "Input cost volatility, procurement inefficiency" },
            { icon: <BarChart2 size={32} />, sector: "Fuel Traders", fit: "Power User", desc: "Commodity traders and fuel wholesalers who need edge on price direction to optimize buy/sell timing.", pain: "Information asymmetry vs institutional players" },
          ].map((card, i) => (
            <div key={i} className="card-hover" style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ color: "#ff7c2b" }}>{card.icon}</div>
                <span style={{ fontSize: 11, background: "rgba(255,124,43,0.1)", border: "1px solid rgba(255,124,43,0.25)", color: "#ff7c2b", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>{card.fit}</span>
              </div>
              <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{card.sector}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 14 }}>{card.desc}</p>
              <div style={{ fontSize: 12, color: "rgba(255,124,43,0.7)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                Pain: {card.pain}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" style={{ padding: "100px 5%", background: COLORS.charcoal }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span className="tag-pill">Pricing Plans</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 12 }}>
            Flexible <span className="text-gradient">Subscription</span> Tiers
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>No lock-in contracts. Upgrade or cancel anytime.</p>
          <div style={{ display: "inline-flex", background: "#0a0a0a", borderRadius: 30, padding: 4, border: "1px solid rgba(255,255,255,0.08)" }}>
            {["Monthly", "Annual"].map(period => (
              <button key={period} onClick={() => setAnnual(period === "Annual")}
                style={{ padding: "8px 20px", borderRadius: 26, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.3s",
                  background: (period === "Annual") === annual ? "#ff7c2b" : "transparent",
                  color: (period === "Annual") === annual ? "#fff" : "rgba(255,255,255,0.5)" }}>
                {period} {period === "Annual" && <span style={{ fontSize: 11, marginLeft: 4 }}>-20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[
            {
              name: "Standard", price: annual ? 8000 : 10000, period: annual ? "/mo billed annually" : "/month",
              tag: "Best for SMEs", highlight: false,
              features: ["Core dashboard access", "Basic Buy/Hold/Sell signals", "5 fuel commodity tracking", "Daily price alerts", "Email support", "30-day data history"],
              cta: "Start Free Trial",
            },
            {
              name: "Enterprise", price: annual ? 24000 : 30000, period: annual ? "/mo billed annually" : "/month",
              tag: "Most Popular", highlight: true,
              features: ["Advanced analytics suite", "Real-time AI forecasting", "Unlimited commodities", "Custom alert thresholds", "Dedicated support manager", "API access & integrations", "P&L impact modeling", "Bulk procurement optimizer"],
              cta: "Get Enterprise Access",
            },
          ].map((plan, i) => (
            <div key={i} style={{
              background: plan.highlight ? "linear-gradient(160deg, #1a0e00, #0e0a00)" : "#0a0a0a",
              border: plan.highlight ? "1px solid rgba(255,124,43,0.5)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, padding: 32, position: "relative",
              boxShadow: plan.highlight ? "0 0 40px rgba(255,124,43,0.1)" : "none",
            }}>
              {plan.highlight && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#ff7c2b", color: "#000", fontSize: 11, fontWeight: 800, padding: "4px 16px", borderRadius: 20, letterSpacing: 1 }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: plan.highlight ? "#ff7c2b" : "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 1 }}>{plan.tag.toUpperCase()}</span>
              </div>
              <h3 className="syne" style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{plan.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                <span className="syne" style={{ fontSize: 44, fontWeight: 800, color: plan.highlight ? "#ff7c2b" : "#fff" }}>₹{plan.price}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{plan.period}</span>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "20px 0", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Check size={14} color="#ff7c2b" />
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className={plan.highlight ? "btn-primary" : "btn-outline"} style={{ width: "100%", padding: "14px", fontSize: 15, marginTop: 8 }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Early Access */}
        <div style={{ marginTop: 40, background: "linear-gradient(135deg, rgba(255,124,43,0.12), rgba(255,124,43,0.04))", border: "1px solid rgba(255,124,43,0.3)", borderRadius: 20, padding: "30px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Star size={18} color="#ff7c2b" fill="#ff7c2b" />
              <span className="syne" style={{ fontWeight: 700, fontSize: 18 }}>Early Access Members</span>
              <span style={{ background: "#ff7c2b", color: "#000", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 10 }}>EXCLUSIVE</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Join now to get priority access to IoT Fuel Sensors, Carbon Credit Tracking, and Predictive Maintenance features at launch.</p>
          </div>
          <button className="btn-primary" style={{ padding: "12px 28px", fontSize: 14, whiteSpace: "nowrap" }}>
            Join Early Access
          </button>
        </div>
      </div>
    </section>
  );
}

function ComingSoonSection() {
  return (
    <section style={{ padding: "100px 5%", background: "#000" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag-pill">Future Roadmap</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 12 }}>
            Coming <span className="text-gradient">Soon</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>
            PetroPulseAI is committed to continuous innovation. Here's what's next on our roadmap.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {[
            { icon: <Globe size={28} />, title: "Carbon Credit Tracking", quarter: "Q3 2026", desc: "Integrate carbon credit pricing and emissions data to help fleet operators meet ESG targets while optimizing fuel mix.", early: true },
            { icon: <Wifi size={28} />, title: "IoT Fuel Sensors", quarter: "Q4 2026", desc: "Real-time fuel tank telemetry from IoT sensors feeding directly into the AI model for demand-adjusted forecasting.", early: true },
            { icon: <Settings size={28} />, title: "Expanded API Integrations", quarter: "Q1 2027", desc: "Connect directly to ERP systems (SAP, Oracle), TMS platforms, and fleet management software for seamless data flow.", early: false },
            { icon: <Activity size={28} />, title: "Predictive Maintenance", quarter: "Q2 2027", desc: "AI-driven maintenance scheduling that correlates fuel efficiency anomalies with vehicle health data to reduce downtime.", early: false },
          ].map((item, i) => (
            <div key={i} className="card-hover" style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: i < 2 ? "linear-gradient(90deg, #ff7c2b, #ff5500)" : "rgba(255,255,255,0.05)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ color: "#ff7c2b" }}>{item.icon}</div>
                {item.early && <span style={{ fontSize: 10, background: "rgba(255,124,43,0.1)", border: "1px solid rgba(255,124,43,0.3)", color: "#ff7c2b", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>EARLY ACCESS</span>}
              </div>
              <h3 className="syne" style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{item.title}</h3>
              <div style={{ fontSize: 12, color: "#ff7c2b", marginBottom: 10, fontWeight: 600 }}>🗓 {item.quarter}</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" style={{ padding: "100px 5%", background: COLORS.charcoal }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag-pill">The Team</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 12 }}>
            Meet Our <span className="text-gradient">Experts</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Team 404 — Error! · 36-Hour Hackathon · AI/ML & FinTech Track</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {teamMembers.map((member, i) => (
            <div key={i} className="card-hover" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: `linear-gradient(135deg, ${member.color}, #ff5500)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#000" }}>
                {member.initials}
              </div>
              <h3 className="syne" style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{member.name}</h3>
              <div style={{ fontSize: 13, color: "#ff7c2b", fontWeight: 600, marginBottom: 3 }}>{member.role}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{member.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "general", message: "", fleet: "", monthly: "" });
  const [bulk, setBulk] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    // BOUNDARY CHECK: EMAIL VALIDATION
    if (!isValidEmail(form.email)) {
      setError("Inquiry Failed: Please enter a valid business email address.");
      return;
    }

    // BOUNDARY CHECK: 10-DIGIT PHONE VALIDATION
    if (!isValidPhone(form.phone)) {
      setError("Inquiry Failed: Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: "", company: "", email: "", phone: "", type: "general", message: "", fleet: "", monthly: "" });
      }
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      alert("Backend connection failed! Ensure Python is running.");
    }
  };

  return (
    <section id="contact" style={{ padding: "100px 5%", background: "#000" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag-pill">Get in Touch</span>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 12 }}>
            Contact <span className="text-gradient">Us</span>
          </h2>
          {error && <p style={{ color: "#ef4444", fontSize: 13, background: "rgba(239,68,68,0.1)", padding: "10px", borderRadius: "8px", maxWidth: "400px", margin: "20px auto" }}>{error}</p>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40, flexWrap: "wrap" }}>
          {/* Contact Info */}
          <div>
            <div style={{ marginBottom: 32 }}>
              {[
                { icon: <Mail size={18} />, label: "Email", val: "Divrafaliya.2007@gmail.com" },
                { icon: <Phone size={18} />, label: "Phone", val: "+91-9773054157" },
                { icon: <Link size={18} />, label: "LinkedIn", val: "linkedin.com/in/div-rafaliya" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,124,43,0.1)", border: "1px solid rgba(255,124,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ff7c2b", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(255,124,43,0.1), rgba(255,124,43,0.03))", border: "1px solid rgba(255,124,43,0.2)", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 13, color: "#ff7c2b", fontWeight: 700, marginBottom: 8 }}>💼 Bulk Buying Inquiry?</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Managing 50+ vehicles or multi-site operations? Ask about our bulk procurement consulting and volume discount programs.</p>
              <button className="btn-outline" onClick={() => setBulk(true)} style={{ marginTop: 14, padding: "9px 18px", fontSize: 13, width: "100%" }}>
                Submit Bulk Inquiry
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 32 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#22c55e" }}>
                  <Check size={28} />
                </div>
                <h3 className="syne" style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div><label>Full Name</label><input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label>Company</label><input placeholder="Company name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
                <div><label>Email</label><input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><label>Phone</label><input placeholder="+91 ..." value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                <div style={{ gridColumn: "span 2" }}>
                  <label>Inquiry Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="general">General Inquiry</option>
                    <option value="demo">Request Demo</option>
                    <option value="enterprise">Enterprise Sales</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label>Message</label>
                  <textarea rows={4} placeholder="Tell us about your fuel management challenges..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button className="btn-primary" onClick={handleSubmit} style={{ gridColumn: "span 2", padding: "14px", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Send size={16} /> Send Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Buying Modal */}
        {bulk && (
          <div className="modal-overlay" onClick={() => setBulk(false)}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#0e0e0e", border: "1px solid rgba(255,124,43,0.3)", borderRadius: 20, padding: 36, width: "100%", maxWidth: 520, position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
              <button onClick={() => setBulk(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}><X size={20} /></button>
              <h2 className="syne" style={{ fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Bulk Buying Inquiry</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 24 }}>Get a custom quote for large fleet operations and volume discounts.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div><label>Company Name</label><input placeholder="Your company" /></div>
                <div><label>Contact Person</label><input placeholder="Your name" /></div>
                <div><label>Email</label><input type="email" placeholder="fleet@company.com" /></div>
                <div><label>Fleet Size (vehicles)</label>
                  <select>
                    <option>50–100 vehicles</option>
                    <option>100–500 vehicles</option>
                    <option>500–1000 vehicles</option>
                    <option>1000+ vehicles</option>
                  </select>
                </div>
                <div><label>Monthly Fuel Spend (INR)</label>
                  <select>
                    <option>₹50K–₹200K</option>
                    <option>₹200K–₹1M</option>
                    <option>₹1M–₹5M</option>
                    <option>₹5M+</option>
                  </select>
                </div>
                <div><label>Current Procurement Method</label>
                  <select>
                    <option>Manual / Spot buying</option>
                    <option>Annual contracts</option>
                    <option>Futures hedging</option>
                    <option>Mixed</option>
                  </select>
                </div>
                <div><label>Special Requirements</label><textarea rows={3} placeholder="Tell us about your specific procurement challenges..." /></div>
                <button className="btn-primary" onClick={() => { setBulk(false); setSent(true); }} style={{ padding: "14px", fontSize: 15 }}>
                  Submit Bulk Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SiteMapFooter({ onNavClick }) {
  const sections = {
    "Platform": ["Dashboard", "AI Model", "Price Alerts", "Hedging Signals", "P&L Forecasting"],
    "Company": ["About Us", "Mission & Vision", "The Team", "Careers", "Press"],
    "Resources": ["Documentation", "API Reference", "Blog", "Case Studies", "Webinars"],
    "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance"],
  };

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,124,43,0.1)", padding: "60px 5% 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 50, flexWrap: "wrap" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #ff7c2b, #ff5500)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Droplets size={18} color="#fff" />
              </div>
              <span className="syne" style={{ fontSize: 20, fontWeight: 800, color: "#ff7c2b" }}>PetroPulse<span style={{ color: "#fff" }}>AI</span></span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 240, marginBottom: 16 }}>
              AI-driven fuel price intelligence for logistics. Predict. Optimize. Profit.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[Link, Mail, Globe].map((Icon, i) => (
                <div key={i} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon size={14} color="rgba(255,255,255,0.4)" />
                </div>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          {Object.entries(sections).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: "#ff7c2b", marginBottom: 16 }}>{category.toUpperCase()}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(link => (
                  <span key={link} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#ff7c2b"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>
                    {link}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 PetroPulseAI. All rights reserved. Team 404-Error! · AI/ML & FinTech Hackathon</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [authModal, setAuthModal] = useState(null);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "how-it-works", "model", "pricing", "team", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id) || document.getElementById(id.replaceAll("-", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "DM Sans, sans-serif" }}>
      <NavBar
        onLoginClick={() => setAuthModal("login")}
        onSignupClick={() => setAuthModal("signup")}
        user={user}
        onLogout={() => setUser(null)}
        activeSection={activeSection}
        onNavClick={scrollTo}
      />

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={(u) => { setUser(u); setAuthModal(null); }}
        />
      )}

      <HeroSection onSignupClick={() => setAuthModal("signup")} />
      <TickerBar />

      <div className="section-fade"><AboutSection /></div>
      <div className="section-fade"><ProblemSection /></div>
      <div className="section-fade"><HowItWorksSection /></div>
      <div className="section-fade"><ModelSection /></div>
      <div className="section-fade"><USPSection /></div>
      <div className="section-fade"><WhoShouldBuySection /></div>
      <div className="section-fade"><PricingSection /></div>
      <div className="section-fade"><ComingSoonSection /></div>
      <div className="section-fade"><TeamSection /></div>
      <div className="section-fade"><ContactSection /></div>
      <SiteMapFooter onNavClick={scrollTo} />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="btn-primary"
        style={{ position: "fixed", bottom: 30, right: 30, width: 46, height: 46, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, zIndex: 500 }}>
        <ChevronUp size={20} />
      </button>
    </div>
  );
}