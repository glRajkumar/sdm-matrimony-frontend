import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - SD Matrimony",
  description: "Get in touch with SD Matrimony for any queries or support.",
  keywords: ["Contact Us", "Support"],
  openGraph: {
    title: "Contact Us",
    description: "Reach out to us for questions or support regarding our matrimony services.",
    url: "/contact-us",
    type: "website",
  },
}

function Page() {
  return (
    <main className="prose-sm md:prose prose-slate prose-li:my-0 prose-p:my-1 !max-w-11/12 prose-a:no-underline prose-a:hover:text-pink-600 mx-auto my-16 p-6 bg-pink-50/30 shadow-sm rounded-lg border">
      <header className="mb-6">
        <h1 className="!mb-1 md:font-semibold">Contact Us</h1>
        <p className="!mt-0">Last updated on Jul 30, 2025</p>
      </header>

      <section>
        <p>You may contact us using the information below:</p>

        <h3>Merchant Details</h3>
        <p><strong className="font-semibold">Legal Entity Name:</strong> SHRI DURGADEVI THIRUMANA THAGAVAL MAIYAM</p>
        <p><strong className="font-semibold">Also Known As:</strong> SD Matrimony, Sri Durga Devi Matrimony</p>
        <p><strong className="font-semibold">Registered Address:</strong> No. 1, Sri Laxmi Nagar, 3rd Main Street, Alwarthirunagar, Mettukuppam, Chennai, Tiruvallur, Tamilnadu, 600087.</p>
        <p><strong className="font-semibold">Operational Address:</strong> No. 1, Sri Laxmi Nagar, 3rd Main Street, Alwarthirunagar, Mettukuppam, Chennai, Tiruvallur, Tamilnadu, 600087.</p>

        <h3>Contact Information</h3>
        <p><strong className="font-semibold">Telephone No:</strong> <a href="tel:+919791155234">9791155234</a> or <a href="tel:+918667042132">8667042132</a></p>
        <p><strong className="font-semibold">E-Mail ID:</strong> <a href="mailto:admin@sdmatrimony.com">admin@sdmatrimony.com</a></p>
      </section>
    </main>
  )
}

export default Page
