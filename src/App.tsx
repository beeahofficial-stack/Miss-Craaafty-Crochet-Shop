import { useMemo, useState, type AnchorHTMLAttributes, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  ExternalLink,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  PackageCheck,
  Sparkles,
  X,
} from 'lucide-react';

import logoImage from '@assets/image_1789028252293.png';
import editorialImage from '@assets/image_1789028278484.png';
import garlandImage from '@assets/♡_̆̈_1789028212707.jpg';
import braceletImage from '@assets/1065664330605275198_1789028212712.jpg';
import redCowlImage from '@assets/1829656095969140_1789028212716.jpg';
import flowerWallImage from '@assets/4_Crochet_Daisy_Vining_Plant_Free_Patterns_1789028212722.jpg';
import tulipKeychainImage from '@assets/Tulip_keychain_🌷_1789028212725.jpg';
import sunflowerImage from '@assets/_Crochet_Sunflower___1789028212729.jpg';
import fingerlessWhiteImage from '@assets/24277285507069910_1789028212733.jpg';
import winterSetImage from '@assets/Özel_istek_üzerine_hazırladığım_atkı_&_eldiven_takımı_🎁_✨️_C__1789028212738.jpg';
import pouchImage from '@assets/vintage_tales🌸_on_Instagram___Carry_your_essentials_in_this_c_1789028212742.jpg';
import bowKeychainImage from '@assets/Crochet_bow_keychain_1789028212747.jpg';
import victorianGlovesImage from '@assets/victorian_crochet_fingerless_gloves_pattern_1789028212752.jpg';
import coasterImage from './assets/coasters.jpg';
import keychainSetImage from '@assets/Instagram_1789028212762.jpg';
import tulipBouquetImage from '@assets/Pink_Crochet_Tulip_Bouquet_DIY_🌷_Soft_Handmade_Flower_Decor_I_1789028212765.jpg';
import curtainImage from '@assets/9_Unique_Curtain_Holder_Free_Crochet_Patterns_1789028212643.jpg';
import sunflowerWallImage from '@assets/Wall_Décor___Mirrors_+_Wall_Hangings_1789028212649.jpg';
import tableRunnerImage from '@assets/10696117858521556_1789028212702.jpg';

const WHATSAPP_NUMBER = '923222727019';
const INSTAGRAM_URL = 'https://www.instagram.com/miss_craaafty?stkn=MWZtbWcxamNpbDFidg%3D%3D';

type Category = 'All' | 'Flowers' | 'Accessories' | 'Home decor' | 'Gifts';
type Product = {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  price: number;
  image: string;
  note: string;
  tag?: string;
};

const products: Product[] = [
  { id: 'tulip-bouquet', name: 'Soft Tulip Bunch', category: 'Flowers', price: 2850, image: tulipBouquetImage, note: 'A forever bouquet in soft pinks, tied with a satin ribbon.', tag: 'Bestseller' },
  { id: 'sunflower-stem', name: 'Sunflower Bag Charm', category: 'Flowers', price: 850, image: sunflowerImage, note: 'A tiny sunny bloom made to live on your favourite tote.', tag: 'Tiny joy' },
  { id: 'floral-wall', name: 'Hanging Garden', category: 'Home decor', price: 3200, image: flowerWallImage, note: 'A hand-shaped floral wall piece for a bare little corner.' },
  { id: 'curtain-tie', name: 'Butterfly Curtain Tie', category: 'Home decor', price: 1650, image: curtainImage, note: 'A sweet, functional detail for morning light and soft curtains.' },
  { id: 'sunflower-wall', name: 'Sunflower Wall Strand', category: 'Home decor', price: 2900, image: sunflowerWallImage, note: 'Four golden sunflowers strung on a leafy green vine.' },
  { id: 'pink-garland', name: 'Pink Doorway Garland', category: 'Home decor', price: 2400, image: garlandImage, note: 'Hearts, bows and little blooms for a room that feels like you.', tag: 'New' },
  { id: 'tulip-keychain', name: 'Tulip Pearl Keyring', category: 'Accessories', price: 720, image: tulipKeychainImage, note: 'A satin-bowed pair of tulips with a pearl loop.' },
  { id: 'bow-keychain', name: 'Bow Keyring', category: 'Accessories', price: 650, image: bowKeychainImage, note: 'A soft crochet bow with a tiny bead detail.' },
  { id: 'charm-collection', name: 'Pocket Charm Collection', category: 'Accessories', price: 550, image: keychainSetImage, note: 'Pick your favourite from a tray of strawberries, bows and swirls.' },
  { id: 'cherry-band', name: 'Cherry Hair Bands', category: 'Accessories', price: 690, image: braceletImage, note: 'Stretchy, soft and playful for an everyday little detail.' },
  { id: 'winter-mitts', name: 'Ribbon Hand Warmers', category: 'Accessories', price: 1450, image: victorianGlovesImage, note: 'Wine crochet, cream edging and a bow you can wear all season.' },
  { id: 'petal-mitts', name: 'Petal Fingerless Mitts', category: 'Accessories', price: 1350, image: fingerlessWhiteImage, note: 'Creamy hand warmers with blush pink petal embroidery.' },
  { id: 'winter-set', name: 'Berry Winter Set', category: 'Gifts', price: 3650, image: winterSetImage, note: 'A cosy scarf and matching mitts, made for gifting.' },
  { id: 'berry-pouch', name: 'Berry Scallop Pouch', category: 'Accessories', price: 1550, image: pouchImage, note: 'A slim little pouch with a scalloped cream trim and gold clasp.' },
  { id: 'berry-shawl', name: 'Berry Layered Shawl', category: 'Accessories', price: 2500, image: redCowlImage, note: 'A dramatic burgundy crochet layer for your favourite jeans.' },
  { id: 'coaster-set', name: 'Blush Petal Coasters', category: 'Home decor', price: 1250, image: coasterImage, note: 'A set of three floral coasters for slow tea and sunny tables.' },
  { id: 'table-runner', name: 'Midnight Table Runner', category: 'Home decor', price: 4200, image: tableRunnerImage, note: 'A bold black-and-natural runner with a generous handmade drape.' },
];

