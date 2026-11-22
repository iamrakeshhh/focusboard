import { useState } from 'react';
import Icon from './Icon.jsx';
import { FOCUS_NOTES as SLIDES } from '../data.js';

const pad = (n) => String(n).padStart(2, '0');

export default function Carousel() {
  const [i, setI] = useState(0);
  const go = (n) => setI((n + SLIDES.length) % SLIDES.length);
  const s = SLIDES[i];
  return (
    <section className="banner" aria-roledescription="carousel" aria-label="Focus notes">
      <div className="slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`} aria-live="polite">
        <div className="copy">
          <p className="eyebrow">Focus notes <span>{pad(i + 1)} / {pad(SLIDES.length)}</span></p>
          <h2>{s.title}</h2>
          <p className="banner-sub">{s.sub}</p>
        </div>
        <div className="peek">
          <span className="peek-ico"><Icon name="check" size={14} strokeWidth={3} /></span>
          <div className="peek-body">
            <p className="peek-tag">{s.tag}</p>
            <p className="peek-title">{s.card}</p>
            <div className="peek-row">
              <span className="peek-bar"><span style={{ width: `${s.pct}%` }} /></span>
              <span className="peek-pct">{s.pct}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="seg" role="group" aria-label="Choose slide">
        {SLIDES.map((n, idx) => (
          <button key={n.title} type="button" className={idx === i ? 'on' : ''} onClick={() => go(idx)}
            aria-label={`Show slide ${idx + 1} of ${SLIDES.length}`} aria-current={idx === i ? 'true' : undefined}><span /></button>
        ))}
      </div>
      <div className="arrows">
        <button type="button" className="arrow" onClick={() => go(i - 1)} aria-label="Previous slide"><Icon name="left" size={18} /></button>
        <button type="button" className="arrow next" onClick={() => go(i + 1)} aria-label="Next slide"><Icon name="right" size={18} /></button>
      </div>
    </section>
  );
}
