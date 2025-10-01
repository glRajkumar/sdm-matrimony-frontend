import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - SD Matrimony",
  description: "Read the Terms & Conditions for using SD Matrimony services.",
  keywords: ["Terms and Conditions", "Matrimony"],
  openGraph: {
    title: "Terms & Conditions - SD Matrimony",
    description: "Read the Terms & Conditions for using our matrimony platform.",
    url: "/terms-and-conditions",
    type: "website",
  },
}

function Page() {
  return (
    <main className="prose-sm md:prose prose-slate prose-li:my-0 prose-p:my-1 !max-w-11/12 prose-a:no-underline prose-a:hover:text-pink-600 mx-auto my-16 p-6 bg-pink-50/30 shadow-sm rounded-lg border">
      <header className="mb-6">
        <h1 className="!mb-1 md:font-semibold">Terms & Conditions</h1>
        <p className="!mt-0">Last updated on Jul 30, 2025</p>
      </header>

      <section>
        <p>For the purpose of these Terms and Conditions, the terms <strong className="font-semibold">"we"</strong>, <strong className="font-semibold">"us"</strong>, <strong className="font-semibold">"our"</strong> refer to <strong className="font-semibold">SHRI DURGADEVI THIRUMANA THAGAVAL MAIYAM (SD Matrimony)</strong>, whose registered/operational office is No. 1, Sri Laxmi Nagar, 3rd Main Street, Alwarthirunagar, Mettukuppam, Chennai, 600087. The terms <strong className="font-semibold">"you"</strong>, <strong className="font-semibold">"your"</strong>, <strong className="font-semibold">"user"</strong>, <strong className="font-semibold">"visitor"</strong> refer to any natural or legal person who visits our website or purchases our services.</p>

        <h3>General Terms</h3>
        <ul>
          <li>The content of this website may change without prior notice.</li>
          <li>We and third parties provide no warranty or guarantee regarding the accuracy, timeliness, performance, completeness, or suitability of the information and materials on this website for any particular purpose.</li>
          <li>Use of any information or materials on our website is entirely at your own risk.</li>
          <li>It is your responsibility to ensure that any services or information available through our website meet your specific requirements.</li>
        </ul>

        <h3>Intellectual Property</h3>
        <ul>
          <li>All material on this website is owned by or licensed to us, including design, layout, appearance, and graphics. Reproduction is prohibited except as permitted under copyright law.</li>
          <li>All third-party trademarks are acknowledged on our website.</li>
          <li>Unauthorized use of our information may result in claims for damages or be treated as a criminal offense.</li>
        </ul>

        <h3>External Links</h3>
        <p>From time to time, our website may include links to other websites for your convenience. You may not create a link to our website from another website or document without our prior written consent.</p>

        <h3>Governing Law</h3>
        <p>Any dispute arising from the use of our website, purchase of services, or engagement with us is subject to the laws of India.</p>

        <h3>Payment & Liability</h3>
        <p>We shall not be liable for any loss or damage arising directly or indirectly from the decline of authorization for any transaction due to the cardholder exceeding the preset limit mutually agreed with our acquiring bank.</p>
      </section>
    </main>
  )
}

export default Page
