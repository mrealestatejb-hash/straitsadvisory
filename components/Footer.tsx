import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Straits Advisory</h3>
            <p className="text-sm text-muted-foreground">
              Singapore&apos;s gateway to Johor Bahru property investment.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Properties</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/en-SG/properties">All Properties</Link></li>
              <li><Link href="/en-SG/map">Interactive Map</Link></li>
              <li><Link href="/en-SG/calculator">Corridor Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/en-SG/about">About Us</Link></li>
              <li><Link href="/en-SG/contact">Contact</Link></li>
              <li><Link href="/en-SG/careers">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@straitsadvisory.com</li>
              <li>+65 9XXX XXXX</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Straits Advisory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
