import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Users,
  Crown,
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const avatars = [
  "😊",
  "🎓",
  "🚀",
  "🌟",
  "🎨",
  "🎯",
  "🎪",
  "🎭",
  "🎸",
  "🎮",
  "🏀",
  "⚡",
];

const roles = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    desc: "Learn and collaborate with peers",
    gradient: "from-[#2F80ED] to-[#7B61FF]",
    glow: "rgba(47,128,237,0.3)",
  },
  { 
    id: "tutor", 
    label: "Tutor", 
    icon: Users,
    desc: "Guide and support learners",
    gradient: "from-[#2DD4BF] to-[#0D9488]",
    glow: "rgba(45,212,191,0.3)",
  },
  { 
    id: "admin", 
    label: "Admin", 
    icon: Crown,
    desc: "Manage teams and permissions",
    gradient: "from-[#FACC15] to-[#EAB308]",
    glow: "rgba(250,204,21,0.3)",
  }
];

/* ─── Neon floating orbs background ─── */
function NeonBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Big ambient blobs */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(47,128,237,0.18) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,97,255,0.18) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,212,191,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(47,128,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47,128,237,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -80, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${8 + i * 8}%`,
            top: `${20 + (i % 5) * 15}%`,
            width: i % 3 === 0 ? 6 : 4,
            height: i % 3 === 0 ? 6 : 4,
            borderRadius: "50%",
            background: [
              "#2F80ED",
              "#7B61FF",
              "#2DD4BF",
              "#FACC15",
            ][i % 4],
            boxShadow: `0 0 8px ${["#2F80ED", "#7B61FF", "#2DD4BF", "#FACC15"][i % 4]}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Confetti ─── */
function Confetti() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: window.innerHeight + 40,
            rotate: 720,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 0.5,
          }}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? 10 : 6,
            height: i % 3 === 0 ? 10 : 6,
            borderRadius: i % 2 === 0 ? "50%" : "2px",
            background: [
              "#2F80ED",
              "#7B61FF",
              "#2DD4BF",
              "#FACC15",
              "#FB7185",
            ][i % 5],
            boxShadow: `0 0 6px ${["#2F80ED", "#7B61FF", "#2DD4BF", "#FACC15", "#FB7185"][i % 5]}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Neon Input ─── */
function NeonInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  required,
}: {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ElementType;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        border: `1.5px solid ${focused ? "#2F80ED" : "rgba(255,255,255,0.1)"}`,
        boxShadow: focused
          ? "0 0 20px rgba(47,128,237,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "none",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
      }}
    >
      <Icon
        size={15}
        style={{
          color: focused ? "#2F80ED" : "rgba(148,163,184,0.6)",
          flexShrink: 0,
          transition: "color 0.2s",
        }}
      />
      <input
        id={id}
        type={isPassword && show ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "rgba(226,232,240,0.9)",
          fontSize: "0.88rem",
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(148,163,184,0.5)",
            padding: 0,
            display: "flex",
          }}
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      )}
    </div>
  );
}

/* ─── Main Auth Component ─── */
export function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<
    "login" | "signup" | "role" | "avatar"
  >("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    avatar: "",
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key: string) => (val: string) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      // Navigate is optional here as Layout will typically switch out the Auth component 
      // automatically based on AuthContext state becoming authenticated, 
      // but included as requested in your code.
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !formData.email ||
      !formData.password ||
      !formData.name
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setMode("role");
  };

  const handleRoleSelect = (roleId: string) => {
    setFormData((prev) => ({ ...prev, role: roleId }));
    setMode("avatar");
  };

  const handleAvatarFinish = async () => {
    if (!formData.avatar) {
      setError("Pick an avatar to continue!");
      return;
    }
    setError("");
    
    // Instead of delaying the registration via setTimeout which runs into unmount state issues,
    // we'll run the confetti state immediately but perform the registration simultaneously.
    setShowConfetti(true);
    setIsSubmitting(true);
    
    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role || "student",
        avatar: formData.avatar || "😊",
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      setShowConfetti(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSignup = mode === "signup";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <NeonBackground />
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 460,
          margin: "0 16px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #2F80ED, #7B61FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 24px rgba(47,128,237,0.5), 0 0 48px rgba(123,97,255,0.2)",
            }}
          >
            <Sparkles size={26} color="white" />
          </motion.div>
          <div>
            <h1
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1.8rem",
                fontWeight: 800,
                background:
                  "linear-gradient(135deg, #2F80ED, #7B61FF, #2DD4BF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
                lineHeight: 1,
              }}
            >
              EduSync
            </h1>
            <p
              style={{
                color: "rgba(148,163,184,0.6)",
                fontSize: "0.72rem",
                marginTop: 3,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Level Up Your Learning
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: 36,
            boxShadow:
              "0 0 0 1px rgba(47,128,237,0.1), 0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top glow line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #2F80ED, #7B61FF, transparent)",
              opacity: 0.6,
            }}
          />

          <AnimatePresence mode="wait">
            {/* ── Login ── */}
            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  Welcome Back! 👋
                </h2>
                <p
                  style={{
                    color: "rgba(148,163,184,0.7)",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    marginBottom: 28,
                  }}
                >
                  Ready to level up your learning?
                </p>

                <form
                  onSubmit={handleLogin}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <NeonInput
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    value={formData.email}
                    onChange={set("email")}
                    icon={Mail}
                    required
                  />
                  <NeonInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={set("password")}
                    icon={Lock}
                    required
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        color: "#FB7185",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: 8,
                      padding: "14px",
                      borderRadius: 14,
                      border: "none",
                      cursor: isSubmitting ? "wait" : "pointer",
                      background:
                        "linear-gradient(135deg, #2F80ED, #7B61FF)",
                      color: "white",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      boxShadow:
                        "0 0 20px rgba(47,128,237,0.4), 0 4px 16px rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      width: "100%",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"} <ArrowRight size={16} />
                  </motion.button>
                </form>

                <div
                  style={{ marginTop: 20, textAlign: "center" }}
                >
                  <span
                    style={{
                      color: "rgba(148,163,184,0.5)",
                      fontSize: "0.83rem",
                    }}
                  >
                    Don't have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#2DD4BF",
                      fontSize: "0.83rem",
                      fontWeight: 600,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    Sign up
                  </button>
                </div>

                {/* Demo hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    marginTop: 20,
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: "rgba(250,204,21,0.08)",
                    border: "1px solid rgba(250,204,21,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Zap
                    size={14}
                    style={{ color: "#FACC15", flexShrink: 0 }}
                  />
                  <p
                    style={{
                      color: "rgba(250,204,21,0.8)",
                      fontSize: "0.75rem",
                      margin: 0,
                    }}
                  >
                    Use your real email &amp; password for your backend DB.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* ── Sign Up ── */}
            {mode === "signup" && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  Join EduSync 🚀
                </h2>
                <p
                  style={{
                    color: "rgba(148,163,184,0.7)",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    marginBottom: 28,
                  }}
                >
                  Create your account to start leveling up
                </p>

                {/* Step indicator */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginBottom: 24,
                    justifyContent: "center",
                  }}
                >
                  {["Account", "Role", "Avatar"].map(
                    (step, i) => (
                      <div
                        key={step}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              i === 0
                                ? "linear-gradient(135deg, #2F80ED, #7B61FF)"
                                : "rgba(255,255,255,0.08)",
                            color:
                              i === 0
                                ? "white"
                                : "rgba(148,163,184,0.4)",
                            border:
                              i === 0
                                ? "none"
                                : "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {i + 1}
                        </div>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color:
                              i === 0
                                ? "rgba(226,232,240,0.7)"
                                : "rgba(148,163,184,0.35)",
                          }}
                        >
                          {step}
                        </span>
                        {i < 2 && (
                          <div
                            style={{
                              width: 20,
                              height: 1,
                              background:
                                "rgba(255,255,255,0.1)",
                            }}
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>

                <form
                  onSubmit={handleSignupStep}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <NeonInput
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={set("name")}
                    icon={User}
                    required
                  />
                  <NeonInput
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    value={formData.email}
                    onChange={set("email")}
                    icon={Mail}
                    required
                  />
                  <NeonInput
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={set("password")}
                    icon={Lock}
                    required
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        color: "#FB7185",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: 8,
                      padding: "14px",
                      borderRadius: 14,
                      border: "none",
                      cursor: "pointer",
                      background:
                        "linear-gradient(135deg, #2F80ED, #7B61FF)",
                      color: "white",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      boxShadow:
                        "0 0 20px rgba(47,128,237,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      width: "100%",
                    }}
                  >
                    Continue <ArrowRight size={16} />
                  </motion.button>
                </form>

                <div
                  style={{ marginTop: 20, textAlign: "center" }}
                >
                  <span
                    style={{
                      color: "rgba(148,163,184,0.5)",
                      fontSize: "0.83rem",
                    }}
                  >
                    Already have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#2DD4BF",
                      fontSize: "0.83rem",
                      fontWeight: 600,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Role ── */}
            {mode === "role" && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  Choose Your Role 🎭
                </h2>
                <p
                  style={{
                    color: "rgba(148,163,184,0.7)",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    marginBottom: 28,
                  }}
                >
                  How will you use EduSync?
                </p>

                {/* Step indicator */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginBottom: 24,
                    justifyContent: "center",
                  }}
                >
                  {["Account", "Role", "Avatar"].map(
                    (step, i) => (
                      <div
                        key={step}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              i <= 1
                                ? "linear-gradient(135deg, #2F80ED, #7B61FF)"
                                : "rgba(255,255,255,0.08)",
                            color:
                              i <= 1
                                ? "white"
                                : "rgba(148,163,184,0.4)",
                            border:
                              i <= 1
                                ? "none"
                                : "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {i + 1}
                        </div>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color:
                              i <= 1
                                ? "rgba(226,232,240,0.7)"
                                : "rgba(148,163,184,0.35)",
                          }}
                        >
                          {step}
                        </span>
                        {i < 2 && (
                          <div
                            style={{
                              width: 20,
                              height: 1,
                              background:
                                i < 1
                                  ? "rgba(47,128,237,0.4)"
                                  : "rgba(255,255,255,0.1)",
                            }}
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <motion.button
                        key={role.id}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleRoleSelect(role.id)
                        }
                        style={{
                          padding: "16px 20px",
                          borderRadius: 16,
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.04)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          textAlign: "left",
                          transition: "border-color 0.2s",
                          width: "100%",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(47,128,237,0.4)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            flexShrink: 0,
                            background: `linear-gradient(135deg, ${role.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 0 16px ${role.glow}`,
                          }}
                        >
                          <Icon size={22} color="white" />
                        </div>
                        <div>
                          <div
                            style={{
                              color: "white",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              marginBottom: 2,
                            }}
                          >
                            {role.label}
                          </div>
                          <div
                            style={{
                              color: "rgba(148,163,184,0.6)",
                              fontSize: "0.78rem",
                            }}
                          >
                            {role.desc}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Avatar ── */}
            {mode === "avatar" && (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  Pick Your Avatar ✨
                </h2>
                <p
                  style={{
                    color: "rgba(148,163,184,0.7)",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    marginBottom: 28,
                  }}
                >
                  Choose one that vibes with you
                </p>

                {/* Step indicator */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginBottom: 24,
                    justifyContent: "center",
                  }}
                >
                  {["Account", "Role", "Avatar"].map(
                    (step, i) => (
                      <div
                        key={step}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "linear-gradient(135deg, #2F80ED, #7B61FF)",
                            color: "white",
                            border: "none",
                          }}
                        >
                          {i + 1}
                        </div>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "rgba(226,232,240,0.7)",
                          }}
                        >
                          {step}
                        </span>
                        {i < 2 && (
                          <div
                            style={{
                              width: 20,
                              height: 1,
                              background:
                                "rgba(47,128,237,0.4)",
                            }}
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {avatars.map((av) => (
                    <motion.button
                      key={av}
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFormData((p) => ({
                          ...p,
                          avatar: av,
                        }));
                        setError("");
                      }}
                      style={{
                        aspectRatio: "1",
                        borderRadius: 14,
                        fontSize: "1.8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        background:
                          formData.avatar === av
                            ? "linear-gradient(135deg, rgba(47,128,237,0.3), rgba(123,97,255,0.3))"
                            : "rgba(255,255,255,0.04)",
                        border:
                          formData.avatar === av
                            ? "2px solid #2F80ED"
                            : "1px solid rgba(255,255,255,0.08)",
                        boxShadow:
                          formData.avatar === av
                            ? "0 0 16px rgba(47,128,237,0.4)"
                            : "none",
                        transition: "all 0.2s",
                      }}
                    >
                      {av}
                    </motion.button>
                  ))}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      color: "#FB7185",
                      fontSize: "0.8rem",
                      textAlign: "center",
                      marginBottom: 12,
                    }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAvatarFinish}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 14,
                    border: "none",
                    cursor: isSubmitting ? "wait" : "pointer",
                    background:
                      "linear-gradient(135deg, #2DD4BF, #2F80ED)",
                    color: "white",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    boxShadow: "0 0 24px rgba(45,212,191,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? "Setting Up..." : "Let's Go! 🚀"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: "center",
            color: "rgba(148,163,184,0.35)",
            fontSize: "0.72rem",
            marginTop: 20,
          }}
        >
          By continuing, you agree to make studying less boring
          ✌️
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Auth;