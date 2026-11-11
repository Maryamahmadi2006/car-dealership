import { useState } from 'react';
import { ArrowDown } from './Icons';

/** Single-open FAQ accordion with animated panels and rotating arrow. */
export default function Accordion({ items }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`accordion__item${isOpen ? ' is-open' : ''}`} key={item.q}>
            <button
              className="accordion__head"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="accordion__q">{item.q}</span>
              <span className="accordion__arrow" aria-hidden="true">
                <ArrowDown size={22} />
              </span>
            </button>
            <div className="accordion__panel">
              <div className="accordion__panel-in">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
