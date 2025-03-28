
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Camera, ArrowRight, Loader2 } from "lucide-react";

const AuthScreen: React.FC = () => {
  const [step, setStep] = useState<"login" | "facial">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [facialScanComplete, setFacialScanComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "login") {
      setStep("facial");
    } else if (facialScanComplete) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 2000);
    }
  };

  const simulateFacialScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFacialScanComplete(true);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="py-12 px-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold">FIGURES</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 animate-fade-in">
        {step === "login" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-muted-foreground">Enter your credentials to continue</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md border border-input bg-transparent focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-md border border-input bg-transparent focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              Continue
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="font-medium underline underline-offset-4">
                Sign up
              </a>
            </p>
          </form>
        ) : (
          <div className="space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Facial Verification</h2>
              <p className="text-muted-foreground">
                Please complete facial scan to continue
              </p>
            </div>

            <div 
              className={`mx-auto w-64 h-64 rounded-full border-2 ${
                facialScanComplete 
                  ? "border-primary" 
                  : "border-dashed border-muted-foreground"
              } flex items-center justify-center`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={32} />
              ) : facialScanComplete ? (
                <div className="text-primary animate-pulse-subtle">
                  <Camera size={64} />
                  <div className="mt-2 font-medium">Verified</div>
                </div>
              ) : (
                <button
                  onClick={simulateFacialScan}
                  className="w-full h-full rounded-full flex items-center justify-center"
                >
                  <Camera size={48} className="text-muted-foreground" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={!facialScanComplete || loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
