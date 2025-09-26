import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SD Matrimony",
  description: "Understand how SD Matrimony collects and protects your personal information.",
  keywords: ["Privacy Policy", "Matrimony"],
  openGraph: {
    title: "Privacy Policy - SD Matrimony",
    description: "Learn about our privacy practices for users of our matrimony platform.",
    url: "/privacy-policy",
    type: "website",
  },
}

function Page() {
  return (
    <main className="prose-sm md:prose prose-slate prose-li:my-0 prose-p:my-1 prose-a:no-underline prose-a:hover:text-pink-600 !max-w-11/12 mx-auto my-16 p-6 bg-pink-50/30 shadow-sm rounded-lg border">
      <header className="mb-6">
        <h1 className="!mb-1 md:font-semibold">Privacy Policy</h1>
        <p className="!mt-0">Last updated on Jul 30, 2025</p>
      </header>

      <section>
        <p>This privacy policy sets out how <strong className="font-semibold">SHRI DURGADEVI THIRUMANA THAGAVAL MAIYAM (SD Matrimony)</strong> uses and protects any information that you provide when you visit our website or purchase our services.</p>
        <p>We are committed to ensuring that your privacy is protected. We ask you to provide certain information by which you can be identified, you can be assured that it will only be used in accordance with this privacy statement.</p>
        <p>This policy may be updated from time to time, and you should check this page periodically to ensure that you are aware of any changes.</p>

        <h3>Information We May Collect</h3>
        <ul>
          <li>Personal and Family information</li>
          <li>Contact information including email address, phone number and address</li>
          <li>Other information relevant to matchmaking services and preferences</li>
        </ul>

        <h3>How We Use the Information</h3>
        <ul>
          <li>Internal record keeping</li>
          <li>Improving our products and services</li>
          <li>Periodically sending promotional emails about new services, special offers, or other information which may be of interest</li>
          <li>Contacting you for market research purposes via email, phone, or mail</li>
          <li>Customizing the website according to your interests</li>
        </ul>

        <h3>Cookies</h3>
        <p>We use cookies solely for storing the refresh token and access token to keep your session secure. These cookies help us authenticate users and do not track any personal preferences or browsing activity.</p>

        <h3>Controlling Your Personal Information</h3>
        <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
        <ul>
          <li>When filling in forms, look for the option to indicate that you do not want your information used for direct marketing purposes.</li>
          <li>If you have previously agreed to the use of your information for direct marketing, you may change your mind at any time by contacting us at <a href="mailto:admin@sdmatrimony.com">admin@sdmatrimony.com</a>.</li>
        </ul>

        <p className="!mb-4">We will not sell, distribute, or lease your personal information to third parties unless required by law or with your permission. We may send promotional information from third parties only if you consent.</p>

        <p>You may update your personal information at any time by logging into your account or contacting us via email at <a href="mailto:admin@sdmatrimony.com">admin@sdmatrimony.com</a> or phone at <a href="tel:+919791155234">9791155234</a> or <a href="tel:+918667042132">8667042132</a>. We will promptly correct any information found to be incorrect.</p>
      </section>
    </main>
  )
}

export default Page