const formatPrice = (price: number) => `PKR ${price.toLocaleString('en-PK')}`;
const whatsappLink = (product?: Product) => {
  const message = product
    ? `Assalam-o-alaikum! I would love to order the ${product.name} (${formatPrice(product.price)}). Please share availability and delivery details.`
    : 'Assalam-o-alaikum! I would like to ask about a handmade crochet order from Miss Craaafty.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

function AppLink({ href, children, className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} className={className} {...props}>{children}</a>;
}

function TopNav({ onContact }: { onContact: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <div className="announcement">
        <div className="announcement-inner">
          <PackageCheck size={13} />
          <span>Handmade with care · Delivery across Pakistan only</span>
        </div>
      </div>
      <div className="nav-wrap">
        <nav className="nav" aria-label="Main navigation">
          <AppLink href="#top" className="brand" data-testid="link-home">
            <img src={logoImage} alt="Miss Craaafty handmade crochet logo" />
            <span><span className="brand-name">Miss Craaafty</span><span className="brand-sub">Stitched in Pakistan</span></span>
          </AppLink>
          <div className="nav-links">
            <AppLink href="#shop" className="nav-link" data-testid="link-shop">Shop</AppLink>
            <AppLink href="#story" className="nav-link" data-testid="link-story">Our story</AppLink>
            <AppLink href="#gifting" className="nav-link" data-testid="link-gifting">Gifting</AppLink>
            <AppLink href={INSTAGRAM_URL} className="nav-link" data-testid="link-instagram-nav" target="_blank" rel="noreferrer">Instagram</AppLink>
          </div>
          <div className="nav-actions">
            <button className="btn btn-primary" onClick={onContact} data-testid="button-contact-nav">Talk to us <MessageCircle size={14} /></button>
            <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" data-testid="button-open-menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div style={{ display: 'grid', gap: 15, padding: '0 20px 20px', maxWidth: 1220, margin: 'auto' }}>
            {[
              ['Shop', '#shop'],
              ['Our story', '#story'],
              ['Gifting', '#gifting'],
              ['Instagram', INSTAGRAM_URL],
            ].map(([label, href]) => (
              <AppLink key={label} href={href} className="nav-link" onClick={closeMenu} data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>{label}</AppLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="reveal">
        <div className="eyebrow">A little joy, loop by loop</div>
        <h1>Made to make your <em>everyday</em> softer.</h1>
        <p className="hero-copy">Small-batch crochet flowers, keepsakes and home pieces, made slowly in Pakistan for people who notice the lovely little things.</p>
        <div className="hero-actions">
          <AppLink href="#shop" className="btn btn-primary" data-testid="link-shop-hero">Browse the stitches <ArrowDown size={15} /></AppLink>
          <AppLink href={INSTAGRAM_URL} className="btn btn-soft" target="_blank" rel="noreferrer" data-testid="link-instagram-hero"><Instagram size={15} /> See our world</AppLink>
        </div>
        <div className="hero-notes">
          <span><Check size={14} /> Made to order</span>
          <span><Check size={14} /> Pakistan-wide delivery</span>
        </div>
      </div>
      <div className="hero-art reveal reveal-delay-2">
        <img className="hero-main-image" src={editorialImage} alt="Bright crochet flowers arranged on a handmade table" />
        <img className="hero-logo" src={logoImage} alt="Miss Craaafty logo" />
        <div className="hero-sticker">made<br />slowly<span>with love</span></div>
        <div className="hero-scribble">for your soft place</div>
      </div>
    </header>
  );
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return (
    <article className="product-card" data-testid={`card-product-${product.id}`}>
      <div className="product-image-wrap" onClick={() => onOpen(product)} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && onOpen(product)}>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        <div className="product-overlay">
          <button className="quick-view" onClick={(event) => { event.stopPropagation(); onOpen(product); }} data-testid={`button-view-${product.id}`}>View details <ChevronRight size={13} /></button>
          <a className="icon-button" href={whatsappLink(product)} target="_blank" rel="noreferrer" aria-label={`Order ${product.name} on WhatsApp`} onClick={(event) => event.stopPropagation()} data-testid={`link-order-${product.id}`}><MessageCircle size={16} /></a>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta"><span>{product.category}</span><span className="product-price">{formatPrice(product.price)}</span></div>
      </div>
    </article>
  );
}

function Shop({ onOpen }: { onOpen: (product: Product) => void }) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const filteredProducts = useMemo(() => activeCategory === 'All' ? products : products.filter((product) => product.category === activeCategory), [activeCategory]);
  const categories: Category[] = ['All', 'Flowers', 'Accessories', 'Home decor', 'Gifts'];
  return (
    <section id="shop" className="section">
      <div className="section-heading">
        <div><div className="section-kicker">The little shop</div><h2>Choose your<br />kind of lovely.</h2></div>
        <p className="section-intro">Every piece is crocheted by hand, so no two are ever quite alike. Find a tiny treat, a thoughtful gift, or something to keep.</p>
      </div>
      <div className="category-row" role="tablist" aria-label="Shop categories">
        {categories.map((category) => (
          <button key={category} className={`category-pill ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category} data-testid={`button-category-${category.toLowerCase().replace(' ', '-')}`}>{category}</button>
        ))}
      </div>
      <div className="product-grid" style={{ marginTop: 24 }}>
        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

function EditorialSection() {
  return (
    <section id="story" className="editorial-band">
      <div className="editorial">
        <img className="editorial-image" src={editorialImage} alt="Handmade crochet flowers and yarn details" loading="lazy" />
        <div className="editorial-copy">
          <div className="section-kicker">The slow-made promise</div>
          <h2>Not factory perfect.<br /><span style={{ color: 'hsl(var(--secondary))' }}>Much better.</span></h2>
          <p>Miss Craaafty started with a hook, a basket of yarn and a soft spot for things that make a room feel lived in. Each order is made, checked and wrapped with the kind of care you can feel when it arrives.</p>
          <p>Colours can be made personal, too. If you have a special palette or a little idea, send us a message and we will make a plan together.</p>
          <div className="editorial-sign">Entes Lamaa, maker</div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection({ onOpen }: { onOpen: (product: Product) => void }) {
  const featured = products.find((product) => product.id === 'tulip-bouquet');
  return (
    <section id="gifting" className="section">
      <div className="section-heading">
        <div><div className="section-kicker">For corners & keepsakes</div><h2>Little scenes<br />of happiness.</h2></div>
        <button className="btn btn-outline" onClick={() => featured && onOpen(featured)} data-testid="button-featured-details">Meet the favourite <ArrowRight size={15} /></button>
      </div>
      <div className="feature-layout">
        <div className="feature-big">
          <img src={tulipBouquetImage} alt="Pink crochet tulip bouquet" loading="lazy" />
          <div className="feature-caption"><h3>A bouquet<br />that never wilts.</h3><p>For birthdays, new homes, and just because.</p></div>
        </div>
        <div className="feature-side">
          <div className="feature-tile"><img src={flowerWallImage} alt="Crochet flowers hanging on a wall" loading="lazy" /><span>For your walls</span></div>
          <div className="feature-tile"><img src={sunflowerImage} alt="Crochet sunflower bag charm" loading="lazy" /><span>For your tote</span></div>
          <div className="feature-tile"><img src={pouchImage} alt="Berry crochet pouch" loading="lazy" /><span>For little secrets</span></div>
          <div className="feature-tile"><img src={keychainSetImage} alt="Collection of crochet keychains" loading="lazy" /><span>For your people</span></div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <div className="service-strip">
      <div className="services">
        <div className="service"><PackageCheck size={22} /><div><strong>Wrapped with care</strong><span>A little parcel worth opening</span></div></div>
        <div className="service"><Heart size={22} /><div><strong>Made just for you</strong><span>Custom colours welcome</span></div></div>
        <div className="service"><MessageCircle size={22} /><div><strong>Easy WhatsApp ordering</strong><span>Friendly replies from Pakistan</span></div></div>
      </div>
    </div>
  );
}

function NotesSection() {
  return (
    <section className="note-band">
      <div className="note-grid">
        <div><div className="section-kicker">Good to know</div><h2>A few things<br />before you pick.</h2><p style={{ marginTop: 22 }}>Handmade means your piece has a little story. Here is how the Miss Craaafty parcel works.</p></div>
        <div className="note-list">
          <div className="note-item"><div className="note-number">01</div><h3>Made after you order</h3><p>Most pieces take 4–10 working days, depending on the size of the order. We will share a clear timeline on WhatsApp.</p></div>
          <div className="note-item"><div className="note-number">02</div><h3>Pakistan, always</h3><p>We deliver to cities and towns across Pakistan. Delivery charges and timing are confirmed before you place the order.</p></div>
          <div className="note-item"><div className="note-number">03</div><h3>Colours are a conversation</h3><p>Want blush instead of berry? Tell us. We love making a piece feel like it belongs to you.</p></div>
          <div className="note-item"><div className="note-number">04</div><h3>Gifts are our love language</h3><p>Add a note for the recipient and we will make the parcel feel extra personal, at no extra fuss.</p></div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onContact }: { onContact: () => void }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div><div className="section-kicker" style={{ color: 'hsl(var(--secondary))' }}>Keep in touch</div><div className="footer-title">Have a little idea?<br /><em>Let’s make it.</em></div></div>
          <div className="footer-links">
            <button className="btn btn-primary" onClick={onContact} data-testid="button-contact-footer">Start a conversation <MessageCircle size={15} /></button>
            <AppLink href={INSTAGRAM_URL} className="footer-link" target="_blank" rel="noreferrer" data-testid="link-instagram-footer"><Instagram size={14} /> @miss_craaafty <ExternalLink size={12} /></AppLink>
            <AppLink href={whatsappLink()} className="footer-link" target="_blank" rel="noreferrer" data-testid="link-whatsapp-footer"><MessageCircle size={14} /> WhatsApp us directly <ExternalLink size={12} /></AppLink>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Miss Craaafty. Made in Pakistan.</span><span>Flowers, gifts & soft things.</span></div>
      </div>
    </footer>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal product-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
        <img className="modal-image" src={product.image} alt={product.name} />
        <div className="modal-content">
          <button className="modal-close" onClick={onClose} aria-label="Close product details" data-testid="button-close-product"><X size={16} /></button>
          <div className="section-kicker">{product.category} · handmade</div>
          <h2>{product.name}</h2>
          <div className="modal-price">{formatPrice(product.price)}</div>
          <p>{product.note}</p>
          <p style={{ fontSize: 11, marginTop: 15 }}><Sparkles size={13} style={{ verticalAlign: 'middle', marginRight: 5, color: 'hsl(var(--primary))' }} /> Made to order with your choice of colour where possible.</p>
          <AppLink href={whatsappLink(product)} className="btn btn-primary" target="_blank" rel="noreferrer" onClick={onClose} data-testid={`link-modal-order-${product.id}`} style={{ marginTop: 18 }}>Order on WhatsApp <MessageCircle size={15} /></AppLink>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Assalam-o-alaikum! My name is ${name || 'a customer'}. ${message || 'I would like to ask about a custom crochet order.'}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Contact Miss Craaafty">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose} aria-label="Close contact form" data-testid="button-close-contact"><X size={16} /></button>
          {sent ? (
            <div style={{ padding: '45px 10px 25px', textAlign: 'center' }}>
              <Check size={30} style={{ color: 'hsl(var(--accent))' }} />
              <h2 style={{ marginTop: 17 }}>Your message is ready.</h2>
              <p>WhatsApp should have opened with your note. We cannot wait to hear your idea.</p>
              <button className="btn btn-soft" onClick={onClose} data-testid="button-done-contact">Close</button>
            </div>
          ) : (
            <>
              <div className="section-kicker">A friendly hello</div>
              <h2>Tell us what<br />you’re dreaming up.</h2>
              <p>For custom colours, gifts, bulk orders or a simple question, send us a note and we will reply on WhatsApp.</p>
              <form className="contact-form" onSubmit={submit}>
                <label htmlFor="contact-name">Your name</label>
                <input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="What should we call you?" data-testid="input-contact-name" />
                <label htmlFor="contact-message">Your note</label>
                <textarea id="contact-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="I would love a bouquet in..." data-testid="input-contact-message" />
                <button type="submit" className="btn btn-primary" data-testid="button-send-contact">Continue on WhatsApp <ArrowRight size={15} /></button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <div className="site-shell grain">
      <TopNav onContact={() => setContactOpen(true)} />
      <main>
        <Hero />
        <Services />
        <Shop onOpen={setSelectedProduct} />
        <EditorialSection />
        <FeatureSection onOpen={setSelectedProduct} />
        <NotesSection />
      </main>
      <Footer onContact={() => setContactOpen(true)} />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;