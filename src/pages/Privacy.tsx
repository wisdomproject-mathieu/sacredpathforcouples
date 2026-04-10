import { Link } from "react-router-dom";
import shivaShaktiIcon from "@/assets/shiva-shakti-icon.png";

const Privacy = () => (
  <div className="min-h-screen bg-background px-4 py-24">
    <div className="container max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/">
          <img src={shivaShaktiIcon} alt="Sacred Path" className="h-8 w-8" />
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Privacy Policy</h1>
      </div>
      <div className="prose prose-invert max-w-none font-body text-muted-foreground space-y-6">
        <p>Last updated: January 2025</p>
        <h2 className="font-heading text-xl text-foreground">1. Information We Collect</h2>
        <p>We collect email addresses for account creation, couple connection codes, and usage data to improve your experience. We do not sell your personal information to third parties.</p>
        <h2 className="font-heading text-xl text-foreground">2. How We Use Your Information</h2>
        <p>Your information is used to provide the Sacred Path service, including partner matching, content delivery, and subscription management.</p>
        <h2 className="font-heading text-xl text-foreground">3. Data Security</h2>
        <p>We use industry-standard security measures including encryption in transit and at rest. Your data is stored securely on our cloud infrastructure.</p>
        <h2 className="font-heading text-xl text-foreground">4. Your Rights</h2>
        <p>You may request deletion of your account and associated data at any time by contacting us.</p>
        <h2 className="font-heading text-xl text-foreground">5. Contact</h2>
        <p>For privacy inquiries, please contact us through the app.</p>
      </div>
    </div>
  </div>
);

export default Privacy;
